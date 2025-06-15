import React from 'react';
import { useCarrito } from '../componentes/CarritoContext';
import { useNavigate } from 'react-router-dom';
import './carrito.css';

export const Carrito = () => {
  const { carrito, actualizarCantidad, eliminarDelCarrito } = useCarrito();
  const navigate = useNavigate();

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const compras = () => {
    navigate('/');
  };

  const IrAPagar = () => {
    navigate('/login');
  };

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {carrito.map((item, index) => (
            <div key={index} className="item-carrito">
              <img src={item.imagen} alt={item.nombre} />
              <div className="info">
                <h4>{item.nombre}</h4>
                <p>Talla: {item.talla}</p>
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
                    style={{ marginLeft: '10px', width: '60px' }}
                  />
                </p>
                <p>Precio: ${item.precio}</p>
                <p>Subtotal: ${item.precio * item.cantidad}</p>
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ${calcularTotal()}</h3>
          <button className="catalogo" onClick={compras}>SEGUIR COMPRANDO</button>
          <br />
          <br />
          <button className="btn-pagar" onClick={IrAPagar}>Ir a pagar</button>
        </div>
      )}
    </div>
  );
};
