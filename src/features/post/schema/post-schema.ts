import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(1, { error: "Kolom Wajib Diisi" }),
  body: z.string().min(1, { error: "Kolom Wajib Diisi" }),
})

export type PostValues = z.infer<typeof postSchema>
