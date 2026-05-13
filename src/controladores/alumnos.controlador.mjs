import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuramos la ruta al archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PATH_JSON = path.join(__dirname, '../datos/alumnos.json');

export const obtenerAlumnos = async (req, res) => {
    // Leemos el archivo JSON
    const contenido = await fs.readFile(PATH_JSON, 'utf-8');
    const alumnos = JSON.parse(contenido);
    
    // Devolvemos la respuesta 
    res.json(alumnos);
};
export const obtenerPorId = async (req, res) => {
    const id_buscado = Number(req.params.id); // Convertimos el ID a número para comparar con el JSON

    const contenido = await fs.readFile(PATH_JSON, 'utf-8');
    const alumnos = JSON.parse(contenido);

    // Buscamos el alumno que coincida con el ID
    const alumno = alumnos.find((a) => Number(a.id) === id_buscado);

    if (alumno) {
        res.json(alumno);
    } else {
        const respuesta = {
            mensaje: "alumno no encontrado",
        };
        res.status(404).json(respuesta);
    }
};
export const obtenerEstadisticas = async (req, res) => {
    const contenido = await fs.readFile(PATH_JSON, 'utf-8');
    const alumnos = JSON.parse(contenido);
    
    // Contar cuántos alumnos hay en total y el promedio de asistencia
    const totalAlumnos = alumnos.length;
    
    res.status(200).json({
        totalAlumnosRegistrados: totalAlumnos,
    });
};