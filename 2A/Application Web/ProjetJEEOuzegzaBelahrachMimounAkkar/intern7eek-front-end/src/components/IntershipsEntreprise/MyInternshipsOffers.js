/*import React, { useEffect, useState } from 'react';
import './MyInternshipsOffers.css';

const MYINTERNSHIP_URL = "/back/rest/offers";
const INTERNSHIP_DELETE_URL = "/back/rest/delete";
const INTERNSHIP_UPDATE_URL = "/back/rest/update";

function MyInternshipsOffers() {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [editingOffer, setEditingOffer] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch(MYINTERNSHIP_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch offers: ' + response.status);
                }
                const json = await response.json();
                setOffers(json);
            } catch (error) {
                console.error('Failed to fetch offers', error);
                setError('An error occurred while fetching offers');
            }
        };
        fetchOffers();
    }, []);

    const toggleOfferDetails = (id) => {
        setEditingOfferId(editingOfferId === id ? null : id);
        const offer = offers.find((offer) => offer.id === id);
        setEditingOffer(offer);
    };

    const handleDelete = async (id) => {
        console.log(`Delete offer with id: ${id}`);
        try {
            const response = await fetch(`${INTERNSHIP_DELETE_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to delete offer: ' + response.status);
            }
            setOffers(offers.filter(offer => offer.id !== id));
        } catch (error) {
            console.error('Failed to delete offer', error);
            setError('An error occurred while deleting the offer');
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${INTERNSHIP_UPDATE_URL}/${editingOffer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingOffer)
            });
            if (!response.ok) {
                throw new Error('Failed to update offer: ' + response.status);
            }
            const updatedOffer = await response.json();
            setOffers(offers.map(offer => (offer.id === updatedOffer.id ? updatedOffer : offer)));
            setEditingOfferId(null);
            setEditingOffer(null);
        } catch (error) {
            console.error('Failed to update offer', error);
            setError('An error occurred while updating the offer');
        }
    };
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditingOffer({ ...editingOffer, [name]: value });
    };

    return (
        <div className="offers-container">
            <h2>My Internship Offers</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="offers-list">
                {offers.map((offer) => (
                    <li key={offer.id} className="offer-item">
                        <div className="offer-header" onClick={() => toggleOfferDetails(offer.id)}>
                            <h3>{offer.title}</h3>
                            <div className="offer-buttons">
                                <button onClick={(e) => { e.stopPropagation(); setEditingOffer(offer); setEditingOfferId(offer.id); }}>Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(offer.id); }}>Delete</button>
                            </div>
                        </div>
                        {editingOfferId === offer.id && (
                            <form className="edit-form" onSubmit={handleFormSubmit}>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="title"
                                        value={editingOffer.title}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        name="description"
                                        value={editingOffer.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Date:
                                    <input
                                        type="text"
                                        name="date"
                                        value={editingOffer.date}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Location:
                                    <input
                                        type="text"
                                        name="location"
                                        value={editingOffer.location}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Domain:
                                    <input
                                        type="text"
                                        name="domain"
                                        value={editingOffer.domain.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Company:
                                    <input
                                        type="text"
                                        name="company"
                                        value={editingOffer.company}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingOfferId(null)}>Cancel</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyInternshipsOffers;
*/


////////////////////////////////////////////////////////////
/*import React, { useEffect, useState } from 'react';
import './MyInternshipsOffers.css';

const INTERNSHIP_OFFERS_URL = "/back/rest/offers";
const INTERNSHIP_DELETE_URL = "/back/rest/delete";
const INTERNSHIP_UPDATE_URL = "/back/rest/update";

function MyInternshipsOffers({ companyId }) {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [editingOffer, setEditingOffer] = useState(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch(`${INTERNSHIP_OFFERS_URL}/${companyId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch offers: ' + response.status);
                }
                const json = await response.json();
                setOffers(json);
            } catch (error) {
                console.error('Failed to fetch offers', error);
                setError('An error occurred while fetching offers');
            }
        };
        fetchOffers();
    }, [companyId]);

    const toggleOfferDetails = (id) => {
        setEditingOfferId(editingOfferId === id ? null : id);
        const offer = offers.find((offer) => offer.id === id);
        setEditingOffer(offer);
    };

    const handleDelete = async (id) => {
        console.log(`Delete offer with id: ${id}`);
        try {
            const response = await fetch(`${INTERNSHIP_DELETE_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to delete offer: ' + response.status);
            }
            setOffers(offers.filter(offer => offer.id !== id));
        } catch (error) {
            console.error('Failed to delete offer', error);
            setError('An error occurred while deleting the offer');
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${INTERNSHIP_UPDATE_URL}/${editingOffer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingOffer)
            });
            if (!response.ok) {
                throw new Error('Failed to update offer: ' + response.status);
            }
            const updatedOffer = await response.json();
            setOffers(offers.map(offer => (offer.id === updatedOffer.id ? updatedOffer : offer)));
            setEditingOfferId(null);
            setEditingOffer(null);
        } catch (error) {
            console.error('Failed to update offer', error);
            setError('An error occurred while updating the offer');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'domain') {
            setEditingOffer({
                ...editingOffer,
                domain: { ...editingOffer.domain, name: value }
            });
        } else {
            setEditingOffer({ ...editingOffer, [name]: value });
        }
    };

    return (
        <div className="offers-container">
            <h2>My Internship Offers</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="offers-list">
                {offers.map((offer) => (
                    <li key={offer.id} className="offer-item">
                        <div className="offer-header" onClick={() => toggleOfferDetails(offer.id)}>
                            <h3>{offer.title}</h3>
                            <div className="offer-buttons">
                                <button onClick={(e) => { e.stopPropagation(); setEditingOffer(offer); setEditingOfferId(offer.id); }}>Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(offer.id); }}>Delete</button>
                            </div>
                        </div>
                        {editingOfferId === offer.id && (
                            <form className="edit-form" onSubmit={handleFormSubmit}>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="title"
                                        value={editingOffer.title}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        name="description"
                                        value={editingOffer.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Date:
                                    <input
                                        type="text"
                                        name="date"
                                        value={editingOffer.date}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Location:
                                    <input
                                        type="text"
                                        name="location"
                                        value={editingOffer.location}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Domain:
                                    <input
                                        type="text"
                                        name="domain"
                                        value={editingOffer.domain.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingOfferId(null)}>Cancel</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyInternshipsOffers;

// Version 29
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyInternshipsOffers.css';

const MYINTERNSHIP_URL = "/back/rest/offers";
const INTERNSHIP_DELETE_URL = "/back/rest/delete";
const INTERNSHIP_UPDATE_URL = "/back/rest/update";

function MyInternshipsOffers() {
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [editingOffer, setEditingOffer] = useState(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const companyId = params.get('companyId');

    useEffect(() => {
        const fetchOffers = async (companyId) => {
            try {
                const response = await fetch(`${MYINTERNSHIP_URL}/${companyId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch offers: ' + response.status);
                }
                const json = await response.json();
                setOffers(json);
            } catch (error) {
                console.error('Failed to fetch offers', error);
                //setError('An error occurred while fetching offers');
                //setError('No offers found for the given company ID');
            }
        };
        fetchOffers(companyId);
    }, [companyId]);

    const toggleOfferDetails = (id) => {
        setEditingOfferId(editingOfferId === id ? null : id);
        const offer = offers.find((offer) => offer.id === id);
        setEditingOffer(offer);
    };

    const handleDelete = async (id) => {
        console.log(`Delete offer with id: ${id}`);
        try {
            const response = await fetch(`${INTERNSHIP_DELETE_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to delete offer: ' + response.status);
            }
            setOffers(offers.filter(offer => offer.id !== id));
        } catch (error) {
            console.error('Failed to delete offer', error);
            setError('An error occurred while deleting the offer');
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${INTERNSHIP_UPDATE_URL}/${editingOffer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingOffer)
            });
            if (!response.ok) {
                throw new Error('Failed to update offer: ' + response.status);
            }
            const updatedOffer = await response.json();
            setOffers(offers.map(offer => (offer.id === updatedOffer.id ? updatedOffer : offer)));
            setEditingOfferId(null);
            setEditingOffer(null);
        } catch (error) {
            console.error('Failed to update offer', error);
            setError('An error occurred while updating the offer');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'domain') {
            setEditingOffer({
                ...editingOffer,
                domain: { ...editingOffer.domain, name: value }
            });
        } else {
            setEditingOffer({ ...editingOffer, [name]: value });
        }
    };

    return (
        <div className="offers-container">
            <h2>My Internship Offers</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="offers-list">
                {offers.map((offer) => (
                    <li key={offer.id} className="offer-item">
                        <div className="offer-header" onClick={() => toggleOfferDetails(offer.id)}>
                            <h3>{offer.title}</h3>
                            <div className="offer-buttons">
                                <button onClick={(e) => { e.stopPropagation(); setEditingOffer(offer); setEditingOfferId(offer.id); }}>Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(offer.id); }}>Delete</button>
                            </div>
                        </div>
                        {editingOfferId === offer.id && (
                            <form className="edit-form" onSubmit={handleFormSubmit}>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="title"
                                        value={editingOffer.title}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        name="description"
                                        value={editingOffer.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                
                                    <label>
                                    Date:
                                    <input
                                            type="text"
                                            name="date"
                                            value={editingOffer.date}
                                            onChange={handleInputChange}
                                    />
                                    </label>
                                    <label>
                                        Location:
                                        <input
                                            type="text"
                                            name="location"
                                            value={editingOffer.location}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <label>
                                        Domain:
                                        <input
                                            type="text"
                                            name="domain"
                                            value={editingOffer.domain.name}
                                            onChange={handleInputChange}
                                        />
                                    </label>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditingOfferId(null)}>Cancel</button>
                                </form>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    
    export default MyInternshipsOffers;

*/

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MyInternshipsOffers.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const MYINTERNSHIP_URL = "/back/rest/offers";
const APPLICATIONS_URL = "/back/rest/applicationsoffers";
const INTERNSHIP_DELETE_URL = "/back/rest/delete";
const INTERNSHIP_UPDATE_URL = "/back/rest/update";

function MyInternshipsOffers() {
    const [offers, setOffers] = useState([]);
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const [editingOfferId, setEditingOfferId] = useState(null);
    const [editingOffer, setEditingOffer] = useState(null);

    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const companyId = params.get('companyId');

    useEffect(() => {
        const fetchOffers = async (companyId) => {
            try {
                const response = await fetch(`${MYINTERNSHIP_URL}/${companyId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch offers: ' + response.status);
                }
                const json = await response.json();
                setOffers(json);
            } catch (error) {
                console.error('Failed to fetch offers', error);
                setError('An error occurred while fetching offers');
            }
        };
        fetchOffers(companyId);
    }, [companyId]);

    useEffect(() => {
        const fetchApplications = async (companyId) => {
            try {
                const response = await fetch(`${APPLICATIONS_URL}/${companyId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch applications: ' + response.status);
                }
                const json = await response.json();
                setApplications(json);
            } catch (error) {
                console.error('Failed to fetch applications', error);
                setError('An error occurred while fetching applications');
            }
        };
        fetchApplications(companyId);
    }, [companyId]);

    const toggleOfferDetails = (id) => {
        setEditingOfferId(editingOfferId === id ? null : id);
        const offer = offers.find((offer) => offer.id === id);
        setEditingOffer(offer);
    };

    const handleDelete = async (id) => {
        console.log(`Delete offer with id: ${id}`);
        try {
            const response = await fetch(`${INTERNSHIP_DELETE_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error('Failed to delete offer: ' + response.status);
            }
            setOffers(offers.filter(offer => offer.id !== id));
        } catch (error) {
            console.error('Failed to delete offer', error);
            setError('An error occurred while deleting the offer');
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${INTERNSHIP_UPDATE_URL}/${editingOffer.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingOffer)
            });
            if (!response.ok) {
                throw new Error('Failed to update offer: ' + response.status);
            }
            const updatedOffer = await response.json();
            setOffers(offers.map(offer => (offer.id === updatedOffer.id ? updatedOffer : offer)));
            setEditingOfferId(null);
            setEditingOffer(null);
        } catch (error) {
            console.error('Failed to update offer', error);
            setError('An error occurred while updating the offer');
        }
    };

    const handleApplication = (id) => {
        console.log(`View applications for offer with id: ${id}`);
        //navigate(`${APPLICATIONS_URL}/${id}`);
        navigate(`/applications?offerId=${id}`);
        // `/companyspace?companyId=${userData}`
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'domain') {
            setEditingOffer({
                ...editingOffer,
                domain: { ...editingOffer.domain, name: value }
            });
        } else {
            setEditingOffer({ ...editingOffer, [name]: value });
        }
    };

    return (
        <div className="offers-container">
            <h2>My Internship Offers</h2>
            {error && <p className="error-message">{error}</p>}
            <ul className="offers-list">
                {offers.map((offer) => (
                    <li key={offer.id} className="offer-item">
                        <div className="offer-header" onClick={() => toggleOfferDetails(offer.id)}>
                            <h3>{offer.title}</h3>
                            <div className="offer-buttons">
                                <button onClick={(e) => { e.stopPropagation(); setEditingOffer(offer); setEditingOfferId(offer.id); }}>Edit</button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(offer.id); }}>Delete</button>
                                <button onClick={(e) => { e.stopPropagation(); handleApplication(offer.id); }}>View applications</button>
                            </div>
                        </div>
                        {editingOfferId === offer.id && (
                            <form className="edit-form" onSubmit={handleFormSubmit}>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="title"
                                        value={editingOffer.title}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        name="description"
                                        value={editingOffer.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Date:
                                    <input
                                        type="text"
                                        name="date"
                                        value={editingOffer.date}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Location:
                                    <input
                                        type="text"
                                        name="location"
                                        value={editingOffer.location}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Domain:
                                    <input
                                        type="text"
                                        name="domain"
                                        value={editingOffer.domain.name}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingOfferId(null)}>Cancel</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyInternshipsOffers;
