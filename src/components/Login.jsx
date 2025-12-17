import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import Cookies from 'js-cookie';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let isAuthenticated = false;

    // Loop through all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Only check keys starting with "user"
      if (key.startsWith("user")) {
        const storedUser = JSON.parse(localStorage.getItem(key));

        if (
          storedUser.email === input.email &&
          storedUser.password === input.password
        ) {
          isAuthenticated = true;

                    
          const twoMinutes = new Date(new Date().getTime() + 1000 * 60 * 1000);

       
          Cookies.set('auth_token', storedUser.email, { expires: twoMinutes });
          
          //save user details 
          
          localStorage.setItem("currentUser", JSON.stringify(storedUser));
          // localStorage.setItem("loggedin", "true");

          alert("Login Successful! Session expires in 15 mins.");

          navigate("/pokemon");
          break;
        }
      }
    }

    if (!isAuthenticated) {
      alert("Wrong Email or Password");
    }
  };
  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={input.email} //declared above state and controlled component
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          placeholder="Enter Email"
          required
        />
        <input
          type="password"
          name="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
          placeholder="Enter Password"
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </form>
    </div>
  );
};

export default Login;