// src/components/AllCompanies/AllCompanies.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AllCompanies.css';

function AllCompanies() {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const idUser = new URLSearchParams(location.search).get('idUser');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/back/rest/allCompanies');
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        setError('Failed to fetch companies');
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="container">
      <h1>All Companies</h1>
      {error && <p>{error}</p>}
      <div className="companiesList">
        {companies.map((company) => (
          <div key={company.id} className="companyCard">
            <h2>Company Name : {company.name}</h2>
            <p>Company Description : {company.description}</p>
            {/* Add more company details as needed */}
          </div>
        ))}
      </div>
      <Link to={`/StudentSpace?idUser=${idUser}`}>Back to Student Space</Link>
    </div>
  );
}

export default AllCompanies;
