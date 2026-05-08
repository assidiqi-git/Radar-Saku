// src/hooks/useDeleteItem.ts
import { useState } from "react"
import { deleteCategoryType } from "../api/category-type"

export const useDeleteCategoryType = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const deleteData = async (id: string) => {
    // Reset state sebelum request dimulai
    setIsLoading(true)
    setError(null)
    setIsSuccess(false)

    try {
      // Memanggil API layer
      const response = await deleteCategoryType(id)

      setIsSuccess(true)
      return response // Mengembalikan response jika komponen butuh data kembalian
    } catch (err: any) {
      const errorMessage =
        err.message || "Terjadi kesalahan yang tidak diketahui"
      setError(errorMessage)
      throw err // Lempar error agar bisa ditangkap oleh komponen UI (opsional)
    } finally {
      setIsLoading(false)
    }
  }

  return { deleteData, isLoading, error, isSuccess }
}
