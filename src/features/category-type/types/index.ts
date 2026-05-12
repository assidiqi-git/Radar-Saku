import { z } from "zod"
import { actionEnum } from "../schemas/category-schema"

export type actionType = z.infer<typeof actionEnum>

export interface CategoryType {
  id: string
  name: string
  action: actionType
  description: string | null
}

export interface ApiResponse<T = any> {
  message?: string
  errors?: Record<string, string[]>
  data?: T
}
