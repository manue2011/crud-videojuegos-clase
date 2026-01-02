const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir archivos estáticos

// Configuración de la Base de Datos (PostgreSQL)
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // Estas líneas son importantes para Render.com después:
    ssl: process.env.RENDER ? { rejectUnauthorized: false } : false
});

// --- RUTAS DE LA API (CRUD) ---

// 1. LEER (GET): Obtener todos los videojuegos
app.get('/api/videojuegos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM videojuegos ORDER BY id DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. CREAR (POST): Añadir un nuevo juego
app.post('/api/videojuegos', async (req, res) => {
    const { titulo, consola, anio, genero, estado } = req.body;
    try {
        const query = 'INSERT INTO videojuegos (titulo, consola, anio, genero, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [titulo, consola, anio, genero, estado];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. ACTUALIZAR (PUT): Modificar un juego (ej. cambiar estado)
app.put('/api/videojuegos/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, consola, anio, genero, estado } = req.body;
    try {
        const query = 'UPDATE videojuegos SET titulo = $1, consola = $2, anio = $3, genero = $4, estado = $5 WHERE id = $6 RETURNING *';
        const values = [titulo, consola, anio, genero, estado, id];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. BORRAR (DELETE): Eliminar un juego
app.delete('/api/videojuegos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM videojuegos WHERE id = $1', [id]);
        res.json({ message: 'Videojuego eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Arrancar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});