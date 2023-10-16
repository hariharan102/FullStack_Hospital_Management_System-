import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';

export default function Landing() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [currentProblem, setCurrentProblem] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [loginDetails, setLoginDetails] = useState([]);

  const paperStyle = { padding: '20px 20px', width: 1300, margin: '20px auto' };

  const updatedb = (e) => {
    const details = { id, name, age, gender, address, contactNumber, currentProblem, medicalHistory };
    axios.put(`http://localhost:8080/api/Patients/putpatient?id=${e}`, details)
      .then(() => {
        console.log('Detail Updated');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletesignup = async (id) => {
    axios.delete(`http://localhost:8080/api/Patients/deletepatient?id=${id}`)
      .then(() => {
        console.log('Deleted');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateState = (list) => {
    setId(list.id);
    setName(list.name);
    setAge(list.age);
    setGender(list.gender);
    setAddress(list.address);
    setContactNumber(list.contactNumber);
    setCurrentProblem(list.currentProblem);
    setMedicalHistory(list.medicalHistory);
  };

  const getalldetails = () => {
    axios.get('http://localhost:8080/api/Patients/getpatient')
      .then((response) => {
        setLoginDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getalldetails();
  }, []);

  return (
    <div className="details">
      <button className="bt0" onClick={getalldetails}>
        View Patient Details
      </button>

      <TableContainer component={Paper} elevation={10} sx={{ width: '75%' }} style={paperStyle}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
            {loginDetails.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.name}</TableCell>
                <TableCell>{post.age}</TableCell>
                <TableCell>{post.gender}</TableCell>
                <TableCell>{post.address}</TableCell>
                <TableCell>{post.contactNumber}</TableCell>
                <TableCell>{post.currentProblem}</TableCell>
                <TableCell>{post.medicalHistory}</TableCell>
                <TableCell>
                  <Popup
                    trigger={<button className="editbt" onClick={() => updateState(post)}>Edit</button>}
                    modal
                    nested
                  >
                    {(close) => (
                      <Paper className="model" elevation={15} style={paperStyle}>
                        <div className="modal">
                          <div className="content">
                            <form>
                              <p>ID: <input type="text" value={id} placeholder="ID" onChange={(e) => setId(e.target.value)} required /></p>
                              <p>Name: <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required /></p>
                              <p>Age: <input type="number" value={age} placeholder="Age" onChange={(e) => setAge(e.target.value)} required /></p>
                              <p>Gender: <input type="text" value={gender} placeholder="Gender" onChange={(e) => setGender(e.target.value)} required /></p>
                              <p>Address: <input type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} required /></p>
                              <p>Contact Number: <input type="text" value={contactNumber} placeholder="Contact Number" onChange={(e) => setContactNumber(e.target.value)} required /></p>
                              <p>Current Problem: <input type="text" value={currentProblem} placeholder="Current Problem" onChange={(e) => setCurrentProblem(e.target.value)} required /></p>
                              <p>Medical History: <input type="text" value={medicalHistory} placeholder="Medical History" onChange={(e) => setMedicalHistory(e.target.value)} required /></p>
                            </form>
                          </div>
                          <div>
                            <center>
                              <button className="updatebt" onClick={() => { updatedb(post.id); close(); }}>Update</button>
                            </center>
                          </div>
                        </div>
                      </Paper>
                    )}
                  </Popup>
                  <button className="delbt" onClick={() => { deletesignup(post.id); }}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
