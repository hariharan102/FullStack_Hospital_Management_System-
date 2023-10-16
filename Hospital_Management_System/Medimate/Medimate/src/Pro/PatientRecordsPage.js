import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Container,
  Grid,
} from '@mui/material';

const PatientRecordsPage = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [currentProblem, setCurrentProblem] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/patient/get');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    const ageValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setAge(ageValue);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    const contactNumberValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setContactNumber(contactNumberValue);
  };

  const handleCurrentProblemChange = (event) => {
    setCurrentProblem(event.target.value);
  };

  const handleMedicalHistoryChange = (event) => {
    setMedicalHistory(event.target.value);
  };

  const validateForm = () => {
    if (
      name.trim() === '' ||
      age === '' ||
      gender === '' ||
      address.trim() === '' ||
      contactNumber.trim() === '' ||
      currentProblem.trim() === '' ||
      medicalHistory.trim() === ''
    ) {
      return false;
    }

    if (isNaN(age) || Number(age) <= 0) {
      return false;
    }

    if (!/^\d+$/.test(contactNumber)) {
      return false;
    }

    return true;
  };

  const handleAddPatient = () => {
    if (validateForm()) {
      const newPatient = {
        name,
        age,
        gender,
        address,
        contactNumber,
        currentProblem,
        medicalHistory,
      };

      if (editingPatient) {
        // Updating an existing patient
        axios
          .put(`http://localhost:8080/patient/${editingPatient.id}`, newPatient)
          .then((response) => {
            const updatedPatient = response.data;
            const updatedPatients = patients.map((patient) =>
              patient.id === updatedPatient.id ? updatedPatient : patient
            );
            setPatients(updatedPatients);
            setEditingPatient(null);
            clearForm();
          })
          .catch((error) => {
            console.error('Error updating patient:', error);
          });
      } else {
        // Adding a new patient
        axios
          .post('http://localhost:8080/patient', newPatient)
          .then((response) => {
            const createdPatient = response.data;
            setPatients([...patients, createdPatient]);
            clearForm();
          })
          .catch((error) => {
            console.error('Error creating patient:', error);
          });
      }
    } else {
      alert('Please fill out all fields with valid information before adding a patient.');
    }
  };

  const handleDeletePatient = (patientId) => {
    axios
      .delete(`http://localhost:8080/patient/${patientId}`)
      .then(() => {
        const updatedPatients = patients.filter((patient) => patient.id !== patientId);
        setPatients(updatedPatients);
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setName(patient.name);
    setAge(patient.age);
    setGender(patient.gender);
    setAddress(patient.address);
    setContactNumber(patient.contactNumber);
    setCurrentProblem(patient.currentProblem);
    setMedicalHistory(patient.medicalHistory);
  };

  const handleBack = () => {
    navigate('/');
  };

  const clearForm = () => {
    setName('');
    setAge('');
    setGender('');
    setAddress('');
    setContactNumber('');
    setCurrentProblem('');
    setMedicalHistory('');
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Patient Records
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {editingPatient ? 'Update Patient' : 'Add Patient'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Age"
                  fullWidth
                  type="number"
                  value={age}
                  onChange={handleAgeChange}
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  label="Gender"
                  fullWidth
                  value={gender}
                  placeholder='Slect Gender'
                  onChange={handleGenderChange}
                  required
                >
                  
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={handleAddressChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Number"
                  fullWidth
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Current Problem"
                  fullWidth
                  multiline
                  rows={3}
                  value={currentProblem}
                  onChange={handleCurrentProblemChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Medical History"
                  fullWidth
                  multiline
                  rows={3}
                  value={medicalHistory}
                  onChange={handleMedicalHistoryChange}
                  required
                />
              </Grid>
            </Grid>
            <Button variant="contained" onClick={handleAddPatient}>
              {editingPatient ? 'Update Patient' : 'Add Patient'}
            </Button>
            <Button variant="outlined" onClick={handleBack} sx={{ marginLeft: 2 }}>
              Back
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h2" gutterBottom>
            Existing Patients
          </Typography>
          {patients.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Current Problem</TableCell>
                  <TableCell>Medical History</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.address}</TableCell>
                    <TableCell>{patient.contactNumber}</TableCell>
                    <TableCell>{patient.currentProblem}</TableCell>
                    <TableCell>{patient.medicalHistory}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => handleEditPatient(patient)}>
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeletePatient(patient.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No patients found.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientRecordsPage;