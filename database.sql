CREATE TABLE videojuegos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    consola VARCHAR(50) NOT NULL, -- Ej: SNES, Mega Drive, PS1
    anio INTEGER,
    genero VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'Pendiente', -- Ej: Pendiente, Jugando, Terminado
    imagen_url TEXT -- Para poner la carátula luego
);

-- Vamos a insertar un par de juegos de prueba para que no esté vacío
INSERT INTO videojuegos (titulo, consola, anio, genero, estado) 
VALUES ('Super Mario World', 'SNES', 1990, 'Plataformas', 'Terminado');

INSERT INTO videojuegos (titulo, consola, anio, genero, estado) 
VALUES ('Sonic the Hedgehog', 'Mega Drive', 1991, 'Plataformas', 'Pendiente');