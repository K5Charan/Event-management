import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import axios from 'axios';
import API_URL from '../config/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkUserDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/check-user/${email}`);
      console.log('User details:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error checking user:', error.response?.data);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // First check if user exists and is admin
      const userDetails = await checkUserDetails();
      if (!userDetails) {
        setError('User not found. Please check your email.');
        setLoading(false);
        return;
      }
      if (userDetails.role !== 'admin') {
        setError('This account is not an admin account.');
        setLoading(false);
        return;
      }

      console.log('Attempting admin login with:', { email });
      const res = await axios.post(`${API_URL}/auth/admin/login`, {
        email,
        password
      });
      
      console.log('Admin login response:', res.data);
      
      if (res.data.user && res.data.user.role === 'admin') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/admindashboard');
      } else {
        setError('You are not authorized as admin.');
      }
    } catch (err) {
      console.error('Admin login error:', err.response?.data || err.message);
      if (err.response?.status === 400) {
        setError('Invalid password. Please try again.');
      } else {
        setError(err.response?.data?.message || 'Invalid admin credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <div className="admin-login-error">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
            placeholder="Enter your admin email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit" 
          className="admin-login-btn"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;