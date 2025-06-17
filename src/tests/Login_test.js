
import { render, screen } from '@testing-library/react';
import { Login } from '../login';

test('visualizar el formulario de login', () => {
  render(<Login />);
  expect(screen.getByPlaceholderText(/Correo/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
});
