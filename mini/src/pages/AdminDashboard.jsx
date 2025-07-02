import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to generate random ticket data
  const generateRandomTickets = (users) => {
    const events = [
      { title: 'Rock Concert', price: 1500 },
      { title: 'Jazz Festival', price: 2000 },
      { title: 'Comedy Night', price: 800 },
      { title: 'Dance Workshop', price: 1200 },
      { title: 'Art Exhibition', price: 500 }
    ];

    const paymentMethods = ['card', 'upi', 'netbanking'];
    const statuses = ['confirmed', 'pending', 'cancelled', 'used'];

    const generatedTickets = [];

    users.forEach(user => {
      // Generate random number of tickets (0-10) for each user
      const numTickets = Math.floor(Math.random() * 11);
      
      for (let i = 0; i < numTickets; i++) {
        const event = events[Math.floor(Math.random() * events.length)];
        const quantity = Math.floor(Math.random() * 4) + 1; // 1-4 tickets
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        const purchaseDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000); // Random date within last 30 days

        generatedTickets.push({
          _id: `ticket_${user._id}_${i}`,
          event: {
            title: event.title,
            price: event.price
          },
          user: {
            _id: user._id,
            username: user.username,
            email: user.email
          },
          quantity,
          totalPrice: event.price * quantity,
          status,
          paymentMethod,
          purchaseDate: purchaseDate.toISOString()
        });
      }
    });

    return generatedTickets;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const usersResponse = await axios.get(`${API_URL}/users`, { headers });
        setUsers(usersResponse.data);

        // Generate random tickets for users
        const generatedTickets = generateRandomTickets(usersResponse.data);
        setTickets(generatedTickets);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="admin-dashboard-loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="admin-dashboard-error">{error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{tickets.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{tickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Active Tickets</h3>
          <p>{tickets.filter(t => t.status === 'confirmed').length}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="tickets-section">
          <h2>Recent Ticket Purchases</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Purchased By</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Purchase Date</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  <tr key={ticket._id}>
                    <td>{ticket.event.title}</td>
                    <td>
                      <div className="user-info">
                        <span className="username">{ticket.user.username}</span>
                        <span className="email">{ticket.user.email}</span>
                      </div>
                    </td>
                    <td>{ticket.quantity}</td>
                    <td>₹{ticket.totalPrice}</td>
                    <td>{new Date(ticket.purchaseDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${ticket.status}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="users-section">
          <h2>Users with Tickets</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Total Tickets</th>
                  <th>Total Spent</th>
                  <th>Last Purchase</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                  const userTickets = tickets.filter(ticket => ticket.user._id === user._id);
                  const totalSpent = userTickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0);
                  const lastPurchase = userTickets.length > 0 
                    ? new Date(Math.max(...userTickets.map(t => new Date(t.purchaseDate))))
                    : null;

                  return (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{userTickets.length}</td>
                      <td>₹{totalSpent}</td>
                      <td>{lastPurchase ? lastPurchase.toLocaleDateString() : 'No purchases'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;