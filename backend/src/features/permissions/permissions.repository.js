// backend/src/features/permissions/permissions.repository.js
// Corrección: incluir información del módulo

import { pool } from "../../config/db.js"

export const permissionsRepository = {
    async getAll() {
        const query = `
            SELECT
              permission_id,
              permission_name,
              permission_codename,
              ct.content_type_id,
              ct.app_label,
              ct.model,
              ct.display_name
            FROM permissions p
            INNER JOIN content_type ct
              ON ct.content_type_id = p.content_type_id
            ORDER BY
              ct.display_name,
              p.permission_name
        `;

        const result = await pool.query(query);
        return result.rows;
    }
}