// backend/src/features/auth/auth.service.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authRepository } from "./auth.repository.js";

export const authService = {
    async login(data) {
        // Soporta 'email' o 'correo' / 'password' o 'contrasena' por si vienen con otro nombre del frontend
        const email = data.email || data.correo || data.user_email;
        const password = data.password || data.contrasena || data.user_password;

        if (!email || !password) {
            throw new Error("El correo y la contraseña son requeridos");
        }

        const user = await authRepository.findByEmail(email);
        console.log("USER ENCONTRADO:", user);

        if (!user) {
            throw new Error("Credenciales inválidas");
        }

        // AQUÍ ESTABA EL ERROR PRINCIPAL: Usar user.user_password en vez de user.password
        const isMatch = await bcrypt.compare(password, user.user_password);
        
        if (!isMatch) {
            throw new Error("Credenciales inválidas");
        }

        if (!user.is_active) {
            throw new Error("Usuario inactivo");
        }

        const token = jwt.sign(
            { id: user.id, email: user.user_email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || "1h" }
        );

        return {
            token,
            user: {
                id: user.id,
                email: user.user_email,
            },
        };
    },
};