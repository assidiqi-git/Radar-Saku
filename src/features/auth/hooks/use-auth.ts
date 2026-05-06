import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useAuthStore } from "@/store/auth-store"
import { getAuthUser } from "@/features/auth/api/get-auth-user"

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const query = useQuery({
    queryKey: ["auth-user"],
    queryFn: getAuthUser,
    // Penting: Jangan retry jika gagal (karena gagal berarti memang belum login/token expired)
    retry: false,
    // Mencegah request berulang-ulang saat pengguna berpindah tab browser
    refetchOnWindowFocus: false,
  })

  // Sinkronisasi data dari TanStack Query ke Zustand Store
  useEffect(() => {
    if (query.isSuccess && query.data) {
      // Jika berhasil memuat data user, simpan ke global state
      setUser(query.data)
    } else if (query.isError) {
      // Jika error (misal 401 Unauthorized), pastikan state bersih
      clearAuth()
    }
  }, [query.isSuccess, query.isError, query.data, setUser, clearAuth])

  return query
}
