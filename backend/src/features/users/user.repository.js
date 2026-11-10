
import { pool } from "../../config/db.js";

export const userRepository = {

    async create(userData) {

        const {
            userName,
            userEmail,
            confirmEmail,
            userPhone,
            userAddress,
            userDocumentTypes,
            userDocumentNumber,
            userPassword,
            userImage,
            isStaff,
            isActive,
            isSuperUser,
        } = userData;

        const query = `
            INSERT INTO users (
                user_name,
                user_email,
                confirm_email,
                user_phone,
                user_address,
                user_document_types,
                user_document_number,
                user_password,
                user_image,
                is_staff,
                is_active,
                is_superuser
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id;
        `;

        const values = [
            userName,
            userEmail,
            confirmEmail,
            userPhone,
            userAddress,
            userDocumentTypes,
            userDocumentNumber,
            userPassword,
            userImage,
            isStaff,
            isActive,
            isSuperUser,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    },

    async findAll() {

        const query = `
            SELECT *
            FROM users
            ORDER BY id ASC;
        `;

        const result = await pool.query(query);

        return result.rows;
    },

    async update(id, userData) {

        const {
            userName,
            userEmail,
            confirmEmail,
            userPhone,
            userAddress,
            userDocumentTypes,
            userDocumentNumber,
            userPassword,
            isStaff,
            isActive,
            isSuperUser,
        } = userData;

        const query = `
            UPDATE users
            SET
                user_name = $1,
                user_email = $2,
                confirm_email = $3,
                user_phone = $4,
                user_address = $5,
                user_document_types = $6,
                user_document_number = $7,
                user_password = COALESCE($8, user_password),
                is_staff = $9,
                is_active = $10,
                is_superuser = $11
            WHERE id = $12
            RETURNING
                id,
                user_name,
                user_email,
                confirm_email,
                user_phone,
                user_address,
                user_document_types,
                user_document_number,
                is_staff,
                is_active,
                is_superuser;
        `;

        const values = [
            userName,
            userEmail,
            confirmEmail,
            userPhone,
            userAddress,
            userDocumentTypes,
            userDocumentNumber,
            userPassword,
            isStaff,
            isActive,
            isSuperUser,
            id,
        ];

        const result = await pool.query(query, values);

        return result.rows[0];
    },

    async updateStatus(id, is_active) {

        const query = `
            UPDATE users
            SET is_active = $1
            WHERE id = $2
            RETURNING *;
        `;

        const values = [is_active, id];

        const result = await pool.query(query, values);

        return result.rows[0];
    },
};
