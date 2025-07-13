import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar esto
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [currentTime, setCurrentTime] = useState(''); // Estado para la hora

  // Obtener la hora del microservicio
  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await fetch('http://54.144.95.86:5001/current-time');
        const data = await response.json();
        if (data && data.current_time) {
          setCurrentTime(data.current_time);
        }
      } catch (error) {
        console.error('Error al obtener la hora:', error);
      }
    };

    fetchCurrentTime();
  }, []);

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
    const s3URL = `https://bucketgalo123.s3.amazonaws.com/${fileName}`;

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

  const handleViewAppointments = () => {
    navigate('/view-appointments'); // Redirige a la página donde el usuario puede ver sus citas
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

      {/* Mostrar la hora */}
      <div className="current-time">
        {currentTime ? (
          <p className="current-time-text">Hora actual: {currentTime}</p>
        ) : (
          <p className="current-time-text">Cargando hora...</p>
        )}
      </div>

      <div className="chat-button-container">
        <button onClick={handleScheduleAppointment} className="form-button">
          Agendar cita
        </button>
        <button onClick={handleViewAppointments} className="form-button">
          Ver citas
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
