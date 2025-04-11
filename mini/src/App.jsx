import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TicketsProvider } from './context/TicketsContext';

// Page Components
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InterestSelection from './pages/Interests';
import Location from './pages/Location';
import Events from './pages/Events';
import Search from './pages/Search';
import CreateEvent from './pages/CreateEvent';
import EventReview from './pages/EventReview';
import Dashboard from './pages/Dashboard';
import EventDetails from './pages/EventDetails';
import PurchaseTicket from './pages/PurchaseTicket';
import PaymentSuccess from './pages/PaymentSuccess';
import MyTickets from './pages/MyTickets';
import UpcomingEvents from './pages/UpcomingEvents';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';

const App = () => {
  return (
    <TicketsProvider>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/interests" element={<InterestSelection />} />
            <Route path="/location" element={<Location />} />
            <Route path="/events" element={<Events />} />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/create-event/review" element={<EventReview />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/event/:id/purchase" element={<PurchaseTicket />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </TicketsProvider>
  );
};

export default App;