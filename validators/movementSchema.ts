import { z } from "zod";

export const movementSchema = z.object({
  product: z.string(),

  type: z.enum(["IN", "OUT"]),

  quantity: z.number().int().positive(),

  note: z.string().optional(),
});