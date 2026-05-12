// src/hooks/useDeleteItem.ts
import { deleteCategoryType } from "../api/category-type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCategoryTypeStore } from "../store/category-type-store"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useDeleteCategoryType = () => {
  const queryClient = useQueryClient()
  const closeDeleteModal = useCategoryTypeStore(
    (state) => state.closeDialogDelete
  )

  return useMutation({
    mutationFn: (id: string) => deleteCategoryType(id),
    onSuccess: () => {
      // Refresh list categoryType setelah berhasil dihapus
      queryClient.invalidateQueries({ queryKey: ["categoryTypes"] })

      // Tutup modal secara otomatis
      closeDeleteModal()

      // Catatan: Anda bisa menambahkan trigger Toast notification di sini
      // toast.success("Kategori berhasil dihapus");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        // Cek status code
        const status = error.response?.status

        if (status === 409) {
          console.error("Gagal: Data sedang digunakan (Foreign Key Constraint)")
          toast.error(
            "Kategori ini tidak dapat dihapus karena masih digunakan oleh data lain."
          )
        } else if (status === 404) {
          console.error("Gagal: Data tidak ditemukan")
          toast.error("Kategori sudah tidak ada di sistem.")
        } else {
          // Tangkap pesan error dari backend jika ada (misal dari format response API Anda)
          const backendMessage = error.response?.data?.message
          console.error(`Gagal: ${backendMessage || "Server error"}`)
          toast.error(backendMessage || "Terjadi kesalahan pada server")
        }
      } else {
        // Error di luar Axios (misal network mati atau salah kode)
        console.error("Terjadi kesalahan sistem:", error)
      }
    },
  })
}
