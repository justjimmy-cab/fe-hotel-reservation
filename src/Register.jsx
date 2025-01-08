import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [open, setOpen] = useState(false); // State for Snackbar visibility
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await api.post('/register', {
                name,
                email,
                password,
            });

            // Store the token in localStorage 
            localStorage.setItem('auth_token', response.data.token);

            console.log('Registration successful', response.data);
            setOpen(true); // Show Snackbar on success

            // Delay navigation for 3 seconds 
            setTimeout(() => { navigate('/dashboard'); }, 2000);
        } catch (error) {
            console.error('There was an error registering!', error);
            setError('Registration failed. Please try again.');
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <Box sx={{display: 'flex', height: '100vh', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Paper elevation={7} sx={{padding: '20px', width: '350px'}}>
                <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
                    <Typography>Register</Typography>

                    <TextField 
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField 
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField 
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextField 
                        label="Confirm Password"
                        variant="outlined"
                        margin="normal"
                        size='medium'
                        sx={{marginBottom: '20px'}}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success"  variant="filled" sx={{ width: '100%', backgroundColor: '#31f756', }}>
                            Registration successful!
                        </Alert>
                    </Snackbar>

                    <Box sx={{width: '300px', height: '10px'}} maxWidth>
                        {error && <Typography color="error" sx={{fontSize: '13px',}}>{error}</Typography>}
                    </Box>

                    <Button type="submit" variant='contained'>REGISTER</Button>
                </form>
            </Paper>
        </Box>
    );
}

export default Register;
