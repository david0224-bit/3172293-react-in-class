// Importamos el pool de conexión a PostgreSQL.
// Este pool es una instancia compartida configurada en la capa de infaestrcutura.
import { pool } from "../../config/db.js";

// Exportamos el repositorio de usuarios
// El repositorio encapsula todas las consultas SQL relacionadas con users.
export const userRepository = {

    // Metodo encargado de crear un nuevo usuario en la base de datos
    // recibe un objeto con los datos ya validados y procesados por el service
    async create(userData) {

        // Desustructuramos explícitamente las propiedades esperadas
        // Esto hace el contrato de dstos claro y evita acceder a propiedades inexistentes
        const{
            userName,
            userEmail,
            userPhone,
            userDocumentTypes,
            userDocumentNumber,
            userPassword,
            userAvatarUrl,
            isStaff,
            isActive, 
            isSuperuser,
        } =  userData;

            // Usar placeholder ($1,$2,...)previene inyecciones sql
            // RETURNING permite obtener datos generado por la bases de datos (id)
        const query = `
            INSERT INTO  users (
                user_name,
                user_email,
                user_phone,
                user_document_types,
                user_document_number,
                user_password,
                user_avatar_url,
                is_staff,
                is_active,
                is_superuser
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING id;
        `;

        // Array de valores que se pasan al query
        // El orden debe coincidir con los placeholders en la consulta SQL
        const values = [
            userName,
            userEmail,
            userPhone,
            userDocumentTypes,
            userDocumentNumber,
            userPassword,
            userAvatarUrl,
            isStaff,
            isActive, 
            isSuperuser,
        ];

        // Ejecutamos la consulta usando el pool
        // pool.query retorna u objeto en metadata y filas resultantes
        const result = await pool.query(query, values);

        // devolvemos únicamente el primer registro retornado
        // En este caso contiene el id del usuario recien creado
        return result.rows[0];

    },
  }