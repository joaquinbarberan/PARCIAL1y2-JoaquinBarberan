import * as modeloAlumno from '../modelos/alumno.modelo.mjs';


/**
 * Endpoint de consulta REST: devuelve la lista completa de alumnos.
 * GET /alumnos
 */
export const obtenerAlumnos = async (peticion, respuesta) => {
    try {
        const alumnos = await modeloAlumno.obtenerTodos();
        respuesta.status(200).json(alumnos);
    } catch (error) {
        console.error('Error al obtener alumnos:', error.message);
        respuesta.status(500).json({ error: 'No se pudieron obtener los alumnos.' });
    }
};

/**
 * Endpoint de consulta REST: devuelve un alumno según su id.
 * GET /alumnos/:id
 */
export const obtenerPorId = async (peticion, respuesta) => {
    try {
        const idBuscado = Number(peticion.params.id);
        const alumno = await modeloAlumno.obtenerPorId(idBuscado);

        if (!alumno) {
            return respuesta.status(404).json({ mensaje: 'Alumno no encontrado' });
        }

        respuesta.status(200).json(alumno);
    } catch (error) {
        console.error('Error al obtener el alumno:', error.message);
        respuesta.status(500).json({ error: 'No se pudo obtener el alumno.' });
    }
};

/**
 * Endpoint de procedimiento: calcula estadísticas de los alumnos
 * (cantidad total registrada).
 * GET /alumnos/estadisticas
 */
export const obtenerEstadisticas = async (peticion, respuesta) => {
    try {
        const totalAlumnos = await modeloAlumno.contarAlumnos();

        respuesta.status(200).json({
            mensaje: 'Procedimiento ejecutado con éxito.',
            totalAlumnosRegistrados: totalAlumnos,
        });
    } catch (error) {
        console.error('Error al ejecutar el procedimiento:', error.message);
        respuesta.status(500).json({ error: 'No se pudo ejecutar el procedimiento.' });
    }
};
