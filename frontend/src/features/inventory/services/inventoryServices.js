
import { API_URL } from "@/features/config";

const INVENTORY_URL = `${API_URL}/inventory`;

export async function createInventory(inventoryData) {
  const response = await fetch(INVENTORY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventoryData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error || "Error al registrar el producto en el inventario"
    );
  }

  return response.json();
}

export async function getAllInventory() {
  const token = sessionStorage.getItem("token");

  const response = await fetch(INVENTORY_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener el inventario");
  }

  return data;
}

export async function updateInventory(id, inventoryData) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${INVENTORY_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inventoryData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar el inventario");
  }

  return data;
}
