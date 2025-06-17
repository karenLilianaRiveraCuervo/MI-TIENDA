// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renderiza la navegación y catálogo', () => {
  render(<App />);
  const titulo = screen.getByText(/Catálogo de Productos/i);
  expect(titulo).toBeInTheDocument();
});
test('Renderiza el formulario de login', () => {
  render(<App />);
  const loginForm = screen.getByPlaceholderText(/Iniciar sesión/i);
  expect(loginForm).toBeInTheDocument();
});
test('Renderiza el carrito de compras', () => {
  render(<App />);
  const carrito = screen.getByText(/Tu carrito está vacío./i);
  expect(carrito).toBeInTheDocument();
});