import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/signup.css'; // Import the CSS file for styling

const ContactUs = () => {
  const { actions } = useContext(Context);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Check if any field is empty
    if (!email || !message) {
      setErrorMessage('Please fill in all the information.');
      setSuccessMessage('');
      return;
    }

    setIsSubmitting(true);

    // Call the fetchContactUs action with email and message
    actions
      .fetchContactUs(email, message)
      .then(() => {
        // Reset form fields
        setEmail('');
        setMessage('');

        // Display success message
        setSuccessMessage('Thanks for your message! We will get back to you.');
        setErrorMessage('');
      })
      .catch(() => {
        // Display error message
        setErrorMessage('Something went wrong, please check your values');
        setSuccessMessage('');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div id="Contact" className="loginBase">
      <div className="container border-end-0 border-start-0 mx-auto py-5">
        <h1>Contact Us</h1>
        <p>Have any doubts? Share your details, we will get back to you.</p>
        <div className="form-login col-8 mx-auto">
          <div className="signup-container">
            <form className="loginBox" onSubmit={handleFormSubmit}>
              <div className="typeBoxLogin">
                <label>Your Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="typeBoxLogin">
                <label>Your Message:</label>
                <textarea
                  className="form-control"
                  placeholder="Write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="btnBox">
                <button type=" submit" className="btn setbtn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default ContactUs;

