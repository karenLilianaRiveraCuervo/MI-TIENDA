// src/componentes/Catalogo.jsx
import React, { useEffect, useState } from 'react';

export const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost/MI-TIENDA/backend/get_productos.php')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  return (
    <div>
      <h2>Catálogo de Productos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {productos.map(producto => (
          <div key={producto.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <img src={producto.imagen} alt={producto.nombre} width="150" />
            <h4>{producto.nombre}</h4>
            <p>Precio: ${producto.precio}</p>
            <p>Categoría: {producto.categoria}</p>
            <button>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};
