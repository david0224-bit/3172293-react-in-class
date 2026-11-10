
import { z } from "zod";
import { fileSchema } from "@/shared/schemas/fileSchema";

const supplierPasswordSchema = z
  .string()
  .min(8, "La contraseña debe tener mínimo 8 caracteres")
  .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
  .regex(/[a-z]/, "Debe contener al menos una minúscula")
  .regex(/[0-9]/, "Debe contener al menos un número")
  .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial");

const supplierFields = {
  supplierName: z
    .string()
    .min(3, "El nombre de la empresa debe tener mínimo 3 caracteres")
    .max(60, "El nombre de la empresa es demasiado largo"),

  supplierEmail: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Debe ingresar un correo electrónico válido"),

  confirmSupplierEmail: z
    .string()
    .min(1, "Debe confirmar el correo electrónico")
    .email("Debe ingresar un correo electrónico válido"),

  supplierPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos"),

  supplierAddress: z
    .string()
    .min(5, "La dirección debe tener mínimo 5 caracteres")
    .max(100, "La dirección es demasiado larga"),

  supplierDocumentType: z
    .string()
    .min(1, "Debe seleccionar un tipo de documento"),

  supplierDocumentNumber: z
    .string()
    .min(5, "Número de documento inválido")
    .max(20, "Número de documento demasiado largo"),

  supplierPassword: supplierPasswordSchema,

  suppliedProducts: z
    .array(z.string())
    .min(1, "Debe seleccionar al menos un producto"),

  observations: z
    .string()
    .max(500, "Las observaciones son demasiado largas")
    .optional(),

  isActive: z.boolean(),

  supplierImage: fileSchema.shape.files.optional(),
};

export const supplierSchema = z
  .object(supplierFields)
  .refine(
    (data) => data.supplierEmail === data.confirmSupplierEmail,
    {
      message: "Los correos electrónicos no coinciden",
      path: ["confirmSupplierEmail"],
    }
  );

export const supplierUpdateSchema = z
  .object({
    ...supplierFields,
    supplierPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.supplierEmail !== data.confirmSupplierEmail) {
      ctx.addIssue({
        code: "custom",
        message: "Los correos electrónicos no coinciden",
        path: ["confirmSupplierEmail"],
      });
    }

    if (data.supplierPassword !== "") {
      const passwordResult = supplierPasswordSchema.safeParse(
        data.supplierPassword
      );

      if (!passwordResult.success) {
        passwordResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: "custom",
            message: issue.message,
            path: ["supplierPassword"],
          });
        });
      }
    }
  });
