// Asumsikan Anda memiliki instance Axios dengan baseURL dan withCredentials: true
import { axiosInstance } from "@/lib/axios"
import { type LoginValues } from "../schemas/auth-schema"
import { type User } from "../types"

export const login = async (data: LoginValues): Promise<User> => {
  // 1. Inisialisasi CSRF Protection dari Laravel Sanctum
  await axiosInstance.get("/sanctum/csrf-cookie")

  // 2. Kirim kredensial ke endpoint login
  await axiosInstance.post("/api/login", data)

  // 3. Setelah sukses, ambil data profil user
  const response = await axiosInstance.get<{ data: User }>("/api/user")

  return response.data
}
