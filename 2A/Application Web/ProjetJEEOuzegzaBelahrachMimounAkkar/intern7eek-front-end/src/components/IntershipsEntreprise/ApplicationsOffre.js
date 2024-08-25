import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const APPLICATIONS_URL = "/back/rest/applicationsoffers";

function ApplicationsOffre() {
    //const { offerId } = useParams();
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const offerId = params.get('offerId');


    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch(`${APPLICATIONS_URL}/${offerId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch applications: ' + response.status);
                }
                const json = await response.json();
                setApplications(json);
            } catch (error) {
                console.error('Failed to fetch applications', error);
                setError('Une erreur est survenue lors de la récupération des candidatures');
            }
        };
        fetchApplications();
    }, [offerId]);

    return (
        <div className="applications-container">
            <h2>Candidatures pour l'offre {offerId}</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="applications-list">
                {applications.map((application) => (
                    <li key={application.id} className="application-item">
                        <p>Candidate Name: {application.name}</p>
                        <p>Date: {application.date}</p>
                        <p>State: {application.state}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ApplicationsOffre;
