import React from 'react';
import { useNavigate, useLocation ,useParams} from 'react-router-dom';
import './StudentSpace.css';

function StudentSpace() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract idUser from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const idUser = queryParams.get('idUser');
  //const { idUser } = useParams(); 
  console.log(idUser)
  // Define paths with idUser parameter
  const newSearchPath = `/newsearch?idUser=${idUser}`;
  const myApplicationsPath = `/myapplications?idUser=${idUser}`;
  const allOffersPath = `/alloffers?idUser=${idUser}`;
  const allCompaniesPath = `/allcompanies?idUser=${idUser}`;

  return (
    <div className="studentSpaceContainer">
      <div className="contentStudentSpace">
        <div className="card-container">
          <div className="card" onClick={() => navigate(newSearchPath)}>
            <div className="card-content">
              <p>New Search</p>
            </div>
          </div>
          <div className="card" onClick={() => navigate(myApplicationsPath)}>
            <div className="card-content">
              <p>My Applications</p>
            </div>
          </div>
          <div className="card" onClick={() => navigate(allOffersPath)}>
            <div className="card-content">
              <p>All Offers</p>
            </div>
          </div>
          <div className="card" onClick={() => navigate(allCompaniesPath)}>
            <div className="card-content">
              <p>All Companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSpace;
