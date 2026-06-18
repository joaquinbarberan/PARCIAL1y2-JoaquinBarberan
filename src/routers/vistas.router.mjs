import { Router } from 'express';
import {mostrarLogin,mostrarItems,mostrarItem,mostrarProcedimiento,} from '../controladores/vistas.controlador.mjs';
import { protegerPagina, redirigirSiAutenticado } from '../middlewares/auth.middleware.mjs';

/**
 * Rutas de las páginas web.
 * Todas las páginas requieren sesión activa (protegerPagina),
 * EXCEPTO el login. Si no hay credenciales válidas, el middleware
 * redirige al login.
 */
const router = Router();

// Raíz: si está autenticado va a /items; si no, al login.
router.get('/', (peticion, respuesta) => respuesta.redirect('/items'));

// Login (público). Si ya hay sesión, redirige a /items.
router.get('/login', redirigirSiAutenticado, mostrarLogin);

// Páginas protegidas.
router.get('/items', protegerPagina, mostrarItems);
router.get('/item', protegerPagina, mostrarItem);
router.get('/procedimiento', protegerPagina, mostrarProcedimiento);

export default router;
