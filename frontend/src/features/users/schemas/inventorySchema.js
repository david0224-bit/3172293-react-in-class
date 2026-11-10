import { z } from "zod";
import { fileSchema } from "@/shared/schemas/fileSchema";

const inventoryFields = {
  productName: z
    .string()
    .min(2, "El nombre del producto debe tener mínimo 2 caracteres")
    .max(60, "El nombre del producto es demasiado largo"),

  productId: z
    .string()
    .min(1, "Debe seleccionar un producto"),

  productQuantity: z
    .string()
    .regex(/^[0-9]+$/, "La cantidad debe contener solo números")
    .refine((value) => Number(value) > 0, {
      message: "La cantidad debe ser mayor que cero",
    }),

  productSupplierNames: z
    .string()
    .min(1, "Debe seleccionar un proveedor"),

  productSupplierNit: z
    .string()
    .min(5, "El NIT debe tener mínimo 5 caracteres")
    .max(20, "El NIT es demasiado largo"),

  productDescription: z
    .string()
    .min(5, "La descripción debe tener mínimo 5 caracteres")
    .max(200, "La descripción es demasiado larga"),

  productPrice: z
    .string()
    .regex(/^[0-9]+$/, "El precio debe contener solo números")
    .refine((value) => Number(value) > 0, {
      message: "El precio debe ser mayor que cero",
    }),

  productEntryDate: z
    .string()
    .min(1, "Debe ingresar la fecha de entrada"),

  productImage: fileSchema.shape.files.optional(),

  isStaff: z.boolean(),

  isActive: z.boolean(),
};

// Esquema para crear inventario
export const inventorySchema = z.object(inventoryFields);

// Esquema para actualizar inventario
export const inventoryUpdateSchema = z.object(inventoryFields);