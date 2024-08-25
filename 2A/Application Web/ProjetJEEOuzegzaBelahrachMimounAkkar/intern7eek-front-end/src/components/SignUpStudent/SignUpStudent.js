import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpStudent } from './ApiServiceMain';
import './SignUpStudent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

function SignUpForm() {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
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
            case 'mail':
                setMail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { 
                name,
                mail,
                password, 
            };
            const response = await signUpStudent(formData);
            setSuccessMessage(response.message || 'Student registered successfully');
            setErrorMessage('');
            navigate('/loginstudent');
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage(error.message || 'An error occurred');
        }
    };

    return (

        <div className="signupStudentContainer">
            <h2>Create an account</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="input-group-signupStudent">
                    <label htmlFor="name">Student name <FontAwesomeIcon icon={faBuilding} /></label>
                    <input type="text" id="name" name="name" value={name} onChange={handleChange} required />
                </div>

            
                <div className="input-group-signupStudent">
                    <label htmlFor="mail">Student Email <FontAwesomeIcon icon={faBuilding} /></label>
                    <input type="text" id="mail" name="mail" value={mail} onChange={handleChange} required />
                </div>

                <div className="input-group-signupStudent">
                    <label htmlFor="password">Password <FontAwesomeIcon icon={faLock} /></label>
                    <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
                </div>

                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}

export default SignUpForm;
