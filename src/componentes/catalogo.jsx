
import React, { useEffect, useState } from 'react';
import './catalogo.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useCarrito } from './CarritoContext';

export const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState({});
  const [cantidadesSeleccionadas, setCantidadesSeleccionadas] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    fetch('https://catalogoapp-evcga9fegxedg8hs.canadacentral-01.azurewebsites.net/backend/get_productos.php')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  const obtenerTallas = (categoria) => {
    if (categoria.toLowerCase() === 'calzado') return ['36','37','38','39','40','41','42','43'];
    if (categoria.toLowerCase() === 'ropa') return ['S','M','L','XL','XXL'];
    return [];
  };

  const handleAgregarCarrito = (producto) => {
    const talla = tallasSeleccionadas[producto.id] || '';
    const cantidad = parseInt(cantidadesSeleccionadas[producto.id] || 1);

    if (obtenerTallas(producto.categoria).length > 0 && !talla) {
      alert('Por favor selecciona una talla');
      return;
    }

    const nuevoProducto = { ...producto, talla, cantidad };
    agregarAlCarrito(nuevoProducto);
    navigate('/carrito');
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="catalogo-container">
      <h2>Catálogo de Productos</h2>

      <div className="buscador">
        <div className="buscador-input">
          <FaSearch className="icono-lupa" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="catalogo-grid">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h4>{producto.nombre}</h4>
            <p>Precio: ${producto.precio}</p>
            <p>Categoría: {producto.categoria}</p>

            {obtenerTallas(producto.categoria).length > 0 && (
              <div>
                <label>Talla:</label>
                <select
                  onChange={(e) =>
                    setTallasSeleccionadas({
                      ...tallasSeleccionadas,
                      [producto.id]: e.target.value,
                    })
                  }
                >
                  <option value="">Seleccione talla</option>
                  {obtenerTallas(producto.categoria).map((t, i) => (
                    <option key={i} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label>Cantidad:</label>
              <select
                onChange={(e) =>
                  setCantidadesSeleccionadas({
                    ...cantidadesSeleccionadas,
                    [producto.id]: e.target.value,
                  })
                }
              >
                {Array.from({ length: producto.stock }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <button onClick={() => handleAgregarCarrito(producto)}>
              Agregar al Carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
