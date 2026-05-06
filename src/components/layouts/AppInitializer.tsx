import { useAuth } from "@/features/auth/hooks/use-auth"
import { useAuthStore } from "@/store/auth-store"
import { Outlet } from "react-router-dom"

/**
 * Komponen ini membungkus seluruh aplikasi untuk memastikan
 * kita tahu status login pengguna SEBELUM merender rute apa pun.
 */
export const AppInitializer = () => {
  useAuth()

  const isInitialized = useAuthStore((state) => state.isInitialized)

  // Tampilkan layar loading layar penuh selama request /api/user berjalan
  if (isInitialized) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        {/* Anda bisa mengganti ini dengan animasi logo atau spinner shadcn */}
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 font-medium text-gray-500">Memuat aplikasi...</p>
        </div>
      </div>
    )
  }

  // Jika sudah selesai loading (baik sukses maupun gagal), render router
  return <Outlet />
}
