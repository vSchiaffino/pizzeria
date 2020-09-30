CREATE SCHEMA 'pizzeria';
GO

CREATE TABLE `articulos` (
	`id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
	`idcategoria` INT(6) unsigned NOT NULL,
	`nombre` VARCHAR(100) NOT NULL,
	`descripcion` TEXT(300) NOT NULL,
	`precio` FLOAT(10) NOT NULL,
	`referencia` VARCHAR(50) NOT NULL,
	UNIQUE KEY `id` (`id`) USING BTREE,
KEY `idcategoria` (`idcategoria`) USING BTREE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;
GO

CREATE TABLE `categorias` (
	`id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NOT NULL,
	UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB;
GO

CREATE TABLE `users` (
	`id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
	`usuario` VARCHAR(50) NOT NULL,
	`contraseña` VARCHAR(64) NOT NULL,
	`nombre` VARCHAR(100) NOT NULL,
	`puntos` INT(6) NOT NULL,
	`calle1` VARCHAR(100) NOT NULL,
	`calle2` VARCHAR(100) NOT NULL,
	`direccion` VARCHAR(200) NOT NULL,
	UNIQUE KEY `id` (`id`) USING BTREE,
UNIQUE KEY `usuario` (`usuario`) USING BTREE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;
GO

CREATE TABLE `pedidosCabecera` (
	`id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
	`idusuario` INT(6) unsigned NOT NULL,
	`precioTotal` FLOAT(15) NOT NULL,
	`descuentos` INT(5) unsigned NOT NULL,
	UNIQUE KEY `id` (`id`) USING BTREE,
KEY `idusuario` (`idusuario`) USING BTREE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;
GO

CREATE TABLE `pedidosDetalle` (
	`id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
	`idArticulo` INT(6) unsigned NOT NULL,
	`idCabecera` INT(6) unsigned NOT NULL,
	UNIQUE KEY `id` (`id`) USING BTREE,
KEY `idArticulo` (`idArticulo`) USING BTREE,
KEY `idCabecera` (`idCabecera`) USING BTREE,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;


