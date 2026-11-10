import { z } from "zod";

export const permissionSchema = z
  .object({
    userGroup: z.string().optional(),
    individualUser: z.string().optional(),
    permissions: z.record(z.string(), z.boolean()),
  })
  .refine((data) => Boolean(data.userGroup) || Boolean(data.individualUser), {
    message: "Debe seleccionar un grupo o un usuario individual.",
    path: ["selectionError"],
  });