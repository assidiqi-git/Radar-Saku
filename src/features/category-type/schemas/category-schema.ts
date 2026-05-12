import { z } from "zod"

export const actionEnum = z.enum(["addition", "deduction", "neutral"])

export const categoryTypeSchema = z.object({
  name: z.string().min(1, { message: "Kolom Wajib Diisi" }),
  action: actionEnum,
  description: z.string().optional(),
})

export type CategoryTypeValues = z.infer<typeof categoryTypeSchema>
