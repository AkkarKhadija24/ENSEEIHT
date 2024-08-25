import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpCompany } from './ApiServiceMain';
import './SignUpCompany.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function SignUpForm() {
    const [name, setName] = useState('');
    const [reference, setReference] = useState('');
    const [selectedDomain, setSelectedDomain] = useState('');
    const [description, setDescription] = useState('');
    const [password, setPassword] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'reference':
                setReference(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'password':
                setPassword(value);
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
            const domainObject = { name: selectedDomain };
            const formData = { 
                name, 
                reference, 
                description, 
                domain: domainObject,
                password, 
            };
            const response = await signUpCompany(formData);
            setSuccessMessage(response.message || 'Company registered successfully');
            setErrorMessage('');
            navigate('/login');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.message || 'An error occurred');
        }
    };

    return (

        <div className="signupCompanyContainer">
            <h2>Create an account</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="input-group-signupCompany">
                    <label htmlFor="name">Company name <FontAwesomeIcon icon={faBuilding} /></label>
                    <input type="text" id="name" name="name" value={name} onChange={handleChange} required />
                </div>

                <div className="input-group-signupCompany">
                    <label htmlFor="reference">Reference <FontAwesomeIcon icon={faUser} /></label>
                    <input type="text" id="reference" name="reference" value={reference} onChange={handleChange} required />
                </div>

                <div className="input-group-signupCompany">
                    <label htmlFor="description">Description <FontAwesomeIcon icon={faBuilding} /></label>
                    <input type="text" id="description" name="description" value={description} onChange={handleChange} required />
                </div>

                <div className="input-group-signupCompany">
                    <label htmlFor="password">Password <FontAwesomeIcon icon={faLock} /></label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
                </div>

                <div className="input-group-signupCompany">
                    <label htmlFor="domain">Domain <FontAwesomeIcon icon={faBuilding} /></label>
                    <select id="domain" name="domain" value={selectedDomain} onChange={handleDomainChange} required>
                        <option value="">Select a domain</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="HR">HR</option>
                    </select>
                </div>

                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}

export default SignUpForm;
