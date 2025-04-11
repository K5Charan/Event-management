const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// Get user's tickets
router.get('/my-tickets', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id })
      .populate('event', 'title date time location')
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase tickets
router.post('/purchase', [
  auth,
  body('eventId').isMongoId(),
  body('quantity').isInt({ min: 1 }),
  body('paymentMethod').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventId, quantity, paymentMethod } = req.body;

    // Check if event exists and has available tickets
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableTickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    // Create ticket
    const ticket = new Ticket({
      event: eventId,
      user: req.user.id,
      quantity,
      totalPrice: event.price * quantity,
      paymentMethod,
      status: 'pending'
    });

    // Update event's available tickets
    event.availableTickets -= quantity;
    event.attendees.push(req.user.id);

    // Update user's tickets array
    const user = await User.findById(req.user.id);
    user.tickets.push(ticket._id);

    // Save all changes
    await Promise.all([
      ticket.save(),
      event.save(),
      user.save()
    ]);

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Confirm ticket payment
router.put('/:id/confirm', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user is the ticket owner
    if (ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    ticket.status = 'confirmed';
    ticket.paymentStatus = 'completed';
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel ticket
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user is the ticket owner
    if (ticket.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update event's available tickets
    const event = await Event.findById(ticket.event);
    event.availableTickets += ticket.quantity;
    event.attendees = event.attendees.filter(
      attendee => attendee.toString() !== req.user.id
    );

    // Update ticket status
    ticket.status = 'cancelled';
    ticket.paymentStatus = 'refunded';

    await Promise.all([
      ticket.save(),
      event.save()
    ]);

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check in ticket
router.put('/:id/check-in', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if ticket is confirmed
    if (ticket.status !== 'confirmed') {
      return res.status(400).json({ message: 'Ticket is not confirmed' });
    }

    // Check if ticket is already checked in
    if (ticket.checkInTime) {
      return res.status(400).json({ message: 'Ticket already checked in' });
    }

    ticket.status = 'used';
    ticket.checkInTime = new Date();
    await ticket.save();

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 