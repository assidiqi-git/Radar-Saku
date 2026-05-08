import { axiosInstance } from "@/lib/axios"

import { type CategoryType } from "../types"

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
  // Endpoint standar Laravel Sanctum untuk mengambil profil user yang login
  const response = await axiosInstance.get<{ data: CategoryType[] }>(
    "/api/transaction-types"
  )
  return response.data.data
}
