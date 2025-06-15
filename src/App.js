import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NAV } from './componentes/NAV';
import { Catalogo } from './componentes/Catalogo';
import { Carrito } from './componentes/Carrito';
import { CarritoProvider } from './componentes/CarritoContext';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <NAV />
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;
