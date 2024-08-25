import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './components/styles.css';
import Login from './components/SignIn/Login.js';
import SignUpCompany from './components/SignUpEntreprise/SignUpCompany';
import Home from './components/Home/Home';
import SignUpStudent from './components/SignUpStudent/SignUpStudent.js';
import ChoixSignUp from './components/ChoixSignUp/ChoixSignUp';
import LoginStudent from './components/LoginStudent/LoginStudent';


/*Partie CompanySpace */
import CompanySpace from './components/EntrepriseSpace/CompanySpace';
import AddInternshipOffer from './components/AddOfferEntreprise/AddInternshipOffer';
import CommentsReviews from './components/CommentsEntreprise/CommentsReviews';
import MyInternshipsOffers from './components/IntershipsEntreprise/MyInternshipsOffers';
import ApplicationsOffre from './components/IntershipsEntreprise/ApplicationsOffre';

import StudentSpace from './components/StudentSpace/StudentSpace';
import Apply from './components/Apply/Apply';

import NavBar from './components/SignUpEntreprise/NavBar';
import Footer from './components/SignUpEntreprise//Footer';
import { UserProvider } from './components/LoginStudent/UserContext.js';
import NewSearch from './components/NewSearch/NewSearch.js';
import AllCompanies from './components/AllCompanies/AllCompanies.js';
import AllOffers from './components/AllOffers/AllOffers.js';
import MyApplications from './components/MyApplications/MyApplications.js';

function App() {
  return (
    
      <Router>
        <div className="App">
        <NavBar />
                <Routes>
                      <Route path="/" element={<SignUpCompany />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/companyspace" element={<CompanySpace />} />
                      <Route path="/signupcompany" element={<SignUpCompany />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/addinternshipoffer" element={<AddInternshipOffer />} />
                      <Route path="/myinternshipsofferscompany" element={<MyInternshipsOffers />} />
                      <Route path="/commentsreviews" element={<CommentsReviews />} />
                      <Route path="/signupstudent" element={<SignUpStudent />} />
                      <Route path="/choixsignup" element={<ChoixSignUp />} />
                      <Route path="/loginstudent" element={<LoginStudent />} />
                      <Route path="/studentspace" element={<StudentSpace />} />
                      <Route path="/apply" element={<Apply/>} />

                      <Route path="/newsearch" element={<NewSearch />} />
                      <Route path="/allcompanies" element={<AllCompanies />} />
                      <Route path="/myapplications" element={<MyApplications />} />
                      <Route path="/alloffers" element={<AllOffers />} />
                      <Route path="/applicationsoffers" element={<ApplicationsOffre/>} />
                </Routes>
      
      <Footer /> 
      </div> 
      </Router>

    
      
    
 
    
  );
}

export default App;
