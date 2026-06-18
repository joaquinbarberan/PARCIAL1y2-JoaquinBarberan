import jwt from 'jsonwebtoken';

/**
 * Middlewares de seguridad.
 * Verifican el Token de acceso (JWT) guardado en la cookie httpOnly.
 * Si no hay credenciales válidas, se bloquea el acceso:
 *   - En la API  -> respuesta 401 en JSON.
 *   - En páginas -> redirección al login.
 */

const COOKIE_NOMBRE = process.env.COOKIE_NOMBRE || 'token_acceso';

/**
 * Función interna: extrae y valida el token de la cookie.
 * @returns {Object|null} El payload del token si es válido, o null.
 */
const validarToken = (req) => {
    const token = req.cookies?.[COOKIE_NOMBRE];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRETO);
    } catch {
        // Token inválido, expirado o manipulado.
        return null;
    }
};

/**
 * Protege los endpoints de la API.
 */
export const protegerApi = (req, res, next) => {
    const payload = validarToken(req);

    if (!payload) {
        return res.status(401).json({ error: 'No autorizado. Debe iniciar sesión.' });
    }

    req.usuario = payload; // Datos del usuario disponibles para los controladores.
    next();
};

/**
 * Protege las páginas web.
 */
export const protegerPagina = (req, res, next) => {
    const payload = validarToken(req);

    if (!payload) {
        return res.redirect('/login');
    }

    req.usuario = payload;
    next();
};

/**
 * Para la página de login: si el usuario YA está autenticado,
 * lo redirige directamente a /items en lugar de mostrar el login.
 */
export const redirigirSiAutenticado = (req, res, next) => {
    const payload = validarToken(req);

    if (payload) {
        return res.redirect('/items');
    }

    next();
};
