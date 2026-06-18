import { pool } from '../config/db.mjs';

/**
 * Modelo de Usuario (capa M del patrón MVC).
 * Encapsula el acceso a la tabla "usuarios" de PostgreSQL.
 */

/**
 * Busca un usuario por su nombre de usuario.
 * Se utiliza consulta parametrizada ($1) para prevenir inyección SQL.
 *
 * @param {string} usuario - Nombre de usuario a buscar.
 * @returns {Promise<Object|null>} El registro del usuario o null si no existe.
 */
export const buscarPorUsuario = async (usuario) => {
    const consulta = 'SELECT id, usuario, contrasenia FROM usuarios WHERE usuario = $1';
    const resultado = await pool.query(consulta, [usuario]);

    return resultado.rows[0] ?? null;
};
