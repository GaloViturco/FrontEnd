import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import AgendarCita from './pages/AgendarCita';
import ViewAppointments from './pages/ViewAppointments';  // Asegúrate de importar la nueva página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/schedule-appointment" element={<AgendarCita />} />
        <Route path="/view-appointments" element={<ViewAppointments />} />  {/* Nueva ruta para ver citas */}
      </Routes>
    </Router>
  );
}

export default App;
