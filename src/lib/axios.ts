import axios from "axios"
import { useAuthStore } from "@/store/auth-store"

// Membaca Base URL dari file .env. Jika pakai Vite Proxy, biarkan kosong ("")
const baseURL = import.meta.env.VITE_API_BASE_URL || ""

export const axiosInstance = axios.create({
  baseURL,
  // 🚀 SANGAT KRUSIAL UNTUK SANCTUM:
  // Mengizinkan pengiriman cookie CORS lintas domain/port
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Client-Type": "web",
  },
})

/**
 * 🛡️ INTERCEPTOR RESPONSE
 * Menangkap dan memproses response sebelum sampai ke TanStack Query / Komponen
 */
axiosInstance.interceptors.response.use(
  // Jika request sukses (status 2xx), langsung kembalikan response
  (response) => response,

  // Jika request gagal
  (error) => {
    // 1. Deteksi Error Jaringan (Offline)
    // Berguna untuk arsitektur offline-first untuk menghindari aplikasi crash
    if (!error.response || error.code === "ERR_NETWORK") {
      console.warn("Aplikasi offline atau server tidak dapat dijangkau.")
      // Di sini Anda bisa memicu state Zustand (misal: setIsOffline(true))
      return Promise.reject(error)
    }

    // 2. Deteksi Sesi Kedaluwarsa (401) atau CSRF Mismatch (419)
    const status = error.response.status
    if (status === 401 || status === 419) {
      console.error("Sesi tidak valid atau telah berakhir.")

      // Bersihkan "brankas" user di Zustand
      useAuthStore.getState().clearAuth()

      // Secara opsional, jika Anda ingin langsung memaksa reload ke halaman login
      // window.location.href = '/login';
    }

    // 3. Deteksi Validasi Error (422) dari Laravel
    // Dibiarkan lolos agar bisa ditangkap oleh blok onError di hook useMutation

    return Promise.reject(error)
  }
)

/**
 * Fetch CSRF cookie dari Sanctum sebelum login/register.
 * Harus dipanggil sekali sebelum POST /login atau /register.
 */
export async function getCsrfCookie(): Promise<void> {
  await axiosInstance.get("/sanctum/csrf-cookie")
}
