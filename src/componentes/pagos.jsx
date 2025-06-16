import React, { useState } from 'react';
import { useCarrito } from './CarritoContext';

export const Pagos = () => {
  const { carrito } = useCarrito();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const [metodoPago, setMetodoPago] = useState('');

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const handlePagar = async () => {
    if (!metodoPago) {
      alert('⚠️ Debes seleccionar un método de pago.');
      return;
    }

    if (!usuario || !usuario.nombre || !usuario.correo || !usuario.Direccion) {
      alert('⚠️ Faltan datos del usuario. Por favor, inicia sesión nuevamente.');
      return;
    }

    const datosFactura = {
      nombre: usuario.nombre,
      correo: usuario.correo,
      direccion: usuario.Direccion,
      metodoPago,
      productos: carrito,
      total: calcularTotal()
    };

    try {
      const res = await fetch('http://localhost/MI-TIENDA/backend/enviar_factura.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosFactura)
      });

      const data = await res.json();

      if (data.success) {
        alert('✅ Factura enviada correctamente a tu correo. ¡Gracias por tu compra!');
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
      <h2 style={tituloStyle}>🧾 Resumen de Pago</h2>

      <div style={infoCliente}>
        <h4>👤 Información del Cliente</h4>
        <p><strong>Nombre:</strong> {usuario?.nombre}</p>
        <p><strong>Correo:</strong> {usuario?.correo}</p>
        <p><strong>Dirección:</strong> {usuario?.Direccion}</p>
      </div>

      <div style={resumenStyle}>
        <h4>🛒 Productos:</h4>
        {carrito.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <p><strong>{item.nombre}</strong> x{item.cantidad} - Talla: {item.talla}</p>
            <p>Subtotal: ${item.precio * item.cantidad}</p>
          </div>
        ))}
        <h3>Total: ${calcularTotal()}</h3>
      </div>

      <div style={metodoPagoStyle}>
        <h4>💰 Selecciona un método de pago:</h4>
        <div style={opcionesContainer}>
          <label style={opcionStyle}>
            <input
              type="radio"
              name="metodoPago"
              value="Tarjeta"
              onChange={(e) => setMetodoPago(e.target.value)}
            />
            <img src="https://img.icons8.com/color/96/mastercard-logo.png" alt="Tarjeta" width="50" />
            Tarjeta
          </label>
          <label style={opcionStyle}>
            <input
              type="radio"
              name="metodoPago"
              value="PSE"
              onChange={(e) => setMetodoPago(e.target.value)}
            />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PSE_Logo.svg/2560px-PSE_Logo.svg.png" alt="PSE" width="50" />
            PSE
          </label>
          <label style={opcionStyle}>
            <input
              type="radio"
              name="metodoPago"
              value="Efectivo"
              onChange={(e) => setMetodoPago(e.target.value)}
            />
            <img src="https://cdn-icons-png.flaticon.com/512/3523/3523063.png" alt="Efectivo" width="50" />
            Efectivo
          </label>
        </div>
      </div>

      <button style={btnPagar} onClick={handlePagar}>
        💳 Confirmar y Pagar
      </button>
    </div>
  );
};

// Estilos
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
