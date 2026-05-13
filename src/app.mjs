import express from 'express';
import { miMiddlewareLogger } from './middlewares/middleware.mjs';
import alumnosRouter from './routers/alumnos.router.mjs';
const app = express();
const PUERTO = 3000;

// Middleware de Express para entender JSON (visto en clase)
app.use(express.json());

// Aplicación de nuestro middleware propio antes de las rutas
app.use(miMiddlewareLogger);

// Aquí irán nuestras rutas más adelante...
app.use('/', alumnosRouter);
app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});