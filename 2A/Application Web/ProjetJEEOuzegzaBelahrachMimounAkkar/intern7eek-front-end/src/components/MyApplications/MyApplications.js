// src/components/MyApplications/MyApplications.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const idUser = new URLSearchParams(location.search).get('idUser');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`/back/rest/userApplications?idUser=${idUser}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        setError('Failed to fetch applications');
      }
    };
    fetchApplications();
  }, [idUser]);

  return (
    <div className="container">
      <h1>My Applications</h1>
      {error && <p>{error}</p>}
      <div>
        {applications.map((application) => (
          <div key={application.id}>
            <h2>{application.internship.title}</h2>
            <p>{application.internship.description}</p>
            <p>Status: {application.state}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyApplications;
