
import { API_URL } from "@/features/config";

const ORDERS_URL = `${API_URL}/orders`;

export async function createOrder(orderData) {
  const response = await fetch(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al crear la orden");
  }

  return data;
}

export async function getAllOrders() {
  const token = sessionStorage.getItem("token");

  const response = await fetch(ORDERS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al consultar las órdenes");
  }

  return data;
}

export async function updateOrder(id, orderData) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${ORDERS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar la orden");
  }

  return data;
}
