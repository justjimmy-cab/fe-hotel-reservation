import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
  Modal,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert'; // Import MuiAlert for Snackbar
import api from './services/api'; // Import the centralized Axios instance
import UpdateUserRole from './UpdateUserRole';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Logout from './Logout';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [totalPages, setTotalPages] = useState(1); // State to manage total pages
  const [selectedUser, setSelectedUser] = useState(null); // State to manage selected user for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage Snackbar visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get(`/users?page=${currentPage}`); // Fetch paginated data
        setUsers(response.data.data); // 'data' contains the users for the current page
        setTotalPages(response.data.last_page); // 'last_page' from Laravel pagination response
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]); // Refetch users when the page changes

  const handlePageChange = (event, value) => {
    setCurrentPage(value); // Update current page state when pagination changes
  };

  const handleViewUser = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedUser(null); // Clear the selected user
  };

  const handleUpdate = (updatedUser) => {
    console.log(`Updating user with ID: ${updatedUser.id}, New Role: ${updatedUser.role}`);
    api
      .put(`/users/${updatedUser.id}/role`, { role: updatedUser.role })
      .then((response) => {
        console.log(response.data.message);
        setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setSuccessMessage('User role updated successfully!');
        setSnackbarOpen(true); // Open Snackbar
      })
      .catch((error) => {
        console.error('There was an error updating the user role!', error);
        setSuccessMessage('Failed to update user role. Please try again.');
        setSnackbarOpen(true); // Open Snackbar
      });
  };

  const handleDeleteDialogOpen = (userId) => {
    setUserIdToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setUserIdToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    api.delete(`/users/${userIdToDelete}`)
      .then(response => {
        console.log(response.data.message);
        setUsers(users.filter(user => user.id !== userIdToDelete));
        setSuccessMessage('User deleted successfully!');
        setSnackbarOpen(true); // Open Snackbar
        handleDeleteDialogClose();
      })
      .catch((error) => {
        console.error('There was an error deleting the user!', error);
        setSuccessMessage('Failed to delete user. Please try again.');
        setSnackbarOpen(true); // Open Snackbar
        handleDeleteDialogClose();
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false); // Close Snackbar
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#b8dbbf', height: '100vh', }}>
      <Logout/>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '-10px'}}>
      <Paper elevation={5} sx={{ marginTop: '20px', height: '540px', width: '1250px', overflow: 'auto', border: '1px solid black', borderRadius: '10px' }}>
        <Table>
          <TableHead sx={{ position: 'sticky', top: '0px', zIndex: '100', backgroundColor: '#fcba03' }}>
            <TableRow sx={{ backgroundColor: '#fcba03', textAlign: 'center' }}>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell sx={{width: '50px'}}>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={{ width: '100%' }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Box fullWidth sx={{ display: 'flex' }}>
                    <Button variant="contained" color="primary" onClick={() => handleViewUser(user)} sx={{ backgroundColor: '#435e29', marginRight: '10px' }}>
                      View
                    </Button>
                    <IconButton onClick={() => handleDeleteDialogOpen(user.id)} color="error" sx={{ marginLeft: '10px' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
      </Box>

      {/* Modal for displaying user details */}
      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="user-details-modal" aria-describedby="user-details-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            User Details
          </Typography>
          {selectedUser && (
            <Box>
              <Typography>
                <strong>ID:</strong> {selectedUser.id}
              </Typography>
              <Typography>
                <strong>Name:</strong> {selectedUser.name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              {/* Add more fields as needed */}
            </Box>
          )}
          <UpdateUserRole user={selectedUser} onUpdate={handleUpdate} />
          <Button variant="contained" color="primary" onClick={handleCloseModal} style={{ marginTop: '20px' }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default UserList;
