// src/hooks/useDeleteItem.ts
import { deleteCategory } from "../api/categoryApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCategoryStore } from "../store/categoryStore"
import { AxiosError } from "axios"
import { toast } from "sonner"
import type { ApiResponseError } from "@/types/apiTypes"

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const closeDeleteModal = useCategoryStore((state) => state.closeDialogDelete)

  return useMutation<void, AxiosError<ApiResponseError>, string>({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      // Refresh list categoryType setelah berhasil dihapus
      queryClient.invalidateQueries({ queryKey: ["categories"] })

      // Tutup modal secara otomatis
      closeDeleteModal()

      // Catatan: Anda bisa menambahkan trigger Toast notification di sini
      //   toast.success("Kategori berhasil dihapus")
    },
    onError: (error) => {
      const statusError = error.response?.status

      if (statusError === 409) {
        console.error("Gagal: Data sedang digunakan (Foreign Key Constraint)")
        toast.error(
          "Kategori ini tidak dapat dihapus karena masih digunakan oleh data lain."
        )
      } else if (statusError === 404) {
        console.error("Gagal: Data tidak ditemukan")
        toast.error("Kategori sudah tidak ada di sistem.")
      } else {
        // Tangkap pesan error dari backend jika ada (misal dari format response API Anda)
        const backendMessage = error.response?.data?.message
        console.error(`Gagal: ${backendMessage || "Server error"}`)
        toast.error(backendMessage || "Terjadi kesalahan pada server")
      }

      const validationErrors = error.response?.data?.errors

      if (validationErrors) {
        console.error("Detail error form:", validationErrors)
      }
    },
  })
}
