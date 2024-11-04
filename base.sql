DROP DATABASE IF EXISTS HemoScan;
CREATE DATABASE HemoScan;
USE HemoScan;
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    edad INT,
    sexo CHAR(1),
    telefono VARCHAR(15),
    contrasena_hash VARCHAR(255) NOT NULL
);
CREATE TABLE Analisis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    fecha DATE NOT NULL,
    descripcion VARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);
CREATE TABLE ResultadosAnalisis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    analisis_id INT,
    parametro VARCHAR(100),
    valor DECIMAL(10, 2),
    unidad VARCHAR(50),
    rango_referencia VARCHAR(50),
    FOREIGN KEY (analisis_id) REFERENCES Analisis(id) ON DELETE CASCADE
);
