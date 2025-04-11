const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const fs = require('fs');
const path = require('path');

// Get all events with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { category, location, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (location) query.location = location;
    if (search) {
      query.$text = { $search: search };
    }

    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('organizer', 'username firstName lastName');

    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'username firstName lastName')
      .populate('attendees', 'username firstName lastName')
      .populate('reviews.user', 'username firstName lastName');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to update events.js
const updateEventsJs = (newEvent) => {
    const eventsJsPath = path.join(__dirname, '../../mini/src/data/events.js');
    const eventsJsContent = fs.readFileSync(eventsJsPath, 'utf8');
    
    // Extract the existing eventData object
    const eventDataMatch = eventsJsContent.match(/export const eventData = ({[\s\S]*?});/);
    if (!eventDataMatch) {
        throw new Error('Could not find eventData in events.js');
    }
    
    const existingEventData = JSON.parse(eventDataMatch[1]);
    const updatedEventData = {
        ...existingEventData,
        [newEvent.id]: {
            title: newEvent.title,
            description: newEvent.description,
            category: newEvent.category,
            location: newEvent.location,
            date: newEvent.date,
            startTime: newEvent.startTime,
            duration: newEvent.duration,
            price: newEvent.price,
            maxTickets: newEvent.totalTickets,
            coordinates: { lat: 17.3850, lng: 78.4867 },
            images: [newEvent.image],
            heroImage: newEvent.image,
            ticketTypes: [
                { id: 'regular', name: 'Regular Entry', price: newEvent.price }
            ]
        }
    };
    
    // Create the new events.js content
    const newContent = `import marathonImg from '../Images/marathon.jpg';
import rockImg from '../Images/rock.jpg';
import melodyImg from '../Images/melody.jpg';
import fusionImg from '../Images/fusion.jpg';
import metropolisImg from '../Images/metropolis.jpg';
import rockFestImg from '../Images/rock-fest.jpg';
import rockIconsImg from '../Images/rock-icons.jpg';
import rockRevoltImg from '../Images/rock-revolt.jpg';
import classicRockImg from '../Images/classic-rock.jpg';
import artImg from '../Images/art.jpg';
import album1 from '../Images/album/album1.jpg';
import album2 from '../Images/album/album2.jpg';
import album3 from '../Images/album/album3.jpg';
import album4 from '../Images/album/album4.jpg';
import album5 from '../Images/album/album5.jpg';
import businessImg from '../Images/business.jpeg';
import comedyImg from '../Images/comedy.jpeg';
import danceImg from '../Images/dance.jpeg';
import passionImg from '../Images/passion.jpg';
import partyImg from '../Images/party.jpeg';

export const eventData = ${JSON.stringify(updatedEventData, null, 4)};`;
    
    fs.writeFileSync(eventsJsPath, newContent);
};

// Helper function to create event details page
const createEventDetailsPage = (event) => {
    const eventDetailsPath = path.join(__dirname, `../../mini/src/pages/EventDetails/${event.id}.jsx`);
    const eventDetailsContent = `
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './EventDetails.css';

const ${event.id} = () => {
    const { id } = useParams();
    
    return (
        <>
            <Header />
            <div className="event-details-page">
                <div className="event-hero">
                    <img src="${event.image}" alt="${event.title}" />
                </div>
                <div className="event-content">
                    <h1>${event.title}</h1>
                    <div className="event-meta">
                        <div className="event-date">
                            <span>📅</span>
                            ${event.date} | ${event.startTime}
                        </div>
                        <div className="event-location">
                            <span>📍</span>
                            ${event.location}
                        </div>
                        <div className="event-category">
                            <span>🏷️</span>
                            ${event.category}
                        </div>
                        <div className="event-price">
                            <span>💰</span>
                            ₹${event.price}
                        </div>
                    </div>
                    <div className="event-description">
                        <h2>About the Event</h2>
                        <p>${event.description}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ${event.id};
    `;
    
    fs.writeFileSync(eventDetailsPath, eventDetailsContent);
};

// Create new event
router.post('/', async (req, res) => {
    try {
        const { eventData } = req.body;
        
        // Update events.js
        updateEventsJs(eventData);
        
        // Create event details page
        createEventDetailsPage(eventData);
        
        res.status(200).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Update event
router.put('/:id', [
  auth,
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('date').optional().isISO8601(),
  body('time').optional().notEmpty(),
  body('location').optional().trim().notEmpty(),
  body('category').optional().trim().notEmpty(),
  body('price').optional().isNumeric(),
  body('capacity').optional().isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is the organizer
    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await event.remove();
    res.json({ message: 'Event removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review to event
router.post('/:id/reviews', [
  auth,
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const review = {
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    };

    event.reviews.unshift(review);
    await event.save();

    res.json(event.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 