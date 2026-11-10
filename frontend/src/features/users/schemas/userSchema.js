
import { z } from "zod";
import { fileSchema } from "@/shared/schemas/fileSchema";

const passwordSchema = z
  .string()
  .min(8, "Contraseña debe tener mínimo 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una minúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial");

const userFields = {
  userName: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .max(60, "El nombre es demasiado largo"),

  userEmail: z
    .string()
    .email("Debe ingresar un email válido"),

  confirmEmail: z
    .string()
    .email("Debe ingresar un email válido"),

  userPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos"),

  userAddress: z
    .string()
    .min(5, "La dirección debe tener mínimo 5 caracteres")
    .max(100, "La dirección es demasiado larga"),

  userDocumentTypes: z
    .string()
    .min(1, "Debe seleccionar un tipo de documento"),

  userDocumentNumber: z
    .string()
    .min(5, "Número de documento inválido")
    .max(20, "Número de documento demasiado largo"),

  userPassword: passwordSchema,

  isStaff: z.boolean(),
  isActive: z.boolean(),
  isSuperUser: z.boolean(),

  userImage: fileSchema.shape.files.optional(),
};

export const userSchema = z
  .object(userFields)
  .refine(
    (data) => data.userEmail === data.confirmEmail,
    {
      message: "Los correos electrónicos no coinciden",
      path: ["confirmEmail"],
    }
  );

export const userUpdateSchema = z
  .object({
    ...userFields,
    userPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.userEmail !== data.confirmEmail) {
      ctx.addIssue({
        code: "custom",
        message: "Los correos electrónicos no coinciden",
        path: ["confirmEmail"],
      });
    }

    if (data.userPassword !== "") {
      const passwordResult = passwordSchema.safeParse(data.userPassword);

      if (!passwordResult.success) {
        passwordResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: ["userPassword"],
          });
        });
      }
    }
  });
