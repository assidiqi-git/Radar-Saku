import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UpdateCategoryPayload } from "../schemas/categorySchema"
import { updateCategory } from "../api/categoryApi"
import { useCategoryStore } from "../store/categoryStore"
import { AxiosError } from "axios"

export const useUpdateCategory = () => {
  const closeEditModal = useCategoryStore((state) => state.closeDialogEdit)

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: { id: string; data: UpdateCategoryPayload }) =>
      updateCategory(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })

      closeEditModal()
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.error(
          "Gagal mengupdate data:",
          error.response?.data?.message || error.message
        )
      }
    },
  })
}
