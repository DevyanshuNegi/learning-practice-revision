import { useState } from 'react';
import authService from '../services/authService';
import React from 'react';

const Register = ():React.FC => {
  // 1. State Management
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 2. Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Submission (The Data Flow Trigger)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 4. Call the Service Layer
      const data = await authService.registerUser(formData);
      
      // 5. Handle Success
      console.log('Backend response:', data);
      alert('Registration Successful!'); 
      // Redirect logic would go here
      
    } catch (err) {
      // 6. Handle Error
      setError(err); // "Email already exists" from backend
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <input 
        name="email" 
        onChange={handleChange} 
        placeholder="Email" 
      />
      <input 
        name="password" 
        type="password" 
        onChange={handleChange} 
        placeholder="Password" 
      />
      
      <button disabled={loading}>
        {loading ? 'Sending...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;