// hooks/usePosts.ts
import { useCallback } from "react"
import axios from "axios"
import { getCategoryTypes } from "../api/category-type"
import { usePostStore } from "../store/category-type-store"

export const useGetPosts = () => {
  // Ambil state dan setter dari store Zustand
  const { posts, isLoading, error, setPosts, setIsLoading, setError } =
    usePostStore()

  // useCallback digunakan agar fungsi ini tidak dibuat ulang setiap kali komponen dirender
  const fetchPosts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // 1. Panggil API layer
      const data = await getCategoryTypes()

      // 2. Simpan ke Store layer
      setPosts(data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || "Gagal mengambil data dari server")
      } else {
        setError("Terjadi kesalahan yang tidak diketahui")
      }
    } finally {
      setIsLoading(false)
    }
  }, [setPosts, setIsLoading, setError])

  // Kembalikan data dan fungsi agar bisa digunakan oleh komponen UI
  return {
    posts,
    isLoading,
    error,
    fetchPosts,
  }
}
