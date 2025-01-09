import React, { useState } from 'react';
import { Button, FormControl, Select, MenuItem, Snackbar, Alert, Box, CircularProgress } from '@mui/material';

const UpdateUserRole = ({ user, onUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!role) return;

        setLoading(true);
        onUpdate({ ...user, role }, (message) => {
            setSnackbarMessage(message);
            setSnackbarOpen(true);
            setLoading(false);
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <FormControl fullWidth>
                <Select
                    labelId="role-label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{ height: '50px' }}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Button 
                    type="submit" 
                    variant="contained" 
                    sx={{ marginTop: 2, backgroundColor: '#296605', width: '100%' }} 
                    disabled={loading || role === user.role}
                >
                    {loading ? <CircularProgress size={24} /> : 'Update Role'}
                </Button>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default UpdateUserRole;
