import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PUERTO),
    user: process.env.DB_USUARIO,
    password: process.env.DB_CONTRASENIA,
    database: process.env.DB_NOMBRE,
});