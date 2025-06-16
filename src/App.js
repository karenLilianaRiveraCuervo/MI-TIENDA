import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NAV } from './componentes/NAV';
import { Catalogo } from './componentes/catalogo';
import { Carrito } from './componentes/Carrito';
import { CarritoProvider } from './componentes/CarritoContext';
import { Registro } from './componentes/registro';
import { Login } from './componentes/login';
import { Administrador } from './componentes/administrador';
import { Pagos } from './componentes/pagos';



function App() {
  return (
    <CarritoProvider>
      <Router>
        <NAV />
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
           <Route path="/administrador" element={<Administrador />} />
          <Route path="/pagos" element={<Pagos />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;
