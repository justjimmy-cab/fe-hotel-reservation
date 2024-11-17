import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import HomePage from './HomePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/Home" element={<HomePage />} />
                <Route path="/" element={<Login />} />
                <Route path="/users" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
