import React, { useEffect, useState } from 'react';
import './admin.css';
export const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: '',
    precio: '',
    categoria: '',
    imagen: '',
    stock: ''
  });

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const res = await fetch('https://catalogoapp-evcga9fegxedg8hs.canadacentral-01.azurewebsites.net/backend/api_productos.php');
    const data = await res.json();
    setProductos(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      const body = new URLSearchParams(form).toString();
      await fetch('https://catalogoapp-evcga9fegxedg8hs.canadacentral-01.azurewebsites.net/backend/api_productos.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
    } else {
      await fetch('https://catalogoapp-evcga9fegxedg8hs.canadacentral-01.azurewebsites.net/backend/api_productos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
    }

    setForm({ id: null, nombre: '', precio: '', categoria: '', imagen: '', stock: '' });
    obtenerProductos();
  };

  const handleEditar = (producto) => {
    setForm(producto);
  };

  const handleEliminar = async (id) => {
    const body = new URLSearchParams({ id }).toString();
    await fetch('https://catalogoapp-evcga9fegxedg8hs.canadacentral-01.azurewebsites.net/backend/api_productos.php', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    obtenerProductos();
  };

  return (
   <div className="container">
  <h2>Administrador de Productos</h2>
  <form onSubmit={handleSubmit} className="formulario">
    <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
    <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" type="number" required />
    <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoría" required />
    <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="URL Imagen" required />
    <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" type="number" required />
    <button type="submit">{form.id ? 'Actualizar' : 'Agregar'}</button>
  </form>

  <table className="tabla">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Categoría</th>
        <th>Imagen</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((producto) => (
        <tr key={producto.id}>
          <td>{producto.id}</td>
          <td>{producto.nombre}</td>
          <td>${producto.precio}</td>
          <td>{producto.categoria}</td>
          <td><img src={producto.imagen} alt="" /></td>
          <td>{producto.stock}</td>
          <td>
            <button onClick={() => handleEditar(producto)}>Editar</button>
            <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}