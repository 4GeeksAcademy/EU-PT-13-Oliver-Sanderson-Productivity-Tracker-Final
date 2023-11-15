import React, { useState, useEffect } from 'react';

const Quotes = () => {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();

      if (response.ok) {
        setQuote(`${data.content} - ${data.author}`);
      } else {
        console.error('Failed to fetch quote');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Random Quote</h5>
        <p className="card-text">{quote}</p>
        <button className="btn btn-secondary" onClick={fetchQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
};

export default Quotes;
