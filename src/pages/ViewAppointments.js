import React, { useEffect, useState } from 'react';
import './ViewAppointments.css';  // Asegúrate de importar el archivo CSS

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!token) {
        setMessage('No estás autenticado.');
        return;
      }

      try {
        const response = await fetch('http://54.173.45.60:8002/view-appointments', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Enviar el token JWT en los encabezados
          },
        });

        const data = await response.json();
        if (data.success) {
          setAppointments(data.appointments);
        } else {
          setMessage(data.error || 'No se pudieron cargar las citas');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('Hubo un problema al cargar tus citas.');
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div className="appointments-container">
      <h2>Mis Citas</h2>
      {message && <p>{message}</p>}
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              {appointment.fecha} - {appointment.hora}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tienes citas agendadas.</p>
      )}
    </div>
  );
}

export default ViewAppointments;
