import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth-store"

export const PublicRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const location = useLocation()

  const from = location.state?.from || "/"
  // Jika sudah login, arahkan langsung ke dashboard/dompet
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return <Outlet />
}
