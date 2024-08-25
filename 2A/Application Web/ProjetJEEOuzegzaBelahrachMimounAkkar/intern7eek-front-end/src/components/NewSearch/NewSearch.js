import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './NewSearch.css';

const NewSearch = () => {
    const location = useLocation();
    const { idUser } = useParams(); 
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [field, setField] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const query = `newSearch?title=${title}&field=${field}&location=${searchLocation}`;
        try {
            const data = await invokeGet(query, 'Error fetching search results');
            setResults(data);
        } catch (err) {
            setError('Failed to fetch search results');
        }
    };

    const handleApply = async (internshipId) => {
        const applicationData = {
            studentId: idUser,
            internshipId: internshipId
        };
        console.log(internshipId)
        
        //await invokePost('applying', applicationData, 'Application submitted successfully', 'Error submitting application');
        navigate(`/apply?idUser=${idUser}&idInternship=${internshipId}`);
        

    };

    return (
        <div className="newSearchContainer">
            <form onSubmit={handleSearch} className="searchForm">
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="field">Field</label>
                    <input type="text" id="field" value={field} onChange={(e) => setField(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} required />
                </div>
                <button type="submit">Search</button>
            </form>
            {error && <div className="error">{error}</div>}
            <div className="resultsContainer">
                {results.length > 0 && results.map((result) => (
                    <div key={result.id} className="resultCard">
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                        <button onClick={() => handleApply(result.id)}>Apply</button>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

async function invokeGet(method, failureMsg) {
    const res = await fetch(`/back/rest/${method}`);
    if (res.ok) return await res.json();
    throw new Error(failureMsg);
}

async function invokePost(method, data, successMsg, failureMsg) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(data)
    };
    const res = await fetch(`/back/rest/${method}`, requestOptions);
    if (res.ok) {
        alert(successMsg);
    } else {
        const errorText = await res.text();
        console.error(`API error: ${errorText}`);
        throw new Error(failureMsg);
    }
}

export default NewSearch;
