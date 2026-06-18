import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Modelo de Alumno (capa M del patrón MVC).
 * Encapsula el acceso a la fuente de datos (archivo JSON),
 * de modo que los controladores no conozcan los detalles de
 * almacenamiento.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PATH_JSON = path.join(__dirname, '../datos/alumnos.json');

/** Lee y parsea el archivo de datos. */
const leerDatos = async () => {
    const contenido = await fs.readFile(PATH_JSON, 'utf-8');
    return JSON.parse(contenido);
};

/** Devuelve todos los alumnos. */
export const obtenerTodos = async () => leerDatos();

/** Devuelve un alumno por su id, o null si no existe. */
export const obtenerPorId = async (id) => {
    const alumnos = await leerDatos();
    return alumnos.find((alumno) => Number(alumno.id) === Number(id)) ?? null;
};

/** Devuelve la cantidad total de alumnos registrados. */
export const contarAlumnos = async () => {
    const alumnos = await leerDatos();
    return alumnos.length;
};
