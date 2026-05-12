import { axiosInstance } from "@/lib/axios"

import { type ApiResponse, type CategoryType } from "../types"
import type { CategoryTypeValues } from "../schemas/category-schema"

export const createCategoryType = async (
  data: CategoryTypeValues
): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>(
    "/api/transaction-types",
    data
  )
  return response.data
}

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
  const response = await axiosInstance.get("/api/transaction-types")
  return response.data.data
}

export const getCategoryTypesById = async (
  id: string
): Promise<CategoryType> => {
  const response = await axiosInstance.get(`/api/transaction-types/${id}`)

  return response.data.data
}

export const updateCategoryType = async ({
  id,
  data,
}: {
  id: string
  data: CategoryTypeValues
}): Promise<void> => {
  const response = await axiosInstance.put(`/api/transaction-types/${id}`, data)
  return response.data
}

export const deleteCategoryType = async (id: string): Promise<CategoryType> => {
  const response = await axiosInstance.delete(`/api/transaction-types/${id}`)

  return response.data.data
}
