// frontend/src/features/access/services/permissionService.js

const API_URL = "http://localhost:4000/api/groups";
const PERMISSIONS_URL = "http://localhost:4000/api/permissions"

export async function getGroupPermissions(groupId) {
    const response = await fetch(`${API_URL}/${groupId}/permissions`);

    if (!response.ok) {
        throw new Error("Error obteniendo permisos")
    }

    return response.json();
}

// Catálogo completo de permisos del sistema
export async function getAllPermissions() {
    const response = await fetch(PERMISSIONS_URL);

    if (!response.ok) {
        throw new Error("Error obteniendo permisos");
    }

    return response.json();
}