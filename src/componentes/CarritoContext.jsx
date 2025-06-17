import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);


  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id && item.talla === producto.talla);
    if (existe) {
      const nuevoCarrito = carrito.map(item =>
        item.id === producto.id && item.talla === producto.talla
          ? { ...item, cantidad: item.cantidad + producto.cantidad }
          : item
      );
      setCarrito(nuevoCarrito);
    } else {
      setCarrito([...carrito, producto]);
    }
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    const actualizado = carrito.map(item =>
      item.id === id ? { ...item, cantidad: nuevaCantidad } : item
    );
    setCarrito(actualizado);
  };

  const eliminarDelCarrito = (id) => {
    const filtrado = carrito.filter(item => item.id !== id);
    setCarrito(filtrado);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, actualizarCantidad, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => useContext(CarritoContext);
