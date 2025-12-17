import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [input, setInput] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  let index = 0;
  let key = "user";

  // Find next available key: user, user1, user2, ...
  while (localStorage.getItem(key)) {
    index++;
    key = `user${index}`;
  }

  // Save user with unique key
  localStorage.setItem(key, JSON.stringify(input));

  alert("Registration Successful!");
  navigate("/login");
};

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          required
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;