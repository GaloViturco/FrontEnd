import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AgendarCita() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let email = '';
  
  if (token) {
    try {
      const decoded = jwtDecode(token);
      email = decoded.email;
    } catch (err) {
      console.error('Token inválido');
    }
  }

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (e) => setFecha(e.target.value);
  const handleHourChange = (e) => setHora(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://54.173.45.60:8001/agendar-cita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, hora }),
      });
      const data = await response.json();
      if (data.success) {
        setMensaje('Cita agendada con éxito');
      } else {
        setMensaje(data.error || 'Error al agendar la cita');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Hubo un problema al procesar tu solicitud.');
    }
    setIsLoading(false);
  };

  return (
    <div className="agendar-cita-container">
      <h2>Agendar Cita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha (Lunes a Viernes)</label>
          <input
            type="date"
            value={fecha}
            onChange={handleDateChange}
            min="2023-07-01"
            max="2023-12-31"
            required
          />
        </div>
        <div>
          <label>Hora (7 AM a 7 PM)</label>
          <input
            type="time"
            value={hora}
            onChange={handleHourChange}
            min="07:00" max="19:00"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Agendando...' : 'Agendar Cita'}
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default AgendarCita;
