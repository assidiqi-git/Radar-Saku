import { axiosInstance } from "@/lib/axios"

import { type CategoryType } from "../types"

const categoryTypes = [
  {
    id: "OIASNDIOUASN1",
    name: "Pemasukan",
    action: "addition",
    description: "Credit Card",
  },
  {
    id: "OIASNDIOUASN2",
    name: "Pengeluaran",
    action: "deduction",
    description: "PayPal",
  },
  {
    id: "OIASNDIOUASN3",
    name: "Transfer Antar Bank Sendiri",
    action: "neutral",
    description: "Bank Transfer",
  },
]

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return categoryTypes

  // Endpoint standar Laravel Sanctum untuk mengambil profil user yang login
  const response = await axiosInstance.get<{ data: CategoryType[] }>(
    "/api/transaction-types"
  )
  return response.data.data
}

export const getCategoryTypesById = async (
  id: string
): Promise<CategoryType> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return categoryTypes.find((categoryType) => categoryType.id === id)
}
