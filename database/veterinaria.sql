CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

CREATE TABLE IF NOT EXISTS Duenos (
    id_dueno INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT
);

CREATE TABLE IF NOT EXISTS Mascotas (
    id_mascota INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    especie VARCHAR(30) NOT NULL,
    raza VARCHAR(50),
    fecha_nacimiento DATE,
    sexo VARCHAR(10),
    id_dueno INT NOT NULL,
    CONSTRAINT fk_dueno FOREIGN KEY (id_dueno) REFERENCES Duenos(id_dueno)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Historial_Medico (
    id_historial INT PRIMARY KEY,
    id_mascota INT NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT,
    diagnostico TEXT,
    tratamiento TEXT,
    veterinario VARCHAR(100),
    CONSTRAINT fk_mascota_historial FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Vacunas (
    id_vacuna INT PRIMARY KEY,
    nombre_vacuna VARCHAR(100) NOT NULL,
    descripcion TEXT,
    frecuencia_meses INT
);

CREATE TABLE IF NOT EXISTS Vacunas_Aplicadas (
    id_vacuna_aplicada INT PRIMARY KEY,
    id_mascota INT NOT NULL,
    id_vacuna INT NOT NULL,
    fecha_aplicacion DATE NOT NULL,
    proxima_aplicacion DATE,
    CONSTRAINT fk_mascota_vacuna FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_vacuna FOREIGN KEY (id_vacuna) REFERENCES Vacunas(id_vacuna)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Citas (
    id_cita INT PRIMARY KEY,
    id_mascota INT NOT NULL,
    fecha_cita TIMESTAMP NOT NULL,
    motivo TEXT,
    veterinario VARCHAR(100),
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'realizada', 'cancelada')),
    CONSTRAINT fk_mascota_cita FOREIGN KEY (id_mascota) REFERENCES Mascotas(id_mascota)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


INSERT INTO Duenos (id_dueno, nombre, apellido, telefono, email, direccion) VALUES
(1, 'Ana', 'Gomez', '555-123-4567', 'ana.gomez@email.com', 'Calle Sol 123, Ciudad'),
(2, 'Carlos', 'Rodriguez', '555-987-6543', 'carlos.r@email.com', 'Avenida Luna 456, Ciudad'),
(3, 'Maria', 'Lopez', '555-456-7890', 'maria.lopez@email.com', 'Calle Estrella 789, Ciudad');

INSERT INTO Mascotas (id_mascota, nombre, especie, raza, fecha_nacimiento, sexo, id_dueno) VALUES
(1, 'Luna', 'Perro', 'Labrador', '2020-06-15', 'Hembra', 1),
(2, 'Max', 'Gato', 'Siames', '2019-03-22', 'Macho', 1),
(3, 'Toby', 'Perro', 'Beagle', '2021-11-10', 'Macho', 2),
(4, 'Nala', 'Gato', 'Persa', '2022-04-05', 'Hembra', 3);

INSERT INTO Vacunas (id_vacuna, nombre_vacuna, descripcion, frecuencia_meses) VALUES
(1, 'Rabia', 'Vacuna contra el virus de la rabia', 12),
(2, 'Parvovirus', 'Vacuna contra el parvovirus canino', 12),
(3, 'Moquillo', 'Vacuna contra el moquillo canino', 12),
(4, 'Leptospirosis', 'Vacuna contra la leptospirosis', 12),
(5, 'FVRCP', 'Vacuna combinada para gatos (rinotraqueitis, calicivirus, panleucopenia)', 12);

INSERT INTO Historial_Medico (id_historial, id_mascota, fecha, descripcion, diagnostico, tratamiento, veterinario) VALUES
(1, 1, '2025-01-10', 'Consulta por cojera en pata delantera izquierda', 'Esguince leve', 'Reposo y antiinflamatorios por 7 dias', 'Dr. Juan Perez'),
(2, 1, '2025-06-20', 'Control anual', 'Sana', 'Ninguno', 'Dra. Laura Martinez'),
(3, 2, '2025-03-15', 'Consulta por estornudos frecuentes', 'Infeccion respiratoria leve', 'Antibioticos por 10 dias', 'Dr. Juan Perez'),
(4, 3, '2024-12-05', 'Consulta por perdida de apetito', 'Gastritis', 'Dieta blanda y medicacion por 5 dias', 'Dra. Laura Martinez'),
(5, 4, '2025-07-01', 'Revision general', 'Sana', 'Ninguno', 'Dr. Juan Perez');

INSERT INTO Vacunas_Aplicadas (id_vacuna_aplicada, id_mascota, id_vacuna, fecha_aplicacion, proxima_aplicacion) VALUES
(1, 1, 1, '2025-02-01', '2026-02-01'),
(2, 1, 2, '2025-02-01', '2026-02-01'),
(3, 2, 5, '2025-03-01', '2026-03-01'),
(4, 3, 1, '2024-11-15', '2025-11-15'),
(5, 3, 3, '2024-11-15', '2025-11-15'),
(6, 4, 5, '2025-04-10', '2026-04-10');

INSERT INTO Citas (id_cita, id_mascota, fecha_cita, motivo, veterinario, estado) VALUES
(1, 1, '2025-08-20 10:00:00', 'Vacunacion anual', 'Dra. Laura Martinez', 'pendiente'),
(2, 2, '2025-08-25 14:30:00', 'Control post-tratamiento', 'Dr. Juan Perez', 'pendiente'),
(3, 3, '2025-07-10 09:00:00', 'Consulta general', 'Dra. Laura Martinez', 'realizada'),
(4, 4, '2025-09-01 11:00:00', 'Esterilizacion', 'Dr. Juan Perez', 'pendiente');