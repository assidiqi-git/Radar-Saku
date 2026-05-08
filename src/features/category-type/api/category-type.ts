import { axiosInstance } from "@/lib/axios"

import { type CategoryType } from "../types"

const categoryTypes = [
  {
    id: "INV001",
    name: "Paid",
    action: "addition",
    description: "Credit Card",
  },
  {
    id: "INV002",
    name: "Pending",
    action: "deduction",
    description: "PayPal",
  },
  {
    id: "INV003",
    name: "Unpaid",
    action: "addition",
    description: "Bank Transfer",
  },
  {
    id: "INV004",
    name: "Paid",
    action: "deduction",
    description: "Credit Card",
  },
  {
    id: "INV005",
    name: "Paid",
    action: "addition",
    description: "PayPal",
  },
  {
    id: "INV006",
    name: "Pending",
    action: "deduction",
    description: "Bank Transfer",
  },
  {
    id: "INV007",
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
