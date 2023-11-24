import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import '../../styles/signup.css'; // Import the CSS file for styling
import Alert from '../component/Alert';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const { actions } = useContext(Context);

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!email || !firstName || !lastName || !password) {
      setErrorMessage('Please fill in all the information.');
      setSuccessMessage('');
      return;
    }

    if (actions.fetchSignUp(firstName, lastName, email, password)) {
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setShowPopup(true);
    } else {
      alert('Something went wrong, please check your values');
    }
  };

  return (
    <div className="loginBase">
      <form className="loginBox" onSubmit={handleSignup}>
        <h2>Signup Form</h2>
        {showPopup && <Alert messageType="success" message="The user was created :)" />}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <div className="typeBoxLogin">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="typeBoxLogin">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </div>
        
        <div className="typeBoxLogin">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </div>
        
        <div className="typeBoxLogin">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="btnBox">
  <button type="submit" className="btn setbtn">Submit</button>
  <a href="/login" className="btn setbtn">Sign In</a>
</div>
      </form>
    </div>
  );
};

export default Signup;
