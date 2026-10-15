// Importamos Router desde Express.
// Router permite modularizar las rutas por feature
// y mantener el archivo principal  de la app limpio.
import { Router } from "express";

// Importamos el controlador de usuarios
// El router nunca implementa logica 
import { userController } from "./user.controller.js";

// Creamos una instancia de Router de express
const router = Router();

// Definimos la ruta para crear un usuario
// POST /users
// cuando se recibe una petición POST en la raiz del recurso,
// Express ejecuta eñ método create del controller.
router.post("/", userController.create);

// Exportamos el router para que pueda ser registrado en la app principal
// (ej: app.use("/users", userRouter))
export default router;