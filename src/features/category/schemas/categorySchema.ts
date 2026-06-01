import type { ApiResponseSuccess } from "@/types/apiTypes"
import { z } from "zod"

interface TransactionType {
  id: string
  name: string
}

// ini adalah interface yang akan me-representasikan format data dari response api
export interface Category {
  id: string
  name: string
  transaction_type: TransactionType
  description?: string
  created_at: string
  updated_at: string
}

interface PaginationLinks {
  first: boolean
  last?: string | null
  prev?: string | null
  next?: string | null
}

export interface CategoryApiResponse extends ApiResponseSuccess<Category[]> {
  links: PaginationLinks
}

// skema ini akan digunakan untuk validasi pada form
// pada React Form
export const categorySchema = z.object({
  name: z.string().min(1, { message: "Kolom wajib diisi" }),
  transaction_type_id: z.string().min(1, { message: "Kolom wajib diisi" }),
  description: z.string().optional(),
})

// mengubah zod schema menjadi typescript type untuk digunakan pada form
export type CreateCategoryPayload = z.infer<typeof categorySchema>
export type UpdateCategoryPayload = z.infer<typeof categorySchema>
