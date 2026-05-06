import { useMutation } from "@tanstack/react-query"
import { login } from "../api/login"
import { type LoginValues } from "../schemas/auth-schema"
import { useAuthStore } from "@/store/auth-store"
import { useLocation, useNavigate } from "react-router-dom" // Atau router yang Anda gunakan

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || "/"
  return useMutation({
    mutationFn: (data: LoginValues) => login(data),
    onSuccess: (user) => {
      // 1. Simpan data user ke global state
      setUser(user)

      // 2. Arahkan pengguna ke halaman dashboard atau wallet
      navigate(from, { replace: true })
    },
    onError: (error) => {
      console.error("Login gagal:", error)
      // Handle notifikasi error di sini
    },
  })
}
