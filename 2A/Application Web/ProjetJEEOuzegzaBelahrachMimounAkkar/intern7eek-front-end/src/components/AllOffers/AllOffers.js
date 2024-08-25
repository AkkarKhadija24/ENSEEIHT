import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AllOffers.css';
function AllOffers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('/back/rest/allOffers');
        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        setError('Failed to fetch offers');
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="container">
      <h1>All Offers</h1>
      {error && <p>{error}</p>}
      <div>
        {offers.map((offer) => (
          <div key={offer.id}>
            <h2>Title : {offer.title}</h2>
            <p>Description :{offer.description}</p>
            <p>Location: {offer.location}</p>
          </div>
        ))}
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default AllOffers;
