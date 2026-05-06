// hooks/usePostDetail.ts
import { useCallback } from "react"
import axios from "axios"
import { usePostStore } from "../store/post-store"
import { getPostById } from "../api/post"

export const usePostDetail = () => {
  const {
    currentPost,
    isDetailLoading,
    detailError,
    setCurrentPost,
    setIsDetailLoading,
    setDetailError,
  } = usePostStore()

  const fetchPostDetail = useCallback(
    async (id: number) => {
      setIsDetailLoading(true)
      setDetailError(null)

      // Praktik UX yang baik: Kosongkan data sebelumnya agar tidak ada
      // "UI flashing" (menampilkan data lama sejenak) saat pindah halaman detail
      setCurrentPost(null)

      try {
        const data = await getPostById(id)
        setCurrentPost(data)
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
    [setCurrentPost, setIsDetailLoading, setDetailError]
  )

  return {
    currentPost,
    isDetailLoading,
    detailError,
    fetchPostDetail,
  }
}
