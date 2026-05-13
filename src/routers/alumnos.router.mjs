import { Router } from 'express';
// Importaremos los controladores en el siguiente paso
// import { obtenerTodos, obtenerPorId } from '../controladores/alumnos.controller.mjs';
import { obtenerAlumnos, obtenerPorId, obtenerEstadisticas } from '../controladores/alumnos.controlador.mjs';
const router = Router();

// Definiremos las rutas aquí una vez que tengamos los controladores
// router.get('/alumnos', obtenerTodos);
router.get('/alumnos', obtenerAlumnos);
router.get('/alumnos/estadisticas', obtenerEstadisticas);
router.get('/alumnos/:id', obtenerPorId);

export default router;