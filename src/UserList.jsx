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
} from '@mui/material';
import api from './services/api'; // Import the centralized Axios instance
import UpdateUserRole from './UpdateUserRole';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const [totalPages, setTotalPages] = useState(1); // State to manage total pages
  const [selectedUser, setSelectedUser] = useState(null); // State to manage selected user for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

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

  const handleUpdate = (updatedUser, setSuccessMessage) => {
    console.log(`Updating user with ID: ${updatedUser.id}, New Role: ${updatedUser.role}`);
    api.put(`/users/${updatedUser.id}/role`, { role: updatedUser.role })
        .then(response => {
            console.log(response.data.message);
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setSuccessMessage('User role updated successfully!');
        })
        .catch(error => {
            console.error('There was an error updating the user role!', error);
            setSuccessMessage('Failed to update user role. Please try again.');
        });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ marginTop: '20px', height: '600px', width: '1250px', overflow: 'auto', border: '1px solid black', borderRadius: '10px' }}>
        <Table>
          <TableHead sx={{ position: 'sticky', top: '0px', zIndex: '100', backgroundColor: '#fcba03' }}>
            <TableRow sx={{ backgroundColor: '#fcba03' }}>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewUser(user)}
                    sx={{ backgroundColor: '#296605' }}
                  >
                    View
                  </Button>
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

      {/* Modal for displaying user details */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="user-details-modal"
        aria-describedby="user-details-description"
      >
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
              <Typography><strong>ID:</strong> {selectedUser.id}</Typography>
              <Typography><strong>Name:</strong> {selectedUser.name}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Role:</strong> {selectedUser.role}</Typography>
              {/* Add more fields as needed */}
            </Box>
          )}
          <UpdateUserRole user={selectedUser} onUpdate={handleUpdate} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
            style={{ marginTop: '20px' }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserList;
