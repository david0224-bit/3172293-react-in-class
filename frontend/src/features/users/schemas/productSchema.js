import { z } from "zod";

const productFields = {
  productName: z
    .string()
    .min(3, "El nombre debe tener mínimo 3 caracteres")
    .max(100, "El nombre es demasiado largo"),

  productCategory: z
    .string()
    .min(1, "Debe seleccionar una categoría"),

  productPrice: z
    .string()
    .min(1, "Debe ingresar un precio")
    .refine((value) => Number(value) > 0, {
      message: "El precio debe ser mayor a 0",
    }),

  productDescription: z
    .string()
    .min(5, "La descripción debe tener mínimo 5 caracteres")
    .max(300, "La descripción es demasiado larga"),

  productId: z
    .string()
    .min(1, "Debe ingresar el código de la comida")
    .max(30, "El código es demasiado largo"),

  productSupplierNames: z
    .string()
    .min(1, "Debe seleccionar un proveedor"),

  productQuantity: z
    .string()
    .min(1, "Debe ingresar la cantidad en stock")
    .refine((value) => Number(value) >= 0, {
      message: "La cantidad no puede ser negativa",
    }),

  shippingDate: z
    .string()
    .min(1, "Debe ingresar la fecha de envío"),

  nuevo: z.boolean(),
  incluido: z.boolean(),
  agotable: z.boolean(),
  oferta: z.boolean(),
  envio: z.boolean(),
  activo: z.boolean(),
  destacado: z.boolean(),
  importado: z.boolean(),
  devoluciones: z.boolean(),
};

export const productSchema = z.object(productFields);

export const productUpdateSchema = z.object(productFields);