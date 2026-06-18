import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

import { miMiddlewareLogger } from './middlewares/logger.middleware.mjs';
import alumnosRouter from './routers/alumnos.router.mjs';
import authRouter from './routers/auth.router.mjs';
import vistasRouter from './routers/vistas.router.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PUERTO = process.env.PUERTO || 3000;

// Las páginas HTML se sirven desde el mismo backend (mismo dominio y puerto
// que la API), enviándolas con res.sendFile desde el controlador de vistas.

// --- Middlewares globales ---
app.use(express.json());                                   // Cuerpos JSON (API).
app.use(express.urlencoded({ extended: true }));           // Formularios HTML (login).
app.use(cookieParser());                                   // Lectura de cookies (Token de acceso).
app.use(express.static(path.join(__dirname, 'publico')));  // Archivos estáticos (CSS).
app.use(miMiddlewareLogger);                               // Logger propio.

// --- Rutas ---
app.use('/', authRouter);     // Login y cierre de sesión.
app.use('/', vistasRouter);   // Páginas web (interfaz).
app.use('/', alumnosRouter);  // API REST de alumnos (protegida).

// --- Manejo de errores 404 ---
app.use((peticion, respuesta) => {
    respuesta.status(404).json({ error: 'Recurso no encontrado.' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});
