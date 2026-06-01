import type { ApiResponseSuccess } from "@/types/apiTypes"
import { axiosInstance } from "@/lib/axios"
import type {
  Category,
  CategoryApiResponse,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../schemas/categorySchema"

export const getCategories = async (
  url: string | null
): Promise<CategoryApiResponse> => {
  const response = await axiosInstance.get(
    url ? url : "/api/transaction-categories"
  )

  return response.data
}

export const createCategory = async (
  data: CreateCategoryPayload
): Promise<Category> => {
  const response = await axiosInstance.post<ApiResponseSuccess<Category>>(
    "/api/transaction-categories",
    data
  )
  return response.data.data
}

export const getCategory = async (id: string): Promise<Category> => {
  const response = await axiosInstance.get<ApiResponseSuccess<Category>>(
    "/api/transaction-categories/" + id
  )
  return response.data.data
}

export const updateCategory = async ({
  id,
  data,
}: {
  id: string
  data: UpdateCategoryPayload
}): Promise<Category> => {
  const response = await axiosInstance.put<ApiResponseSuccess<Category>>(
    `/api/transaction-categories/${id}`,
    data
  )
  return response.data.data
}

export const deleteCategory = async (id: string): Promise<void> => {
  const response = await axiosInstance.delete(
    `/api/transaction-categories/${id}`
  )

  return response.data.data
}
