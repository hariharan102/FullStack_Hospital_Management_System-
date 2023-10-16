import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Landing from './Pro/Landing';
import Login from './Pro/Login';
import PatientRecordsPage from './Pro/PatientRecordsPage';
import PatientViewPage from './Pro/PatientViewPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient-records" element={<PatientRecordsPage />} />
          <Route path="/patient/:id" element={<PatientViewPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
