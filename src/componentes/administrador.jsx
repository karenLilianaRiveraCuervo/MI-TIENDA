import React, { useEffect, useState } from 'react';

export const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: '', precio: '', categoria: '', stock: '', imagen: '' });
  const [modoEditar, setModoEditar] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  // 🔄 Obtener productos
  const obtenerProductos = async () => {
    const res = await fetch('http://localhost/MI-TIENDA/backend/api_productos.php');
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // ✅ Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = modoEditar ? 'PUT' : 'POST';

    const res = await fetch('http://localhost/MI-TIENDA/backend/api_productos.php', {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modoEditar ? { id: productoEditar.id, ...formulario } : formulario),
    });

    const data = await res.json();
    alert(data.message);
    setFormulario({ nombre: '', precio: '', categoria: '', stock: '', imagen: '' });
    setModoEditar(false);
    obtenerProductos();
  };

  // 📝 Cargar datos para editar
  const editarProducto = (producto) => {
    setModoEditar(true);
    setProductoEditar(producto);
    setFormulario({
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      stock: producto.stock,
      imagen: producto.imagen,
    });
  };

  // ❌ Eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;

    const res = await fetch('http://localhost/MI-TIENDA/backend/api_productos.php', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    alert(data.message);
    obtenerProductos();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', padding: '2rem', background: '#f9f9f9', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#1a8fe2' }}>Panel de Administración de Productos</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input placeholder="Nombre" name="nombre" value={formulario.nombre} onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })} required />
        <input placeholder="Precio" name="precio" value={formulario.precio} onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })} required />
        <input placeholder="Categoría" name="categoria" value={formulario.categoria} onChange={(e) => setFormulario({ ...formulario, categoria: e.target.value })} required />
        <input placeholder="Stock" name="stock" value={formulario.stock} onChange={(e) => setFormulario({ ...formulario, stock: e.target.value })} required />
        <input placeholder="URL de imagen" name="imagen" value={formulario.imagen} onChange={(e) => setFormulario({ ...formulario, imagen: e.target.value })} required />
        <button type="submit" style={{ background: modoEditar ? '#ffa500' : '#1a8fe2', color: '#fff', padding: '10px', marginTop: '10px' }}>
          {modoEditar ? 'Actualizar' : 'Agregar'}
        </button>
      </form>

      <table width="100%" border="1" cellPadding="10" style={{ background: '#fff' }}>
        <thead>
          <tr>
            <th>Nombre</th><th>Precio</th><th>Categoría</th><th>Stock</th><th>Imagen</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.categoria}</td>
              <td>{p.stock}</td>
              <td><img src={p.imagen} alt={p.nombre} width="50" /></td>
              <td>
                <button onClick={() => editarProducto(p)} style={{ marginRight: '10px' }}>Editar</button>
                <button onClick={() => eliminarProducto(p.id)} style={{ backgroundColor: 'red', color: 'white' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

