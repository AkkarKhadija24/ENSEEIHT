import React, { useState } from 'react';
import './Login.css'; // Importez le fichier CSS correspondant
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginstudent } from './LoginService';

const LoginStudent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //console.log('Utilisateur connecté:');
            const userData = await loginstudent(email, password);
            // Traitement de la réponse du backend ici
            console.log('Utilisateur connecté:', userData);
            console.log(userData)

            navigate(`/studentspace?idUser=${userData}`); 
        } catch (error) {
            setError('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
        }
    };

    return (
        <div className="loginContainer">
            <h2> Login </h2>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email Address </label>
                    <span className="input-group-addon"></span>
                    <span className="input-group-addon"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <br />
                <div className="input-group">
                    <label htmlFor="password">Password </label>
                    <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <br />
                <input type="submit" value="Login" />
                {error && <div className="error">{error}</div>}
            </form>
            <a href="#">Forgot Password ?</a><br />
            <Link to="/choixsignup">Create an account</Link><br />
        </div>
    );
};

export default LoginStudent;
