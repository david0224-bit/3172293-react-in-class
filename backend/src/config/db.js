// Importamos el paquete 'pg' usando el sistema de módulos ES.
import pkg from "pg";

// Extraemos la clase Pool desde el paquete.
// Pool gestiona un conjunto de conexiones reutilizables a la BD.
const { Pool } = pkg;

// Importamos dotenv para poder leer variables de entorno desde el archivo .env.
import dotenv from "dotenv";

// Cargamos las variables definidas en el archivo .env.
dotenv.config();

// Creamos y exportamos una instancia única del Pool de PostgreSQL.
// Esta instancia se reutiliza en toda la aplicación.
export const pool = new Pool({
    // Host donde se encuentra PostgreSQL.
    host: process.env.DB_HOST,

    // Puerto de PostgreSQL.
    port: process.env.DB_PORT,

    // Usuario con permisos sobre la base de datos.
    user: process.env.DB_USER,

    // Contraseña del usuario.
    password: process.env.DB_PASSWORD,

    // Nombre de la base de datos a la que nos conectamos.
    database: process.env.DB_NAME,

    // Número máximo de conexiones activas en el pool.
    max: 10,

    // Tiempo máximo en milisegundos que una conexión puede estar inactiva.
    idleTimeoutMillis: 30000,
});

// Verificamos a qué base de datos y schema está conectado el backend.
pool.query("SELECT current_database(), current_schema()")
    .then((result) => {
        console.log("Base de datos:", result.rows[0].current_database);
        console.log("Schema:", result.rows[0].current_schema);
    })
    .catch((error) => {
        console.error("Error verificando la conexión:", error);
    });

// Verificamos las columnas que PostgreSQL encuentra actualmente
// dentro de la tabla users.
pool.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'users'
    ORDER BY ordinal_position
`)
    .then((result) => {
        console.log("Columnas de users:", result.rows);
    })
    .catch((error) => {
        console.error("Error consultando las columnas de users:", error);
    });

// Evento que se dispara cuando el pool establece una conexión.
pool.on("connect", () => {
    console.log("Conectado a PostgreSQL");
});

// Evento que se dispara cuando ocurre un error en el pool.
pool.on("error", (err) => {
    console.error("Error en la conexión con PostgreSQL", err);
});