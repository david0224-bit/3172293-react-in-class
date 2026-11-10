import { API_URL } from "@/features/config";

const PRODUCTS_URL = `${API_URL}/products`;

export async function createProduct(productData) {
  const response = await fetch(PRODUCTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear el producto");
  }

  return response.json();
}

export async function getAllProducts() {
  const token = sessionStorage.getItem("token");

  const response = await fetch(PRODUCTS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener los productos");
  }

  return data;
}

export async function updateProduct(id, productData) {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${PRODUCTS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar el producto");
  }

  return data;
}