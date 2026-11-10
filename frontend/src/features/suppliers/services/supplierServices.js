import { API_URL } from "@/features/config";

const SUPPLIERS_URL = `${API_URL}/suppliers`;

export async function createSupplier(supplierData) {
  const response = await fetch(SUPPLIERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplierData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear el proveedor");
  }

  return response.json();
}

export async function getAllSuppliers() {
  const token = sessionStorage.getItem("token");

  const response = await fetch(SUPPLIERS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al consultar los proveedores");
  }

  return response.json();
}

export async function updateSupplier(id, supplierData) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${SUPPLIERS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(supplierData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar el proveedor");
  }

  return data;
}

export async function updateSupplierStatus(id, is_active) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${SUPPLIERS_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_active }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al cambiar el estado del proveedor");
  }

  return data;
}