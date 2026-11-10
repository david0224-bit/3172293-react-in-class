import bcrypt from "bcrypt";
// El service es la capa donde vive la logica del negocio

// Importamos el repositorio de usuarios.
// El service depende del repository para acceder a la persistencia.

// pero el repository NO debe conocer el service.
import { userRepository } from "./user.repository.js";

// Exportamos el servicio de usuarios.
// El service representa la capa de lógica de negocio de la palicación.
export const userService = {

    // Método encargado de crear un usuario
    // Recibe datos provinientes del controller,
    // idealmente ya validados a nivel estructural (DTO / Schema)
    async createUser(data) {

    const hashedPassword = await bcrypt.hash(data.userPassword, 10);

    const userData = {
        ...data,
        userPassword: hashedPassword,
    };

    console.log("SERVICE DATA:", userData);
        // En este punto, en una arquitectura real, deberián, ocurrir:
        // - Validaciones de reglas de negocio
        // - Transformaciones de datos (ej: hash de password)
        // - Verificaciones de unicidad (email, documento, etc.)
        // - Decisiones de negocio (roles, flags, estados iniciales)

        // Actualmente, el método solo delega directamente al repository,
        // sin agregar ninguna lógica adicional
        return await userRepository.create(userData);
    },    

        async getAllUsers() {
        const users = await userRepository.findAll();
        return users;
    },

    async updateUserStatus(id, is_active) { // Se declara la funcion que recibe dos parametros, id y el estado
        // Se llama a la bd para actualizar el estado
        const updated = await userRepository.updateStatus(id, is_active); // Le pasa los datos al repository
        return updated; // Aqui regresa con los datos y se guardan en updated para entregarselos al controller
    },


    async updateUser(id, data) {

        let hashedPassword = null;

        if (
            data.userPassword &&
            data.userPassword.trim() !== ""
        ) {
            hashedPassword = await bcrypt.hash(data.userPassword, 10);
        }

        const userData = {
            ...data,
            userPassword: hashedPassword,
        };

        return await userRepository.update(id, userData);
    },
};