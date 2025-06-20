
import React, { useState, useEffect } from 'react';
import { useCarrito } from './CarritoContext';
import { useNavigate } from 'react-router-dom';

export const Pagos = () => {
  const { carrito } = useCarrito();
  const [usuario, setUsuario] = useState(null);
  const [metodoPago, setMetodoPago] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const datosUsuario = JSON.parse(localStorage.getItem('usuario'));
    setUsuario(datosUsuario);
  }, []);

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const handlePagar = async () => {
    if (!metodoPago) return alert('⚠️ Debes seleccionar un método de pago.');

    if (!usuario || !usuario.nombre || !usuario.correo || !usuario.direccion) {
      alert('⚠️ Faltan datos del usuario. Inicia sesión de nuevo.');
      navigate('/login');
      return;
    }

    const datosFactura = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      direccion: usuario.direccion,
      metodoPago,
      productos: carrito,
      total: calcularTotal()
    };

    try {
      const res = await fetch('https://catalogoapp-evcga9fegxedg8hs.canadacentral-01.azurewebsites.net/backend/enviar_factura.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosFactura)
      });

      const data = await res.json();

      if (data.success) {
        alert('✅ Factura enviada correctamente a tu correo.');
        navigate('/');
      } else {
        alert('❌ Hubo un problema al registrar la compra.');
        console.error('Respuesta del servidor:', data);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('❌ Error de conexión con el servidor.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={tituloStyle}> Resumen de compra</h2>

      {!usuario ? (
        <p>Cargando datos del usuario...</p>
      ) : (
        <>
          <div style={infoCliente}>
            <h4>👤 Información del Cliente</h4>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>Dirección:</strong> {usuario.direccion}</p>
          </div>

          <div style={resumenStyle}>
            <h4>Productos:</h4>
            {carrito.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              carrito.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <p><strong>{item.nombre}</strong> x{item.cantidad} - Talla: {item.talla}</p>
                  <p>Subtotal: ${item.precio * item.cantidad}</p>
                </div>
              ))
            )}
            <h3>Total: ${calcularTotal()}</h3>
          </div>

          <div style={metodoPagoStyle}>
            <h4> Selecciona un método de pago:</h4>
            <div style={opcionesContainer}>
              <label style={opcionStyle}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="Tarjeta"
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <img src="img/tarjeta.jpg" alt="Tarjeta" width="60" height="50" />
                Tarjeta
              </label>
              <label style={opcionStyle}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="PSE"
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <img src="img/pse.jpg" alt="PSE" width="60" height="50"  />
                PSE
              </label>
              <label style={opcionStyle}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="Efectivo"
                  onChange={(e) => setMetodoPago(e.target.value)}
                />
                <img src="img/efectivo.jpg" alt="Efectivo" width="60" height="50" />
                Efectivo
              </label>
            </div>
          </div>

          <button style={btnPagar} onClick={handlePagar}>
            Confirmar y Pagar
          </button>
        </>
      )}
    </div>
  );
};



const containerStyle = {
  maxWidth: '600px',
  margin: '4rem auto',
  padding: '2rem',
  backgroundColor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  textAlign: 'center'
};

const tituloStyle = {
  color: '#1a8fe2',
  marginBottom: '1.5rem'
};

const infoCliente = {
  textAlign: 'left',
  backgroundColor: '#eaf6ff',
  padding: '1rem',
  borderRadius: '10px',
  border: '1px solid #bde0ff',
  marginBottom: '1rem'
};

const resumenStyle = {
  textAlign: 'left',
  backgroundColor: '#fff',
  padding: '1rem',
  borderRadius: '10px',
  border: '1px solid #ddd',
  lineHeight: '1.6',
  marginBottom: '1.5rem'
};

const metodoPagoStyle = {
  marginBottom: '1.5rem'
};

const opcionesContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '1rem',
  flexWrap: 'wrap'
};

const opcionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '10px'
};

const btnPagar = {
  padding: '12px 20px',
  backgroundColor: '#1a8fe2',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%'
};
