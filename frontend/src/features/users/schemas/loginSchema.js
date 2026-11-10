import { z } from "zod";

export const loginSchema = z.object({
  userEmail: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Debe ingresar un correo electrónico válido"),

  userPassword: z
    .string()
    .min(1, "La contraseña es obligatoria"),
});