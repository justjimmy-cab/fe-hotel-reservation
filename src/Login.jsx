import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance
import './fonts/fonts.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', { // Use the Axios instance
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/users');  // Redirect after login
            }
        } catch (error) {
            setError('Invalid login credentials');
        }
    };

    return (
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100%',
                backgroundImage: 'url(images/bg-image.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%', 
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                <Container maxWidth="sm" sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(250, 250, 250)',
                                            height: '60%',
                                            width: '25%',
                                            borderRadius: '10px',
                                        }}>
                    <Typography variant="h4" component="h1" gutterBottom 
                                sx={{
                                    fontFamily: 'HostGrotesk-SemiBold',
                                }}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                        {error && <Typography color="error">{error}</Typography>}
                    </form>
                </Container>
            </Box>
        </Box>
    );
};

export default Login;
