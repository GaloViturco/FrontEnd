import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar esto
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  // Obtener el email del token
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setEmail(decoded.email);
        
        const storedPic = localStorage.getItem(`profilePic-${decoded.email}`);
        if (storedPic) {
          setProfilePic(storedPic);
        }
      } catch (err) {
        console.error('Token inválido');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirige al login o página principal
  };

  const goToSettings = () => {
    navigate('/settings'); // Redirige a la página de configuraciones
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = `profile_pics/${Date.now()}-${file.name}`;
    const s3URL = `https://chatapp-profile-photos-kamartinez.s3.amazonaws.com/${fileName}`;

    try {
      await fetch(s3URL, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });
      setProfilePic(s3URL);
      localStorage.setItem(`profilePic-${email}`, s3URL);
    } catch (error) {
      console.error('Error al subir imagen:', error);
      alert('Error al subir la imagen');
    }
  };

  const handleScheduleAppointment = () => {
    navigate('/schedule-appointment'); // Redirige a la página para agendar una cita
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button onClick={goToSettings} className="header-button">Configuraciones</button>
        <button onClick={handleLogout} className="header-button">Cerrar sesión</button>
      </div>

      <div className="dashboard-profile">
        <div className="profile-picture-placeholder">
          {profilePic ? (
            <img src={profilePic} alt="Perfil" width={100} height={100} style={{ borderRadius: '50%' }} />
          ) : (
            "Foto"
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <p className="dashboard-email">{email}</p>
      </div>

      <div className="chat-button-container">
        <button onClick={handleScheduleAppointment} className="form-button">
          Agendar cita
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
