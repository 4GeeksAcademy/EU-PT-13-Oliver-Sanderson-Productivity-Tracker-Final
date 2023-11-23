import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';

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
      .catch((error) => {
        // Display error message
        setErrorMessage('Something went wrong, please check your values');
        setSuccessMessage('');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div id="Contact" className="container border-end-0 border-start-0 mx-auto py-5">
      <h1>Contact Us</h1>
      <p>Have any doubts? Share your details, we will get back to you.</p>
      <div className="form col-8 mx-auto">
        <div style={{ height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form className="bg-light" style={{ padding: '20px', borderRadius: '1px', width: '80%' }} onSubmit={handleFormSubmit}>
            <div className="form-group row mb-3">
              <label htmlFor="email" className="col-3 col-form-label text-dark text-end">
                <strong>Your Email:</strong>
              </label>
              <div className="col">
                <input
                  type="email"
                  className="col form-control"
                  id="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="message" className="col-3 col-form-label text-dark text-end">
                <strong>Your Message:</strong>
              </label>
              <div className="col">
                <textarea
                  className="col form-control"
                  id="message"
                  placeholder="Write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <div className="col offset-sm-2">
                <button type="submit" className="btn btn-primary float-end" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default ContactUs;