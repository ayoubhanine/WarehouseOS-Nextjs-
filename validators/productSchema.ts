import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),

  sku: z.string().min(3),

  description: z.string().min(5),

  category: z.string(),

  price: z.number().positive(),

  quantity: z.number().int().min(0),
});