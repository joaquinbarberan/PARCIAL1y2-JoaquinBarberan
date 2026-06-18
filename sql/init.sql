-- ============================================================
--  Script de inicialización de la base de datos PostgreSQL
--  Parcial 2 - Aplicaciones Web 2 - Joaquín Barberán
-- ============================================================
--  Crea la tabla de usuarios utilizada para autenticar el login.
--  La contraseña se almacena YA ENCRIPTADA (hash bcrypt), nunca
--  en texto plano. En el login se compara el hash con el paquete
--  de hashing (bcryptjs).
--
--  Credenciales de prueba:
--    usuario:    admin
--    contraseña: admin123   (en la columna se guarda su hash)
-- ============================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id          SERIAL PRIMARY KEY,
    usuario     VARCHAR(50)  NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,           -- hash bcrypt
    creado_en   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Inserta el usuario admin. La contraseña 'admin123' se guarda
-- como hash bcrypt. ON CONFLICT evita duplicados si se re-ejecuta.
INSERT INTO usuarios (usuario, contrasenia)
VALUES ('admin', '$2b$10$S.wKaEZitFJNlG5DKHhU1OUGNSHUhIMDQSkFStjwpYkVqFaYtEhAi')
ON CONFLICT (usuario) DO NOTHING;
