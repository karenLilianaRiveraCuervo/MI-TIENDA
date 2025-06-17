import React from 'react';
import './NAV.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

export const NAV = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logoPYMES.jpeg" alt="Logo" />
        <span>PYMES</span>
      </div>
      <div className="navbar-icons">
        <a href="/carrito" title="Carrito">
          <FaShoppingCart />
        </a>
        <a href="/registro" title="Iniciar Sesión">
          <FaUser />
        </a>
      </div>
    </nav>
  );
};
