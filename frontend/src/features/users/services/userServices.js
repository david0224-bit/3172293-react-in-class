// URL base del endpoint de usuarios en el backend
// En desarrollo apunta al servidor Express local
// En produccion deberia provenir de variables de entorno
// const API_URL = "http://localhost:4000/api/users";

//Funcion para crear un usuario en el backend 
import { API_URL } from "@/features/config";

const USERS_URL = `${API_URL}/users`;

export async function createUser(userData) {
    // Obtenemos el token desde el sessionStorage tal como indica el documento
    const token = sessionStorage.getItem("token");

    const response = await fetch(USERS_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        // Mantenemos el cuerpo con los datos que recibe la función
        body: userData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Error al crear usuario");
    }

    return response.json();
}