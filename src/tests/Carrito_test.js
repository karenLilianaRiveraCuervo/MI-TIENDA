import { render, screen } from '@testing-library/react';
import { Carrito } from './Carrito';
import { CarritoProvider } from './CarritoContext';

test('Debe mostrar mensaje cuando el carrito está vacío', () => {
  render(
    <CarritoProvider>
      <Carrito />
    </CarritoProvider>
  );
  
  const mensaje = screen.getByText(/Tu carrito está vacío./i);
  expect(mensaje).toBeInTheDocument();
});
