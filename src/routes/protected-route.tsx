import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()
  // Jika belum login, tendang kembali ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // Jika sudah login, izinkan akses ke komponen anak (MainLayout)
  return <Outlet />
}
