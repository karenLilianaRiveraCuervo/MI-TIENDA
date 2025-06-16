// src/componentes/Carrito.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from './CarritoContext';
import './carrito.css';

export const Carrito = () => {
  const navigate = useNavigate();
  const { carrito, actualizarCantidad, eliminarDelCarrito } = useCarrito();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleSeguirComprando = () => {
    navigate('/'); // redirige al catálogo
  };

  const handleIrAPagar = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      if (usuario.rol === 'admin') {
        alert('Bienvenido administrador. Redirigiendo a panel de administración...');
        
      } else {
        alert('Redirigiendo a registro de usuario ...');
        navigate('/registro'); // puedes crear esta ruta
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('Usuario activo:', usuario);
  }, []);

  return (
    <div className="carrito-container">
      <h2>🛒 Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <div className="lista-productos">
          {carrito.map((item, index) => (
            <div key={index} className="item-carrito">
              <img src={item.imagen} alt={item.nombre} className="item-imagen" />
              <div className="info">
                <h4>{item.nombre}</h4>
                <p>Talla: <span>{item.talla}</span></p>
                <p>
                  Cantidad:
                  <input
                    type="number"
                    min="1"
                    max={item.stock || 10}
                    value={item.cantidad}
                    onChange={(e) =>
                      actualizarCantidad(item.id, parseInt(e.target.value))
                    }
                  />
                </p>
                <p>Precio: <strong>${item.precio}</strong></p>
                <p>Subtotal: <strong>${item.precio * item.cantidad}</strong></p>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          ))}

          <h3 className="total-compra">Total: ${total}</h3>

          <div className="botones-carrito">
            <button className="btn-comprar" onClick={handleSeguirComprando}>⏪ Seguir Comprando</button>
            <button className="btn-pagar" onClick={handleIrAPagar}>💳 Ir a Pagar</button>
          </div>
        </div>
      )}
    </div>
  );
};
