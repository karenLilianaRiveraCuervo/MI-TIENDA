-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2025 a las 02:34:50
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mi_tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `correo` char(30) NOT NULL COMMENT 'correo proporcionado por el cliente',
  `direccion` varchar(35) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metodo_pago` varchar(20) NOT NULL,
  `fecha_compra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `usuario_id`, `correo`, `direccion`, `total`, `metodo_pago`, `fecha_compra`) VALUES
(14, 5, 'h@gmail.com', 'carrera 8 barrio las florez', 420.00, 'Tarjeta', '2025-06-16'),
(15, 12, 'karenrivera2900612@gmail.com', 'noseeeeee djdjd', 560000.00, 'Efectivo', '2025-06-16'),
(16, 12, 'karenrivera2900612@gmail.com', 'noseeeeee djdjd', 560000.00, 'Efectivo', '2025-06-16'),
(18, 14, 'Jssr217@gmail.com', ' CRA 4 - KENNEDY', 6430000.00, 'Efectivo', '2025-06-16'),
(19, 5, 'h@gmail.com', 'carrera 8 barrio las florez', 420.00, 'Tarjeta', '2025-06-16'),
(20, 15, 'riverasebastian887@gmail.com', 'cra 6 #1-34', 180000.00, 'Tarjeta', '2025-06-16'),
(21, 15, 'riverasebastian887@gmail.com', 'cra 6 #1-34', 180000.00, 'Tarjeta', '2025-06-16'),
(22, 16, 'karentatiana07@gmail.com', 'cra 6 #1-34 Barrio las cruces ', 260000.00, 'Tarjeta', '2025-06-16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_compra`
--

CREATE TABLE `detalle_compra` (
  `id` int(11) NOT NULL,
  `compra_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `nombre_producto` varchar(40) NOT NULL COMMENT 'nombre de el producto comprado',
  `cantidad` int(11) NOT NULL,
  `talla` varchar(5) NOT NULL COMMENT 'talla del producto seleccionado',
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_compra`
--

INSERT INTO `detalle_compra` (`id`, `compra_id`, `producto_id`, `nombre_producto`, `cantidad`, `talla`, `precio_unitario`, `subtotal`) VALUES
(1, 14, 1, 'Tenis Nike', 2, '39', 150.00, 300.00),
(2, 14, 2, 'Chaqueta', 1, 'M', 120.00, 120.00),
(3, 15, 9, 'Body Asimetrico', 14, 'M', 40000.00, 560000.00),
(4, 16, 9, 'Body Asimetrico', 14, 'M', 40000.00, 560000.00),
(8, 18, 9, 'Body Asimetrico', 14, 'M', 40000.00, 560000.00),
(9, 18, 1, 'Sudadera roja', 1, 'S', 90000.00, 90000.00),
(10, 18, 4, 'Gorra Adidas', 4, '', 40000.00, 160000.00),
(11, 18, 7, 'tenis new balance', 7, '37', 150000.00, 1050000.00),
(12, 18, 2, 'Tenis Nike', 14, '42', 180000.00, 2520000.00),
(13, 18, 8, 'camiseta diesel', 20, 'XXL', 50000.00, 1000000.00),
(14, 18, 5, 'Pantaloneta Deportiva', 15, 'XXL', 70000.00, 1050000.00),
(15, 19, 1, 'Tenis Nike', 2, '39', 150.00, 300.00),
(16, 19, 2, 'Chaqueta', 1, 'M', 120.00, 120.00),
(17, 20, 2, 'Tenis Nike', 1, '40', 180000.00, 180000.00),
(18, 21, 2, 'Tenis Nike', 1, '40', 180000.00, 180000.00),
(19, 22, 2, 'Tenis Nike', 1, '40', 180000.00, 180000.00),
(20, 22, 9, 'Body Asimetrico', 2, 'M', 40000.00, 80000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `Talla` int(5) DEFAULT NULL,
  `Cantidad` int(100) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `Talla`, `Cantidad`, `imagen`, `categoria`, `stock`) VALUES
(1, 'Sudadera roja', 'Sudadera en algodón para clima frío', 90000.00, 0, 777, 'img/sudaderaroja.jpg', 'Ropa', 20),
(2, 'Tenis Nike', 'Tenis deportivos originales', 180000.00, 0, 0, 'img/tenis.jpg', 'Calzado', 15),
(3, 'Chaqueta negra', 'Chaqueta impermeable', 120000.00, 0, 0, 'img/chaqueta.jpg', 'Ropa', 10),
(4, 'Gorra Adidas', 'Gorra de algodón ajustable', 40000.00, 0, 0, 'img/gorra.jpg', 'Accesorios', 30),
(5, 'Pantaloneta Deportiva', 'linda y hermosa pantaloneta', 70000.00, 0, 0, 'img/pantaloneta.jpg', 'Ropa', 15),
(6, 'sudadera azul ', 'linda y hermosa sudadera impermeable', 90000.00, 0, 0, 'img/sudaderaazul.jpg', 'ropa', 13),
(7, 'tenis new balance', 'tenis creados para correr', 150000.00, 0, 0, 'img/tenisbalance.jpg', 'Calzado', 7),
(8, 'camiseta diesel', 'linda camiseta casual para dama ', 50000.00, 0, 0, 'img/camiseta.jpg', 'ropa', 20),
(9, 'Body Asimetrico', 'Dody asimetrico en polylicra, linda horma', 40000.00, 0, 0, 'img/bodyasimetrico.jpg', 'Ropa', 100),
(10, 'Body Cruzado', 'lindo y hermoso body cruzado en polylicra', 40000.00, 0, 0, 'img/bodycruzado.jpg', 'Ropa', 100),
(11, 'Body Costillero', 'lindo y hermoso body tro alto en polylicra', 45000.00, 0, 0, 'img/bodycostillero.jpg', 'Ropa', 100),
(12, 'Body Camiseta', 'lindo body', 40000.00, 0, 0, 'img/bodycamiseta.jpg', 'Ropa', 100),
(13, 'Body Manga Larga', NULL, 40000.00, NULL, NULL, 'bodylarga.jpg', 'Ropa', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `direccion` varchar(35) NOT NULL COMMENT 'direccion del usuario',
  `contraseña` varchar(255) DEFAULT NULL,
  `rol` enum('cliente','admin') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `direccion`, `contraseña`, `rol`) VALUES
(2, 'Edwin Marin', 'Edwin@gmail.com', '', '123456', 'cliente'),
(4, 'Karen Liliana Rivera Cuervo ', 'karen.rivera8887@gmail.com', 'cra 6 #1-34', '$2y$10$WxoEyCAXrNxh62wXJ476LeOiN/qa1sW52cHopz/rLyn1pId7IO652', 'admin'),
(5, 'hernan', 'h@gmail.com', 'carrera 8 barrio las florez', '$2y$10$TJypxPFpJIUQMOgLdUpHxetI62pVeIqnS228DUwhdJGW2aOn06xqC', 'cliente'),
(7, 'emily', 'emily@gmail.com', 'jsmsmsmsmms', '$2y$10$/UZ5SX4B7vm5BhNgA7YzmufMfi.gcDJVuAD7t6W8tj/i/hYxSnJJ2', 'cliente'),
(8, 'sara lucia', 'sara@gmail.com', 'sexdrcftvgyb', '$2y$10$RqvhUHm6O78LtF9f03AvH.h3BIKtgp0OqjcsQnCjB8atsa363Bri6', 'cliente'),
(11, 'sara lucia', 'sara1@gmail.com', 'sexdrcftvgyb', '$2y$10$F99.sQ5MFP0Z9vOKb35y7Ou8zNtEYuf1jj2nESZsnbx4B37Dxc.DO', 'cliente'),
(12, 'martha claudia', 'karenrivera2900612@gmail.com', 'noseeeeee djdjd', '$2y$10$s0jQbkflOgHtQmNOz20nsO2ovT6wP4RV7WQdT9tJm5ghHY.OEvwGm', 'cliente'),
(14, 'JUAN SEBASTIAN SILVA RODRIGUEZ', 'Jssr217@gmail.com', ' CRA 4 - KENNEDY', '$2y$10$d51ishHc/4C7.dfNSU2Wf.hebf8v/.IB549hxr3LJTrKl6/IiTMAO', 'cliente'),
(15, 'JUAN SEBASTIAN rivera', 'riverasebastian887@gmail.com', 'cra 6 #1-34', '$2y$10$hLFRxPSEOlqA58hERCOIO.R2zi/f4QO4Rj/b3X27nRN0tu0Nwy8Ay', 'cliente'),
(16, 'karen Tatiana Cuervo Rodriguez', 'karentatiana07@gmail.com', 'cra 6 #1-34 Barrio las cruces ', '$2y$10$vcJDtDn4LaO/cBBYhrMCpu57HC6gDCBhgWe6ZuhMlOn5GCMMOZyBO', 'cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `compra_id` (`compra_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `detalle_compra`
--
ALTER TABLE `detalle_compra`
  ADD CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`compra_id`) REFERENCES `compras` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
