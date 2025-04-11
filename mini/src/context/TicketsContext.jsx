import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const TicketsContext = createContext();
const MAX_TICKETS = 50; // Limit the number of tickets stored
const API_URL = 'http://localhost:5002/api';

export const TicketsProvider = ({ children }) => {
    const [purchasedTickets, setPurchasedTickets] = useState(() => {
        try {
            // Initialize from localStorage if available
            const savedTickets = localStorage.getItem('purchasedTickets');
            const tickets = savedTickets ? JSON.parse(savedTickets) : [];
            return tickets;
        } catch (error) {
            console.error('Error loading tickets from localStorage:', error);
            return [];
        }
    });

    // Sync existing tickets with backend when component mounts
    useEffect(() => {
        const syncTicketsWithBackend = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                // For each ticket in localStorage, save it to backend
                for (const ticket of purchasedTickets) {
                    try {
                        await axios.post('http://localhost:5001/api/tickets/purchase', {
                            eventId: ticket.id,
                            quantity: ticket.tickets.length,
                            paymentMethod: 'card', // default value since old tickets might not have this
                            totalAmount: ticket.amount,
                            contactInfo: {
                                firstName: ticket.tickets[0].firstName,
                                lastName: ticket.tickets[0].lastName,
                                email: ticket.tickets[0].email,
                                phone: ticket.tickets[0].phone
                            }
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                    } catch (error) {
                        // If error is due to duplicate ticket, skip it
                        if (error.response?.status !== 409) {
                            console.error('Error syncing ticket:', error);
                        }
                    }
                }
            } catch (error) {
                console.error('Error in ticket sync:', error);
            }
        };

        syncTicketsWithBackend();
    }, []); // Run once when component mounts

    const addPurchasedTicket = async (ticket) => {
        try {
            console.log('Adding ticket with eventType:', ticket.eventType);
            
            // Check if ticket with same purchaseCode already exists
            const isDuplicate = purchasedTickets.some(t => t.purchaseCode === ticket.purchaseCode);
            
            if (isDuplicate) {
                console.log('Ticket already exists, skipping...');
                return;
            }

            // Create new array with the new ticket at the beginning
            const newTickets = [ticket, ...purchasedTickets];
            
            // Limit the number of tickets stored
            const limitedTickets = newTickets.slice(0, MAX_TICKETS);
            
            setPurchasedTickets(limitedTickets);
            
            // Try to save to localStorage
            try {
                localStorage.setItem('purchasedTickets', JSON.stringify(limitedTickets));
                console.log('Saved tickets to localStorage:', limitedTickets);
            } catch (storageError) {
                console.warn('Could not save tickets to localStorage:', storageError);
            }
        } catch (error) {
            console.error('Error adding ticket:', error);
        }
    };

    const deleteTicket = async (purchaseCode) => {
        try {
            const updatedTickets = purchasedTickets.filter(ticket => ticket.purchaseCode !== purchaseCode);
            setPurchasedTickets(updatedTickets);
            
            try {
                localStorage.setItem('purchasedTickets', JSON.stringify(updatedTickets));
            } catch (storageError) {
                console.warn('Could not save tickets to localStorage:', storageError);
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <TicketsContext.Provider value={{ purchasedTickets, addPurchasedTicket, deleteTicket }}>
            {children}
        </TicketsContext.Provider>
    );
};

export const useTickets = () => {
    const context = useContext(TicketsContext);
    if (!context) {
        throw new Error('useTickets must be used within a TicketsProvider');
    }
    return context;
}; 