import { axiosInstance } from "@/lib/axios"

import { type User } from "../types"

export const getAuthUser = async (): Promise<User> => {
  // Endpoint standar Laravel Sanctum untuk mengambil profil user yang login
  const response = await axiosInstance.get<{ data: User }>("/api/user")
  return response.data
}
