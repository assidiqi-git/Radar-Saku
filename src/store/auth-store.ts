import { create } from "zustand"
import { type User } from "@/features/auth/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean
  setUser: (user: User | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  // Dipanggil saat login sukses atau saat inisialisasi aplikasi (refresh)
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setIsInitialized: () => set({ isInitialized: true }),
  // Dipanggil saat logout
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}))
