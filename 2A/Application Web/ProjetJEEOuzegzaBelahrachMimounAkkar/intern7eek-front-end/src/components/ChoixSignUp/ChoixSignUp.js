import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChoixSignUp.css';

function ChoixSignUp() {
    const navigate = useNavigate();

    const navigateToStudentSignUp = () => {
        navigate('/signupstudent')
    };

    const navigateToCompanySignUp = () => {
        navigate('/signupcompany');
    };

    return (
        <div>
            
            <div className="signUpChoiceContainer">
                <h2>Create An Account</h2>
                <hr />
                <h2>Choose Your Account Type</h2>
                <div className="signup-options">
                    <button onClick={navigateToStudentSignUp}>Student</button>
                    <button onClick={navigateToCompanySignUp}>Company</button>
                </div>
            </div>
            <div className="footer">
                <p>INTERN7EEK &copy; 2024</p>
            </div>
        </div>
    );
}

export default ChoixSignUp;
