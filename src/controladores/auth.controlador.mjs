import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { buscarPorUsuario } from '../modelos/usuario.modelo.mjs';

/**
 * Controlador de autenticación (capa C del patrón MVC).
 * Maneja el inicio y cierre de sesión usando Token de acceso (JWT)
 * almacenado en una Cookie httpOnly.
 */

const COOKIE_NOMBRE = process.env.COOKIE_NOMBRE || 'token_acceso';

/**
 * Procesa el formulario de login.
 * 1. Busca el usuario en PostgreSQL.
 * 2. Compara la contraseña recibida con el hash almacenado (bcrypt).
 * 3. Si es válida, firma un JWT y lo envía como cookie httpOnly.
 */
export const iniciarSesion = async (req, res) => {
    try {
        const { usuario, contrasenia } = req.body;

        // Validación básica de entrada.
        if (!usuario || !contrasenia) {
            return res.redirect('/login?error=faltan');
        }

        const usuarioEncontrado = await buscarPorUsuario(usuario);

        // Redirección genérica para no revelar si el usuario existe o no.
        const credencialesInvalidas = () => res.redirect('/login?error=credenciales');

        if (!usuarioEncontrado) {
            return credencialesInvalidas();
        }

        // La contraseña en la BD ya viene encriptada (hash bcrypt):
        // se verifica comparando, nunca desencriptando.
        const esValida = await bcrypt.compare(contrasenia, usuarioEncontrado.contrasenia);

        if (!esValida) {
            return credencialesInvalidas();
        }

        // Firma del Token de acceso con datos mínimos del usuario.
        const token = jwt.sign(
            { id: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario },
            process.env.JWT_SECRETO,
            { expiresIn: process.env.JWT_EXPIRACION || '1h' },
        );

        // La cookie es httpOnly para que no sea accesible desde JavaScript
        // del navegador (mitiga ataques XSS).
        res.cookie(COOKIE_NOMBRE, token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hora
        });

        return res.redirect('/items');
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
        return res.redirect('/login?error=servidor');
    }
};

/**
 * Cierra la sesión eliminando la cookie desde el servidor
 * y redirige al login. Ruta: /cerrar-sesion
 */
export const cerrarSesion = (req, res) => {
    res.clearCookie(COOKIE_NOMBRE);
    return res.redirect('/login');
};
