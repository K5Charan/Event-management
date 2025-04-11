import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Sample data for sales by event
    const salesData = [
        {
            id: 1,
            image: '/images/rock-revolt.jpg',
            title: 'Rock Revolt: A Fusion of Power and Passion',
            date: 'Monday, June 10',
            status: 'in 5 days',
            ticketsSold: '100/300',
            revenue: '₹4,50,000'
        },
        {
            id: 2,
            image: '../Images/rock-fest.jpg',
            title: 'Rock Fest Extravaganza',
            date: 'Tuesday, June 21',
            status: 'Next 2 weeks',
            ticketsSold: '200/300',
            revenue: '₹9,00,000'
        },
        {
            id: 3,
            image: '/images/legendary-rock.jpg',
            title: 'A Legendary Gathering of Rock Icons',
            date: 'Friday, July 20',
            status: 'Next month',
            ticketsSold: '120/300',
            revenue: '₹5,40,000'
        }
    ];

    // Sample data for recent purchases
    const purchasesData = [
        {
            code: '#238920483',
            buyer: {
                name: 'Ashley Wilson',
                avatar: '@person.png'
            },
            date: '22/1/2025',
            time: '11:25 PM',
            ticketsSold: 1,
            totalPrice: '₹4500'
        },
        {
            code: '#238920359',
            buyer: {
                name: 'Anna Fernandez',
                avatar: '@person.png'
            },
            date: '24/1/2025',
            time: '09:15 PM',
            ticketsSold: 2,
            totalPrice: '₹9000'
        },
        {
            code: '#239203459',
            buyer: {
                name: 'Elizabeth Bailey',
                avatar: '@person.png'
            },
            date: '11/2/2025',
            time: '03:55 AM',
            ticketsSold: 3,
            totalPrice: '₹13,500'
        },
        {
            code: '#238920359',
            buyer: {
                name: 'John Edwards',
                avatar: '@person.png'
            },
            date: '11/2/2025',
            time: '03:09 AM',
            ticketsSold: 1,
            totalPrice: '₹4,500'
        },
        {
            code: '#238920483',
            buyer: {
                name: 'Jacob Jackson',
                avatar: '@person.png'
            },
            date: '11/2/2025',
            time: '03:43 PM',
            ticketsSold: 2,
            totalPrice: '₹9000'
        }
    ];

    return (
        <>
            <Header />
            <div className="dashboard-page">
                <div className="dashboard-container">
                    <div className="dashboard-header">
                        <div className="breadcrumb">
                            <span>Account</span> / <span>Dashboard</span>
                        </div>
                        <div className="header-right">
                            <h1>Dashboard</h1>
                            <button className="filter-btn">
                                <span className="filter-icon">⚡</span> Filter
                            </button>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card revenue">
                            <div className="stat-icon">₹</div>
                            <div className="stat-amount">₹12,00,000</div>
                            <div className="stat-label">Revenue</div>
                        </div>
                        <div className="stat-card tickets">
                            <div className="stat-icon">🎟️</div>
                            <div className="stat-amount">900<span className="total">/1200</span></div>
                            <div className="stat-label">Tickets Sold</div>
                        </div>
                        <div className="stat-card views">
                            <div className="stat-icon">👁️</div>
                            <div className="stat-amount">2000</div>
                            <div className="stat-label">Event Views</div>
                        </div>
                        <div className="stat-card shares">
                            <div className="stat-icon">↗️</div>
                            <div className="stat-amount">800</div>
                            <div className="stat-label">Event Shares</div>
                        </div>
                    </div>

                    <div className="sales-section">
                        <div className="section-header">
                            <div className="left">
                                <span className="currency-icon">$</span>
                                <h2>Sales by event</h2>
                            </div>
                            <div className="right">
                                <span className="last-update">The last update: 10 minutes ago</span>
                                <select className="sort-select">
                                    <option value="sales">Sort by: Sales</option>
                                    <option value="date">Sort by: Date</option>
                                    <option value="revenue">Sort by: Revenue</option>
                                </select>
                            </div>
                        </div>

                        <div className="sales-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Date of the event</th>
                                        <th>Ticket sold</th>
                                        <th>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salesData.map(event => (
                                        <tr key={event.id}>
                                            <td className="event-cell">
                                                <div className={`event-image event-image-${event.id}`}></div>
                                                <span>{event.title}</span>
                                            </td>
                                            <td>
                                                <div>{event.date}</div>
                                                <div className="status">{event.status}</div>
                                            </td>
                                            <td>{event.ticketsSold}</td>
                                            <td>{event.revenue}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="purchases-section">
                        <div className="section-header">
                            <div className="left">
                                <span className="ticket-icon">🎟️</span>
                                <h2>Recent purchases</h2>
                            </div>
                            <div className="right">
                                <span className="last-update">The last update: 10 minutes ago</span>
                                <Link to="/purchases" className="view-all">View all purchases</Link>
                            </div>
                        </div>

                        <div className="purchases-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Buyer</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Ticket sold</th>
                                        <th>Total price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchasesData.map((purchase, index) => (
                                        <tr key={index}>
                                            <td className="code-cell">
                                                <Link to={`/purchase/${purchase.code}`}>{purchase.code}</Link>
                                            </td>
                                            <td className="buyer-cell">
                                                <div className="buyer-avatar"></div>
                                                <span>{purchase.buyer.name}</span>
                                            </td>
                                            <td>{purchase.date}</td>
                                            <td>{purchase.time}</td>
                                            <td>{purchase.ticketsSold}</td>
                                            <td>{purchase.totalPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <button className="prev-btn">←</button>
                            <div className="page-numbers">
                                <button className={currentPage === 1 ? 'active' : ''}>1</button>
                                <button className={currentPage === 2 ? 'active' : ''}>2</button>
                                <button className={currentPage === 3 ? 'active' : ''}>3</button>
                                <button className={currentPage === 4 ? 'active' : ''}>4</button>
                                <span>...</span>
                                <button>10</button>
                                <button>11</button>
                            </div>
                            <button className="next-btn">→</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard; 