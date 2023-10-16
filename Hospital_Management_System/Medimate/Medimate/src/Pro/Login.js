import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  // const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   if (username === 'admin' && password === 'admin') {
  //     alert('Login successful!');
  //     navigate('/patient-records');
  //   } else {
  //     alert('Invalid username or password. Please try again.');
  //   }
  // };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <LockOutlined color="primary" sx={{ fontSize: 64 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Student Details
            </Typography>
          </Box>
          <Box component="form"  sx={{ '& .MuiTextField-root': { mb: 2 } }}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
            label="Tamil"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
          label="English"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
        label="Maths"
        variant="outlined"
        fullWidth
        required
      />
      <TextField
      label="Physics"
      variant="outlined"
      fullWidth
      required
    />
    <TextField
      label="Chemistry"
      variant="outlined"
      fullWidth
      required
    />
    <input type='file'></input>
           
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
