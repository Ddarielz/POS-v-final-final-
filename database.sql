DROP DATABASE IF EXISTS `pos`;

CREATE DATABASE IF NOT EXISTS `pos`;

USE `pos`;
DROP TABLE `products`;
CREATE TABLE IF NOT EXISTS `products` (
    `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `code_product` VARCHAR(20) NOT NULL UNIQUE,
    `name_product` VARCHAR(255) NOT NULL CHECK(`name_product` != ''), 
    `price_product` DECIMAL(10,2) UNSIGNED NOT NULL,
    `exists_product` INT UNSIGNED DEFAULT 0,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO products (id, code_product, name_product, price_product, exists_product, is_active, created_at, updated_at)
VALUES (NULL, '123', '  DASDASDAS   ', 25, 1, 1, NOW(), NOW());


-- Insertar 100 productos del catálogo
INSERT INTO `products` (`code_product`, `name_product`, `price_product`, `exists_product`) VALUES
('100', 'Tortilla Maiz kg', 8.00, 50),
('101', 'Frijol', 25.00, 30),
('102', 'Harina', 25.00, 25),
('103', 'Pasta para sopa', 25.00, 40),
('104', 'Pollo', 25.00, 15),
('105', 'Bistec de res', 25.00, 20),
('106', 'Pierna de cerdo', 25.00, 10),
('107', 'Huevos', 25.00, 60),
('108', 'Atún', 25.00, 35),
('109', 'Sardinas', 45.50, 25),
('110', 'Machaca', 80.00, 8),
('111', 'Limon', 45.50, 40),
('112', 'Manzana', 45.50, 35),
('113', 'Platano', 45.50, 50),
('114', 'Piña', 45.50, 12),
('115', 'Papa', 45.50, 45),
('116', 'Zanahoria', 45.50, 30),
('117', 'Cebolla', 80.00, 40),
('118', 'Jitomate', 80.00, 35),
('119', 'Chile', 80.00, 25),
('120', 'Leche', 30.00, 20),
('121', 'Aceite', 25.50, 18),
('122', 'Azucar', 55.50, 22),
('123', 'Pan de caja', 25.00, 15),
('124', 'Café soluble', 80.50, 12),
('125', 'Jabon de tocador', 55.90, 25),
('126', 'Papel higienico', 80.00, 30),
('127', 'Pasta dental', 30.50, 20),
('128', 'Detergente', 35.50, 18),
('129', 'Cloro', 25.00, 25),
('130', 'Suavizante', 40.00, 15),
('131', 'Shampoo', 55.00, 20),
('132', 'Crema corporal', 60.00, 15),
('133', 'Desodorante', 35.00, 25),
('134', 'Toallas femeninas', 45.00, 20),
('135', 'Rastrillo', 20.00, 30),
('136', 'Pan dulce', 15.00, 40),
('137', 'Yogurt natural', 22.00, 25),
('138', 'Refresco 2L', 38.00, 30),
('139', 'Agua embotellada 1L', 15.00, 50),
('140', 'Galletas saladas', 18.00, 35),
('141', 'Galletas dulces', 25.00, 30),
('142', 'Cereal', 60.00, 15),
('143', 'Avena', 35.00, 20),
('144', 'Miel', 75.00, 10),
('145', 'Chocolate en polvo', 55.00, 18),
('146', 'Sal', 12.00, 40),
('147', 'Mayonesa', 40.00, 22),
('148', 'Mostaza', 30.00, 20),
('149', 'Catsup', 32.00, 25),
('150', 'Salsa picante', 25.00, 15),
('151', 'Vinagre', 18.00, 20),
('152', 'Caldo de pollo', 28.00, 30),
('153', 'Caldo de res', 28.00, 30),
('154', 'Ajo', 40.00, 25),
('155', 'Comino', 38.00, 15),
('156', 'Orégano', 42.00, 18),
('157', 'Laurel', 30.00, 20),
('158', 'Arroz', 25.00, 35),
('159', 'Lentejas', 27.00, 25),
('160', 'Garbanzo', 26.00, 20),
('161', 'Pan molido', 20.00, 15),
('162', 'Gelatina', 15.00, 30),
('163', 'Flan', 18.00, 25),
('164', 'Helado', 60.00, 12),
('165', 'Paletas', 25.00, 40),
('166', 'Papas fritas', 22.00, 35),
('167', 'Botanas mixtas', 28.00, 25),
('168', 'Chicle', 10.00, 50),
('169', 'Caramelos', 12.00, 45),
('170', 'Chocolate barra', 20.00, 30),
('171', 'Cerveza lata', 25.00, 40),
('172', 'Vino tinto', 150.00, 8),
('173', 'Tequila', 350.00, 5),
('174', 'Ron', 280.00, 6),
('175', 'Whisky', 400.00, 4),
('176', 'Cigarros', 75.00, 20),
('177', 'Encendedor', 15.00, 30),
('178', 'Servilletas', 30.00, 25),
('179', 'Trapeador', 70.00, 10),
('180', 'Escoba', 65.00, 12),
('181', 'Recogedor', 40.00, 15),
('182', 'Fabuloso', 38.00, 20),
('183', 'Pinol', 42.00, 18),
('184', 'Jabón para ropa', 35.00, 22),
('185', 'Cubeta', 55.00, 8),
('186', 'Cepillo de baño', 25.00, 15),
('187', 'Guantes de limpieza', 28.00, 20),
('188', 'Toalla de cocina', 20.00, 25),
('189', 'Trapo multiusos', 15.00, 30),
('190', 'Desinfectante', 38.00, 18),
('191', 'Cinta adhesiva', 18.00, 25),
('192', 'Foco LED', 45.00, 20),
('193', 'Extensión eléctrica', 90.00, 10),
('194', 'Pilas AA', 28.00, 30),
('195', 'Pilas AAA', 30.00, 25),
('196', 'Cargador USB', 85.00, 15),
('197', 'Cable HDMI', 120.00, 8),
('198', 'Audífonos', 150.00, 12),
('199', 'Mouse óptico', 130.00, 10);

DELIMITER //

CREATE TRIGGER trg_products_trim_name_insert
BEFORE INSERT ON products
FOR EACH ROW
SET NEW.name_product = TRIM(NEW.name_product);

//
DELIMITER ;

DROP TABLE sales;
CREATE TABLE IF NOT EXISTS `sales` (
    `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `is_active` BOOLEAN DEFAULT TRUE NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `time` TIME NOT NULL,
    `date` DATE NOT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO `sales` (`id`, `user_id`,`is_active`, `created_at`, `time`, `date`,`updated_at`)
VALUES (NULL, 1, 1,NOW(), CURTIME(),CURDATE(),NOW());

DROP TABLE tickets;
CREATE TABLE IF NOT EXISTS `tickets` (
    `sale_id` BIGINT UNSIGNED NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);

INSERT INTO tickets VALUES (1,1),(1,2),(1,3),(1,4);
INSERT INTO tickets VALUES (2,1);


CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50),
    `email` VARCHAR(40) UNIQUE,
    `password` VARCHAR(128),
    `is_admin` BOOLEAN DEFAULT FALSE,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE USER IF NOT EXISTS `pos`@`127.0.0.1` IDENTIFIED BY '123456789';
GRANT ALL PRIVILEGES ON `pos`.* TO `pos`@`127.0.0.1`;
FLUSH PRIVILEGES;