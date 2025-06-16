import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Registro = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    contraseña: ''
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost/MI-TIENDA/backend/registro.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMensaje(data.message);
    if (data.success) {
      navigate('/login');
    }
  };

  return (

    
    <div style={{
      maxWidth: '450px',
      margin: '4rem auto',
      padding: '2rem',
      border: '2px solid #ccc',
      borderRadius: '10px',
      backgroundColor: '#e3f7fe',
      boxShadow: '0 4px 12px rgba(48, 127, 245, 0.93)',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#1a8fe2', marginBottom: '1.5rem' }}>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
          style={campos}
        /><br />
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          onChange={handleChange}
          required
          style={campos}
        /><br />
        <input
          name="direccion"
          placeholder="Dirección"
          onChange={handleChange}
          required
          style={campos}
        /><br />
        <input
          name="contraseña"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          style={campos}
        /><br />

        <button
          type="submit"
          style={buttonPrimary}
        >
          Crear cuenta
        </button>

        <br /><br />

        <p>¿Ya tienes una cuenta? <a href="login">Inicia sesión aquí</a></p>
      </form>
      <p style={{ color: 'red', marginTop: '1rem' }}>{mensaje}</p>
    </div>
  );
};

// Estilos reutilizables


const campos = {
  width: '100%',
  padding: '10px',
  marginBottom: '1rem',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonPrimary = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#1a8fe2',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const buttonSecondary = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#ccc',
  color: '#333',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};
