import { render, screen } from '@testing-library/react';
import { Pagos } from '../componentes/pagos';

test('muestra datos del usuario', () => {
  localStorage.setItem('usuario', JSON.stringify({ nombre: 'Karen', correo: 'karen@mail.com', direccion: 'Calle 123' }));
  render(<Pagos />);
  expect(screen.getByText(/Karen/)).toBeInTheDocument();
  expect(screen.getByText(/karen@mail.com/)).toBeInTheDocument();
});
