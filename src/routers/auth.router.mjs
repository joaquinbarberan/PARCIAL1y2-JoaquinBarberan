import { Router } from 'express';
import { iniciarSesion, cerrarSesion } from '../controladores/auth.controlador.mjs';

/**
 * Rutas de autenticación.
 *   POST /login          -> procesa el formulario de inicio de sesión.
 *   GET  /cerrar-sesion   -> elimina la cookie y cierra la sesión.
 */
const router = Router();

router.post('/login', iniciarSesion);
router.get('/cerrar-sesion', cerrarSesion);

export default router;
