import { axiosInstance } from "@/lib/axios"

import { type CategoryType } from "../types"

const categoryTypes = [
  {
    id: "OIASNDIOUASN1",
    name: "Paid",
    action: "addition",
    description: "Credit Card",
  },
  {
    id: "OIASNDIOUASN2",
    name: "Pending",
    action: "deduction",
    description: "PayPal",
  },
  {
    id: "OIASNDIOUASN3",
    name: "Unpaid",
    action: "addition",
    description: "Bank Transfer",
  },
  {
    id: "OIASNDIOUASN4",
    name: "Paid",
    action: "deduction",
    description: "Credit Card",
  },
  {
    id: "OIASNDIOUASN5",
    name: "Paid",
    action: "addition",
    description: "PayPal",
  },
  {
    id: "OIASNDIOUASN6",
    name: "Pending",
    action: "deduction",
    description: "Bank Transfer",
  },
  {
    id: "OIASNDIOUASN7",
    name: "Unpaid",
    action: "addition",
    description: "Credit Card",
  },
]

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
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
