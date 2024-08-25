/*import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CompanySpace.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBriefcase, faComments } from '@fortawesome/free-solid-svg-icons';

function CompanySpace() {
    const [offers, setOffers] = useState([]);

    const handleAddOffer = (newOffer) => {
        setOffers((prevOffers) => [...prevOffers, newOffer]);
    };

    return (
        <div className="companySpaceContainer">
            <div className="contentCompanySpace">
                <h2>Welcome To Your Space!</h2>
                <div className="card-containerCompanySpace">
                    <Link to="/addinternshipoffer" className="cardCompanySpace">
                        <FontAwesomeIcon icon={faBriefcase} className="card-icon" />
                        <span>Add New Internship Offer</span>
                    </Link>
                    <Link to="/myinternshipsofferscompany" className="cardCompanySpace">
                    <FontAwesomeIcon icon={faSearch} />
                        <span>My Internships Offers</span>
                    </Link>
                    <Link to="/commentsreviews" className="cardCompanySpace">
                    <FontAwesomeIcon icon={faComments} />
                        <span>All Comments & Reviews </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CompanySpace;*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CompanySpace.css'; 
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBriefcase, faComments } from '@fortawesome/free-solid-svg-icons';

function CompanySpace() {
    const [offers, setOffers] = useState([]);
    //const [companyId, setCompanyId] = useState(null);

    /*useEffect(() => {
        const storedCompanyId = localStorage.getItem('companyId');
        setCompanyId(storedCompanyId);
    }, []);*/

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const companyId = params.get('companyId');

    const handleAddOffer = (newOffer) => {
        setOffers((prevOffers) => [...prevOffers, newOffer]);
    };

    return (
        <div className="companySpaceContainer">
            <div className="contentCompanySpace">
                <h2>Welcome To Your Space!</h2>
                <div className="card-containerCompanySpace">
                    <Link to={`/addinternshipoffer?companyId=${companyId}`} className="cardCompanySpace">
                        <FontAwesomeIcon icon={faBriefcase} className="card-icon" />
                        <span>Add New Internship Offer</span>
                    </Link>
                    <Link to={`/myinternshipsofferscompany?companyId=${companyId}`} className="cardCompanySpace">
                        <FontAwesomeIcon icon={faSearch} className="card-icon" />
                        <span>My Internships Offers</span>
                    </Link>
                    <Link to={`/commentsreviews?companyId=${companyId}`} className="cardCompanySpace">
                        <FontAwesomeIcon icon={faComments} className="card-icon" />
                        <span>All Comments & Reviews </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CompanySpace;

