// Importamos el paquete 'pg' usando el sistema de módulos ES.// Importamos el paqueteSQL para Node.js
import pkg from 'pg';

//Extraemos la clase Pool desde el paquete.
// Pool gestiona un conjunto de conexiones reutilizables a la BD. 
const { Pool } = pkg;

// Importamos dotenv para poder leer variables de entorno desde un archivo.env
import dotenv from "dotenv";

// Cargamos las variables definidas en el archivo .env
dotenv.config();

//Creamos y exportamos una instancia única del Pool de PostgreSQL
// Esta instancia se reutiliza en toda la aplicacion 
export const pool = new Pool ({
    // Host donde se encuentra PostgresSQL (ej: localhost oo IP del servidor)
    host: process.env.DB_HOST,

    // Puerto de PostgreSQL (por defecto es 5432)
    port: process.env.DB_PORT,

    // Usuario con permisos sobre la base de datos
    user: process.env.DB_USER, 

    // Contraseña del usuario
    password: process.env.DB_PASSWORD,

    // Nombre de la base de datos a la que nos conectamos
    database: process.env.DB_NAME,

    // Número máximo de cnexiones activa en el pool 
    max: 10,

    // Tiempo máximo (en ms) que una conexión puede estar inactiva antes de ser cerrada automáticamente
    idleTimeoutMillis: 30000,

});

// Evento que se dispara cada vez que el pool establece una conexión 
// Útil para logs y verificación en desarrollo
pool.on('connect', () => {
    console.log("Conectado a PostgreSQL");
}); //esto es para test, es algo de visualizacion y lo vamos a ver en console claro

// Evento que se dispara cuando ocurre un error en el pool
// Importante para monitoreo y diagnóstico de fallos
pool.on("error", (err) => {
    console.error("Error en la conexión con PostgreSQL", err);
});