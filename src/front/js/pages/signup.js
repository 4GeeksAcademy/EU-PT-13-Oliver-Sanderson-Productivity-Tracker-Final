import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
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
  const [alertMessage, setAlertMessage] = useState("loading...")
  const [alertType, setAlertType] = useState("success")
  const [redirectLogin, setRedirectLogin] = useState(false)

  const { store, actions } = useContext(Context);

  async function signinSubmit() {
    if (await actions.fetchSignUp(firstName, lastName, email, password)) {
      console.log("YES")
      setShowPopup(true);
      setAlertMessage("Sign up successful.")
      setAlertType("success")
      setTimeout(() => {
        setRedirectLogin(true);
      }, "1000");
    } else {
      console.log("NO")
      setShowPopup(true);
      setAlertMessage("Something is incorrect.")
      setAlertType("danger")
    }
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  }

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!email || !firstName || !lastName || !password) {
      setErrorMessage('Please fill in all the information.');
      setSuccessMessage('');
      return;
    }
    signinSubmit()
  };

  if (redirectLogin) {
		console.log("Redirecting to dashboard.")
		return <Navigate to="/dashboard" />
	}

  return (
    <div style={{ height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form className="bg-light form-placeholder" style={{ padding: '20px', borderRadius: '1px', width: '60%' }} onSubmit={handleSignup}>
        <h2>Signup Form</h2>
        {showPopup && <Alert messageType={alertType} message={alertMessage} />}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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

        <a href="/login" className="login-button">Sign In</a>

      </form>
    </div>
  );
};

export default Signup;