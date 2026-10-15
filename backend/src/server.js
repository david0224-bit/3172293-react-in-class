// importamos la instancia de la aplicación Express ya configurada.
// app.js debe encargarse de middlewares, rutas y configuracion general.
import app from "./app.js";

// Importamos dotenv para cargar variables de entorno desde el archivo .env
import dotenv from "dotenv";

// Ejecutamos la carga de variables de entornos
// Esto debe hacerse antes de usar rocess.env
dotenv.config();

// Definimos el puerto del servidor
// Se prioriza el valor definido en el entorno (producción)
// y se usa 400 como valor por defecto en desarrollo
const PORT = process.env.PORT || 4000;

// Inciciamos el servidor HTTP usando la app de EXpress
// listen levanta el servidor y queda a la espera de peticiones
app.listen(PORT, () => {
    // Log informativo indicando que el servidor está corriendo
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

