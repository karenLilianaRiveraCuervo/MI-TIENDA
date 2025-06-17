import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [form, setForm] = useState({ correo: '', contraseña: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', form);

    try {
      const res = await fetch('http://localhost/MI-TIENDA/backend/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log('Respuesta del login:', data);

     
if (data.success) {
  localStorage.setItem('usuario', JSON.stringify(data.usuario));

  
  const carritoExistente = localStorage.getItem('carrito');
  if (!carritoExistente) {
    localStorage.setItem('carrito', '[]');
  }

  if (data.usuario.rol === 'admin') {
    navigate('/administrador');
  } else {
    navigate('/pagos');
  }


      } else {
        setMensaje(data.message);
      }
    } catch (error) {
      console.error('Error al conectar con login.php:', error);
      setMensaje(' No se pudo conectar con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="contraseña"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Entrar</button>
      </form>
      <p style={styles.message}>{mensaje}</p>
      <p style={{ marginTop: '1rem' }}>
        ¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '4rem auto',
    padding: '2rem',
    border: '2px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    textAlign: 'center'
  },
  title: {
    color: '#1a8fe2',
    marginBottom: '1.5rem'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1a8fe2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  message: {
    color: 'red',
    marginTop: '1rem'
  }
};
