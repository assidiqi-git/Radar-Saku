// hooks/usePosts.ts
import { useCallback } from "react"
import axios from "axios"
import { getCategoryTypes } from "../api/category-type"
import { useCategoryTypeStore } from "../store/category-type-store"

export const useGetCategoryType = () => {
  // Ambil state dan setter dari store Zustand
  const {
    categoryTypes,
    isLoading,
    error,
    setCategoryTypes,
    setIsLoading,
    setError,
  } = useCategoryTypeStore()

  // useCallback digunakan agar fungsi ini tidak dibuat ulang setiap kali komponen dirender
  const fetchCategoryTypes = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // 1. Panggil API layer
      const data = await getCategoryTypes()

      // 2. Simpan ke Store layer
      setCategoryTypes(data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message || "Gagal mengambil data dari server")
      } else {
        setError("Terjadi kesalahan yang tidak diketahui")
      }
    } finally {
      setIsLoading(false)
    }
  }, [setCategoryTypes, setIsLoading, setError])

  // Kembalikan data dan fungsi agar bisa digunakan oleh komponen UI
  return {
    categoryTypes,
    isLoading,
    error,
    fetchCategoryTypes,
  }
}
