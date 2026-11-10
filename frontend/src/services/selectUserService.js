import { API_URL } from "@/features/config";

const USERS_URL = `${API_URL}/users`;

export const getOrderUsers = async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(USERS_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al obtener los meseros");
  }

  return data.map((user) => ({
    value: user.id,
    label: user.user_name,
  }));
};