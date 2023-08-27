import React from 'react'
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Regester from '../pages/Regester';

const Layout_routs = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Regester />} />
        <Route path="/user" element={<Dashboard />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  )
}

export default Layout_routs ; 