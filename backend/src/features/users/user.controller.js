//Este archivo implementa el controlado hhttp del feature users. orquestar la peticion delegar la logica de negocio y contruir una resputsta http

// importamos el servicio de usuarios.
// El  controller no implementa logica de negocio,
// solo delega la operación al service correspondiente.
import { userService } from "./user.service.js";

// Exportamos un objeto controlador
// agrupar handlers en un objeto permite escalabilidad 
//(create, update, delete, getById, etc.)
export const userController = {

    // Metodo encargado de manejar la creación de un usuario 
    // se asume que este método sera usado como handler de una ruta Express
    async create(req, res) {
        // log del cuerpo de la petición
        // Útil para validar que el frontend envia correctamente los datos
        // En producción suele remplazarse por logging estructurado o eliminarse
        console.log("BODY RECIBIDO:", req.body);
        try{
            // Llamamos al servidor de usuario, pasando los datos recibidos
            //Aqui ocurre la logica  real de negocio (validaciones, persistencia, etc..) 

            const user = await userService.createUser(req.body);
            // Respuesta HTTP en caso de exito
            // 201: recurso creado correctamente según el estandar REST
            res.status(201).json({
                // Menssaje informativo para el cliente
                message: "Usuario creado correctamente",

                // Retonamos únicamente el ID del usuario creado
                // Evita exponer información sensible innecesaria
                userID: user.id,
            })
        }catch (err){
            //Capturamos cualquier error lanzado por el servicio o  capas inferiores
            // se registra el error completo para depuración enn backend
            console.error("ERROR BACKEND:", err);

        // Respuesta HTTP de error generico
        // 500: error interno del  servidor
        res.status(500).json({
            // Se envia el mensaje del error  para diagnostico
            // En produccion suele mapearse a mensajes controlados
            error: err.message,
        });
      }
    }
}