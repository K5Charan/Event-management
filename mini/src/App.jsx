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
import AdminRoute from './components/AdminRoutes';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
    <TicketsProvider>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            
            <Route path="/admindashboard" element={
           <AdminRoute>
             <AdminDashboard />
             </AdminRoute>
           } />
            
            <Route path="/welcome" element={<PrivateRoute><Welcome /></PrivateRoute>} />
            <Route path="/interests" element={<PrivateRoute><InterestSelection /></PrivateRoute>} />
            <Route path="/location" element={<PrivateRoute><Location /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
            <Route path="/upcoming-events" element={<PrivateRoute><UpcomingEvents /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
            <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
            <Route path="/create-event/review" element={<PrivateRoute><EventReview /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/event/:id" element={<PrivateRoute><EventDetails /></PrivateRoute>} />
            <Route path="/event/:id/purchase" element={<PrivateRoute><PurchaseTicket /></PrivateRoute>} />
            <Route path="/payment-success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
            <Route path="/my-tickets" element={<PrivateRoute><MyTickets /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </TicketsProvider>
  );
};

export default App;