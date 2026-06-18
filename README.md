# Parcial 2 - Aplicaciones Web 2 - Joaquín Barberán

API REST de alumnos con **interfaz web** (HTML servido desde el mismo backend) y
una **capa de seguridad** basada en Cookies + Token de acceso (JWT), verificando
credenciales contra **PostgreSQL** con hashing (bcrypt). Organizada con el
patrón **MVC** y modularizada.

## Estructura del proyecto (MVC)

```
src/
├── app.mjs                       # Punto de entrada: configura Express, EJS, middlewares y rutas
├── config/
│   └── db.mjs                    # Pool de conexión a PostgreSQL (lee del .env)
├── modelos/                      # (M) Acceso a datos
│   ├── alumno.modelo.mjs         #     Lee los alumnos desde el JSON
│   └── usuario.modelo.mjs        #     Consulta usuarios en PostgreSQL
├── controladores/                # (C) Lógica de cada petición
│   ├── alumnos.controlador.mjs   #     Endpoints de la API
│   ├── auth.controlador.mjs      #     Login y cierre de sesión
│   └── vistas.controlador.mjs    #     Envío de las páginas HTML (res.sendFile)
├── routers/                      # Definición de rutas
│   ├── alumnos.router.mjs        #     API REST (protegida)
│   ├── auth.router.mjs           #     /login y /cerrar-sesion
│   └── vistas.router.mjs         #     Páginas web (protegidas salvo login)
├── middlewares/
│   ├── middleware.mjs            #     Logger propio
│   └── auth.middleware.mjs       #     Verifica el Token de acceso (cookie)
├── paginas/                      # (V) Páginas HTML
│   └── login.html · items.html · item.html · procedimiento.html
├── publico/css/estilos.css       # Estilos
└── datos/alumnos.json            # Datos de los alumnos
sql/init.sql                      # Tabla 'usuarios' + INSERT del admin
```

## Requisitos

- Node.js 18+
- PostgreSQL en ejecución

## Configuración

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Crear el archivo `.env`** (a partir de `.env.example`) con los datos de tu
   PostgreSQL y la clave secreta del JWT.

3. **Crear la base de datos y cargar el script SQL:**
   ```bash
   # Crear la base (una sola vez)
   psql -U postgres -c "CREATE DATABASE parcial2;"
   # Cargar tabla de usuarios + usuario admin
   psql -U postgres -d parcial2 -f sql/init.sql
   ```

4. **Iniciar el servidor:**
   ```bash
   npm run dev     # con recarga automática
   # o
   npm start
   ```

   La aplicación queda disponible en `http://localhost:3000`.

## Credenciales de acceso

| Usuario | Contraseña |
|---------|------------|
| `admin` | `admin123` |

La contraseña se almacena en la base **ya encriptada** (hash bcrypt). En el login
se verifica comparando el hash, nunca desencriptando.

## Páginas

| Ruta             | Descripción                                                        |
|------------------|--------------------------------------------------------------------|
| `/login`         | Formulario de inicio de sesión (única página pública).             |
| `/items`         | Lista de alumnos; cada uno enlaza al detalle con `?id=`.           |
| `/item?id=N`     | Detalle de un alumno (endpoint `/alumnos/:id`).                    |
| `/procedimiento` | Botón para ejecutar el procedimiento de estadísticas.             |
| `/cerrar-sesion` | Elimina la cookie desde el servidor y vuelve al login.            |

## API (endpoints protegidos)

Todos requieren sesión activa (Token de acceso en la cookie); sin ella responden `401`.

| Método | Endpoint                  | Descripción                          |
|--------|---------------------------|--------------------------------------|
| GET    | `/alumnos`                | Lista de alumnos (consulta REST).    |
| GET    | `/alumnos/:id`            | Un alumno por id (consulta REST).    |
| GET    | `/alumnos/estadisticas`   | Procedimiento: total de alumnos.     |

## Seguridad

- **Login:** valida credenciales contra PostgreSQL y compara la contraseña con
  bcrypt. Si es correcta, firma un **JWT** y lo guarda en una **cookie httpOnly**.
- **Bloqueo:** sin credenciales válidas se bloquean tanto los endpoints de la API
  (respuesta `401`) como el acceso a las páginas (redirección al login), salvo la
  página de login.
- **Configuración sensible** (conexión a la BD, secreto JWT, nombre de la cookie)
  vive en el archivo `.env`, fuera del control de versiones.
