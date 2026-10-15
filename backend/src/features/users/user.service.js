// backend/src/features/users/user.service.js
import { userRepository } from "./user.repository.js";
import bcrypt from "bcrypt"; 

export const userService = {
    async createUser(data) {
        // 1. Extraemos la contraseña cruda sin importar qué formato envíe el frontend
        const rawPassword = data.userPassword || data.user_password || data.password || data.contrasena;

        if (!rawPassword) {
            throw new Error("La contraseña es requerida para el registro");
        }

        // 2. Generamos el hash con bcrypt (10 rondas de salt)
        const hashedPassword = await bcrypt.hash(rawPassword, 10); 

        // 3. Mapeamos las propiedades asegurando camelCase para userRepository.js
        const userData = { 
            userName: data.userName || data.user_name || data.name,
            userEmail: data.userEmail || data.user_email || data.email,
            userPhone: data.userPhone || data.user_phone || data.phone,
            userDocumentTypes: data.userDocumentTypes || data.user_document_types || data.documentType,
            userDocumentNumber: data.userDocumentNumber || data.user_document_number || data.documentNumber,
            userPassword: hashedPassword, // <- AQUÍ enviamos la contraseña ENCRIPTADA con la clave que lee el repo
            userAvatarUrl: data.userAvatarUrl || data.user_avatar_url || data.avatarUrl || null,
            isStaff: data.isStaff ?? data.is_staff ?? false,
            isActive: data.isActive ?? data.is_active ?? true,
            isSuperuser: data.isSuperuser ?? data.is_superuser ?? false
        };

        console.log("DATOS MAPEADOS Y HASHEADOS ENVIADOS AL REPO:", userData);

        // 4. Delegamos al repositorio la inserción en la BD
        return await userRepository.create(userData);
    },
};