CREATE SCHEMA IF NOT EXISTS `trailerFlix` DEFAULT CHARACTER SET utf8 ;
USE `trailerFlix` ;



CREATE TABLE IF NOT EXISTS `contenido` (
	`id_contenido` int AUTO_INCREMENT NOT NULL,
	`poster` varchar(100) NOT NULL,
	`titulo` varchar(100) NOT NULL,
	`id_categoria` int NOT NULL,
	`resumen` text NOT NULL,
    `temporada` varchar(20) DEFAULT 'N/A',
	`duracion` int,
	`trailer` varchar(100) NOT NULL,
	PRIMARY KEY (`id_contenido`)
);

CREATE TABLE IF NOT EXISTS `categoria` (
	`id_categoria` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(50) NOT NULL,
	PRIMARY KEY (`id_categoria`)
);

CREATE TABLE IF NOT EXISTS `generos` (
	`id_genero` int AUTO_INCREMENT NOT NULL,
	`nombre_` varchar(50) NOT NULL,
	PRIMARY KEY (`id_genero`)
);

CREATE TABLE IF NOT EXISTS `actores` (
	`id_actores` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(100) NOT NULL,
	`apellido` varchar(100) NOT NULL,
	PRIMARY KEY (`id_actores`)
);

CREATE TABLE IF NOT EXISTS `contenido_genero` (
	`id_contenido_genero` int AUTO_INCREMENT NOT NULL,
	`id_contenido` int NOT NULL,
	`id_genero` int NOT NULL,
	PRIMARY KEY (`id_contenido_genero`)
);

CREATE TABLE IF NOT EXISTS `contenido_actores` (
	`id_contenido_actores` int AUTO_INCREMENT NOT NULL,
	`id_actores` int NOT NULL,
	`id_contenido` int NOT NULL,
	PRIMARY KEY (`id_contenido_actores`)
);

CREATE TABLE IF NOT EXISTS `busqueda` (
	`id_busqueda` int AUTO_INCREMENT NOT NULL UNIQUE,
	`palabras_de_busqueda` text NOT NULL,
	PRIMARY KEY (`id_busqueda`)
);

CREATE TABLE IF NOT EXISTS `contenido_busqueda` (
	`id_contenido` int NOT NULL,
	`id_busqueda` int NOT NULL,
	PRIMARY KEY (`id_contenido`, `id_busqueda`)
);

ALTER TABLE `contenido` ADD CONSTRAINT `contenido_fk3` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id_categoria`);



ALTER TABLE `contenido_genero` ADD CONSTRAINT `contenido_genero_fk1` FOREIGN KEY (`id_contenido`) REFERENCES `contenido`(`id_contenido`);

ALTER TABLE `contenido_genero` ADD CONSTRAINT `contenido_genero_fk2` FOREIGN KEY (`id_genero`) REFERENCES `generos`(`id_genero`);
ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk1` FOREIGN KEY (`id_actores`) REFERENCES `actores`(`id_actores`);

ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk2` FOREIGN KEY (`id_contenido`) REFERENCES `contenido`(`id_contenido`);

ALTER TABLE `contenido_busqueda` ADD CONSTRAINT `contenido_busqueda_fk0` FOREIGN KEY (`id_contenido`) REFERENCES `contenido`(`id_contenido`);

ALTER TABLE `contenido_busqueda` ADD CONSTRAINT `contenido_busqueda_fk1` FOREIGN KEY (`id_busqueda`) REFERENCES `busqueda`(`id_busqueda`);