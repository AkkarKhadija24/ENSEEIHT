import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Apply() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const idUser = queryParams.get('idUser');
    const idInternship = queryParams.get('idInternship');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cv, setCv] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    

        const formData = new FormData();
        //formData.append('name', name);
        //formData.append('email', email);
        //formData.append('cv', cv);
        formData.append('idUser', idUser);
        formData.append('idInternship', idInternship);

        try {
            const response = await fetch('/back/rest/applying', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error submitting application');
            }

            setSuccess('Application submitted successfully!');
            setError('');
        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Apply for Internship</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            
                <button type="submit">Submit Application</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}

export default Apply;
