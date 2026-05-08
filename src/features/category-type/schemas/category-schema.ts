import { z } from "zod"

export const categoryTypeSchema = z.object({
  name: z.string().min(1, { error: "Kolom Wajib Diisi" }),
  action: z.enum(["addition", "deduction", "neutral"]),
  description: z.string().optional(),
})

export type CategoryTypeValues = z.infer<typeof categoryTypeSchema>
