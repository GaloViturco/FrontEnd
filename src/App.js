import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings'; 
import RootDashboard from './pages/RootDashboard';
import RootLogin from './pages/RootLogin';
import AgendarCita from './pages/AgendarCita';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/root-dashboard" element={<RootDashboard />} />
        <Route path="/root-login" element={<RootLogin />} />
        <Route path="/schedule-appointment" element={<AgendarCita />} />
      </Routes>
    </Router>
  );
}

export default App;
