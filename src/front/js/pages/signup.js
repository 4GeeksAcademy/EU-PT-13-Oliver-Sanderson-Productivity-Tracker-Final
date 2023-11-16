import React, { useState } from 'react';
import '../../styles/signup.css'; // Import the CSS file for styling
import "../../styles/home.css";

const Signup= () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Perform signup logic with the form data
    // For example, you can send the data to a server or perform validation

    // Reset the form fields
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div style={{ height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <form className="bg-light" style={{ padding: '20px', borderRadius: '1px', width: '70%' }} onSubmit={handleSignup}>
        <h2>Signup Form</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="signup-button">Submit</button>
      
        
        <a href="/login" class="login-button">Sign In</a>
       
      </form>
    </div>
  );
};

export default Signup;