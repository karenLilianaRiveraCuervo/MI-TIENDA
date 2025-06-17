// src/componentes/AdminProductos.test.js
import { render, screen } from '@testing-library/react';
import { AdminProductos } from './administrador';

test('visualizacion formulario de administración de productos', () => {
  render(<AdminProductos />);
  expect(screen.getByText(/Agregar Producto/i)).toBeInTheDocument();
});
