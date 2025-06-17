
import { render, screen } from '@testing-library/react';
import { Registro } from './registro';

test('Renderiza el formulario de registro', () => {
  render(<Registro />);
  expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Correo/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Dirección/i)).toBeInTheDocument();
});
