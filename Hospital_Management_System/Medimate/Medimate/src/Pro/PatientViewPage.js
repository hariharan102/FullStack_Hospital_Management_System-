import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientViewPage = () => {
  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/patient/${id}`);
      const patientData = response.data;
      setPatient(patientData);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patient-view-container">
      <h1>Patient Details</h1>
      <div>
        <label>Name:</label>
        <span>{patient.name}</span>
      </div>
      <div>
        <label>Age:</label>
        <span>{patient.age}</span>
      </div>
      <div>
        <label>Gender:</label>
        <span>{patient.gender}</span>
      </div>
      <div>
        <label>Address:</label>
        <span>{patient.address}</span>
      </div>
      <div>
        <label>Contact Number:</label>
        <span>{patient.contactNumber}</span>
      </div>
      <div>
        <label>Current Problem:</label>
        <span>{patient.currentProblem}</span>
      </div>
      <div>
        <label>Medical History:</label>
        <span>{patient.medicalHistory}</span>
      </div>
    </div>
  );
};

export default PatientViewPage;
