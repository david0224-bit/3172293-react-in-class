
import { API_URL } from "@/features/config";

const USERS_URL = `${API_URL}/users`;

// Crear un usuario
export async function createUser(userData) {
    const token = sessionStorage.getItem("token");

    const response = await fetch(USERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al crear el usuario");
    }

    return response.json();
}

// Consultar todos los usuarios
export async function getAllUsers() {
    const token = sessionStorage.getItem("token");

    const response = await fetch(USERS_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al consultar los usuarios");
    }

    return response.json();
}

// Actualizar los datos de un usuario
export async function updateUser(id, userData) {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`${USERS_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Detalle del error del backend:", data);
        throw new Error(data.error || "Error al actualizar el usuario");
    }

    return data;
}

// Actualizar únicamente el estado del usuario
export async function updateStatusSwitch(id, is_active) {
    const token = sessionStorage.getItem("token");

    const response = await fetch(`${USERS_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ is_active }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Detalle del error del backend:", data);
        throw new Error(data.error || "Error al cambiar el estado");
    }

    return data;
}
