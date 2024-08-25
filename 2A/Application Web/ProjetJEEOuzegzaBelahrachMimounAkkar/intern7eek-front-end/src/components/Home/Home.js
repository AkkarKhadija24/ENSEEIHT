import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link de react-router-dom
import './Home.css'; // Importez le fichier CSS correspondant

function Home() {
  return (
      <div className="card-container">
        <Link to="/login" className="card">
          <div className="card-content">
            <p>Looking for an internship?</p>
            <p>You are looking for an internship or work-study program?</p>
          </div>
        </Link>
        <Link to="/login" className="card">
          <div className="card-content">
            <p>Posting an internship offer?</p>
            <p>You want to broadcast an ad?</p>
          </div>
        </Link>
      </div>
      );
}

export default Home;


