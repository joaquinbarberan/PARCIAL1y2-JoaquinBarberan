import { Router } from 'express';
import {
    obtenerAlumnos,
    obtenerPorId,
    obtenerEstadisticas,
} from '../controladores/alumnos.controlador.mjs';
import { protegerApi } from '../middlewares/auth.middleware.mjs';

/**
 * Rutas de la API de Alumnos.
 * Todas están protegidas por el middleware "protegerApi": sin un
 * Token de acceso válido en la cookie, responden 401 (no autorizado).
 *
 * NOTA: la ruta de estadísticas se declara ANTES que /alumnos/:id
 * para que "estadisticas" no sea interpretada como un id.
 */
const router = Router();

// Endpoint de procedimiento.
router.get('/alumnos/estadisticas', protegerApi, obtenerEstadisticas);

// Endpoints de consulta REST.
router.get('/alumnos', protegerApi, obtenerAlumnos);
router.get('/alumnos/:id', protegerApi, obtenerPorId);

export default router;
