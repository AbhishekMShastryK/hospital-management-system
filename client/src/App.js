import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './modules/logon/Login.js'
import PatientDashboard from './modules/patient/PatientDashboard.js';
import PhysicianScheduling from './modules/physician/physician.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/patienthome" element={isLoggedIn ? <PatientDashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/physicianhome" element={isLoggedIn ? <PhysicianScheduling/> : <Login setIsLoggedIn={setIsLoggedIn} />} />

        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
