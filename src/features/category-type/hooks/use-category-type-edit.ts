// hooks/usePostDetail.ts
import { useCallback } from "react"
import axios from "axios"
import { useCategoryTypeStore } from "../store/category-type-store"
import { getCategoryTypesById } from "../api/category-type"

export const useCategoryTypeEdit = () => {
  const {
    currentCategoryType,
    isDetailLoading,
    detailError,
    setCurrentCategoryType,
    setIsDetailLoading,
    setDetailError,
  } = useCategoryTypeStore()

  const fetchCategoryTypeDetail = useCallback(
    async (id: string) => {
      setIsDetailLoading(true)
      setDetailError(null)

      // Praktik UX yang baik: Kosongkan data sebelumnya agar tidak ada
      // "UI flashing" (menampilkan data lama sejenak) saat pindah halaman detail
      setCurrentCategoryType(null)

      try {
        const data = await getCategoryTypesById(id)
        setCurrentCategoryType(data)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Axios error handling, cek status 404
          if (err.response?.status === 404) {
            setDetailError("Post tidak ditemukan")
          } else {
            setDetailError(err.message || "Gagal mengambil detail post")
          }
        } else {
          setDetailError("Terjadi kesalahan yang tidak diketahui")
        }
      } finally {
        setIsDetailLoading(false)
      }
    },
    [setCurrentCategoryType, setIsDetailLoading, setDetailError]
  )

  return {
    currentCategoryType,
    isDetailLoading,
    detailError,
    fetchCategoryTypeDetail,
  }
}
