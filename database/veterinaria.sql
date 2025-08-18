-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS Veterinaria;
USE Veterinaria;

-- Tabla Dueños
CREATE TABLE Dueños (
    id_dueño INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT
);

-- Tabla Mascotas
CREATE TABLE Mascotas (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(50) NOT NULL,
    raza VARCHAR(50),
    edad INT,
    id_dueño INT,
    FOREIGN KEY (id_dueño) REFERENCES Dueños(id_dueño) ON DELETE CASCADE
);

-- Tabla Veterinarios
CREATE TABLE Veterinarios (
    id_veterinario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20)
);

-- Tabla Citas
CREATE TABLE Citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo TEXT,
    id_mascota INT,
    id_veterinario INT,
    FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota) ON DELETE CASCADE,
    FOREIGN KEY (id_veterinario) REFERENCES Veterinarios(id_veterinario) ON DELETE SET NULL
);

-- Tabla Tratamientos
CREATE TABLE Tratamientos (
    id_tratamiento INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    costo DECIMAL(10,2) NOT NULL,
    id_cita INT,
    FOREIGN KEY (id_cita) REFERENCES Citas(id_cita) ON DELETE CASCADE
);

-- Insertar algunos datos de prueba
INSERT INTO Dueños (nombre, apellido, telefono, email, direccion) VALUES
('Carlos', 'Pérez', '77712345', 'carlos@gmail.com', 'Av. Siempre Viva 123'),
('María', 'López', '77798765', 'maria@hotmail.com', 'Calle Central 456');

INSERT INTO Mascotas (nombre, especie, raza, edad, id_dueño) VALUES
('Firulais', 'Perro', 'Labrador', 5, 1),
('Michi', 'Gato', 'Siames', 3, 2);

INSERT INTO Veterinarios (nombre, apellido, especialidad, telefono) VALUES
('Ana', 'Torres', 'Medicina General', '77755511'),
('Luis', 'Ramírez', 'Cirugía', '77788822');

INSERT INTO Citas (fecha, hora, motivo, id_mascota, id_veterinario) VALUES
('2025-08-20', '10:00:00', 'Vacunación', 1, 1),
('2025-08-21', '15:30:00', 'Revisión general', 2, 2);

INSERT INTO Tratamientos (descripcion, costo, id_cita) VALUES
('Vacuna antirrábica', 120.50, 1),
('Desparasitación', 80.00, 2);
