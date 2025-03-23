-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2025 a las 18:42:59
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

CREATE TABLE `transactions` (
  `id` varchar(255) NOT NULL,
  `id_transaction` varchar(255) NOT NULL,
  `id_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transactions`
--

INSERT INTO `transactions` (`id`, `id_transaction`, `id_user`) VALUES
('2b9afb77-c774-4cb9-b05e-0711ed98a61c', '6d06a514-85e0-41f7-a20a-7852a113c04b', '906bfa05-278e-4a2d-a0ae-5ba6710ce962'),
('6d347804-ba22-4f94-8527-2067ac559ca8', 'f971954d-ee68-4946-aa49-ed78c85b5b93', '4acd8224-5f6a-4ea2-8baf-21b56d7379d9'),
('6f1896b0-ff64-4554-93a8-041203a45232', '27679286-f062-4f4e-bcb2-b36bab4c6bd7', '4acd8224-5f6a-4ea2-8baf-21b56d7379d9'),
('a08e00f0-a875-4569-b527-6bde2cf9a1d9', '1b56a6f8-02dc-424c-8d38-35a7b7519f15', '906bfa05-278e-4a2d-a0ae-5ba6710ce962'),
('c379c90e-ef19-4b2b-a419-93231ce41115', 'b9a2467b-21bb-44ed-975f-e01759d47915', '4acd8224-5f6a-4ea2-8baf-21b56d7379d9'),
('dc51b208-e957-4e0f-820a-d25d6462164a', '4a30bfb3-b606-425d-a43d-dc515e6462b8', '4acd8224-5f6a-4ea2-8baf-21b56d7379d9'),
('e1a3266e-81bf-4d3f-971e-949555a92fbe', 'f2fbb3dc-0967-4442-81f7-ba73b444175e', '4acd8224-5f6a-4ea2-8baf-21b56d7379d9'),
('f0a300e2-9430-4c50-95ad-a7aecaf18b34', '5ff790f9-ebc9-49f0-a168-96339235e461', '4acd8224-5f6a-4ea2-8baf-21b56d7379d9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
('4acd8224-5f6a-4ea2-8baf-21b56d7379d9', 'pablo123', '$2b$10$UgXBiCd6Ve2lajcO49xSdOV6AqhHTeKVanatiZiHRxV2DOjOMiCie'),
('906bfa05-278e-4a2d-a0ae-5ba6710ce962', 'alejo123', '$2b$10$Kf48tGpN6UYt6eKD9IrqkOnYndwMBizVXsIBZ1oE5ZWq9AXayLOqO');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
