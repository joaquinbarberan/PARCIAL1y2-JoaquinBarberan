import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Controlador de Vistas (capa C del patrón MVC para la interfaz web).
 * Envía las páginas HTML al navegador con res.sendFile. Los datos de
 * los alumnos se obtienen desde el front consumiendo la API protegida
 * (la cookie con el Token de acceso viaja automáticamente).
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CARPETA_PAGINAS = path.join(__dirname, '../paginas');

/** Devuelve la ruta absoluta a una página HTML. */
const pagina = (archivo) => path.join(CARPETA_PAGINAS, archivo);

/** Página de login (formulario de inicio de sesión). */
export const mostrarLogin = (peticion, respuesta) => {
    respuesta.sendFile(pagina('login.html'));
};

/** Página que lista los items (alumnos). */
export const mostrarItems = (peticion, respuesta) => {
    respuesta.sendFile(pagina('items.html'));
};

/** Página de detalle de un item; el id se recibe por query string (?id=). */
export const mostrarItem = (peticion, respuesta) => {
    respuesta.sendFile(pagina('item.html'));
};

/** Página del procedimiento (botón para ejecutarlo). */
export const mostrarProcedimiento = (peticion, respuesta) => {
    respuesta.sendFile(pagina('procedimiento.html'));
};
