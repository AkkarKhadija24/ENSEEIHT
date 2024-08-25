import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import './AddInternOffer.css';
import { addOffer } from './AddOfferService';
import { useLocation } from 'react-router-dom';

//function AddInternshipOffer({ onAddOffer }) 
function AddInternshipOffer() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [domain, setSelectedDomain] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //const navigate = useNavigate();
    const locationURL = useLocation();
    const params = new URLSearchParams(locationURL.search);
    const companyId = params.get('companyId');
    //const queryParams = new URLSearchParams(locationURL.search);
    //const companyId = queryParams.get('companyId');

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'date':
                setDate(value);
                break;
            default:
                break;
        }
    };

    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const domainObject = { name: domain };

        const offer = { title, description, location, date, domain: domainObject,
        };
        

        const response = await addOffer(offer, companyId);
        setSuccessMessage(response.message || 'Company Offer internship registered successfully');
        setErrorMessage('');
        //navigate('/companyspace');

        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.message || 'An error occurred while adding the internship offer');
            console.error('Failed to add offer', error);
        }
    };

    return (
        <div className="addOfferInternContainer">
            <h2>Add Internship Offer</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="input-group-addOfferIntern">
                    <label htmlFor="title">Title <FontAwesomeIcon icon={faBuilding} /></label>
                    <input type="text" id="title" name="title" value={title} onChange={handleChange} required />
                </div>

                <div className="input-group-addOfferIntern">
                    <label htmlFor="date">Date <FontAwesomeIcon icon={faBuilding} /></label>
                    <input type="date" id="date" name="date" value={date} onChange={handleChange} required />
                </div>
                
                <div className="input-group-addOfferIntern">
                    <label htmlFor="location">Location <FontAwesomeIcon icon={faBuilding} /></label>
                    <input type="text" id="location" name="location" value={location} onChange={handleChange} required />
                </div>

                <div className="input-group-addOfferIntern">
                    <label htmlFor="field">Field <FontAwesomeIcon icon={faBuilding} /></label>
                    <select id="field" name="field" value={domain} onChange={handleDomainChange} required>
                        <option value="">Select a domain</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                    </select>
                </div>
            
                <div className="input-group-addOfferIntern">
                    <label htmlFor="description">Description <FontAwesomeIcon icon={faBuilding} /></label>
                    <textarea
                        id="description" name="description"
                        value={description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit">Add Offer</button>
            </form>
        </div>
    );
}

export default AddInternshipOffer;
