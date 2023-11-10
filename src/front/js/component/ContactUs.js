import React from 'react';

const ContactUs= () => {
  return (
    <div id="Contact" className="container border-end-0 border-start-0 mx-auto py-5">
      <h1>Contact Us</h1>
      <p>
        Have any doubts!! Share your details, we will get back to you..
      </p>
      <div className="form col-8 mx-auto">
        <div style={{ height: '35vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form className="bg-light" style={{ padding: '20px', borderRadius: '1px', width: '80%' }}>
            <div className="form-group row mb-3">
              <label htmlFor="email" className="col-3 col-form-label text-dark text-end">
                <strong>Your Email:</strong>
              </label>
              <div className="col">
                <input type="email" className="col form-control" id="email" placeholder="Your email" />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="message" className="col-3 col-form-label text-dark text-end">
                <strong>Your Message:</strong>
              </label>
              <div className="col">
                <textarea className="col form-control" id="message" placeholder="Write your message here"></textarea>
              </div>
            </div>
            <div className="form-group row">
              <div className="col offset-sm-2">
                <button type="submit" className="btn btn-primary float-end">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;