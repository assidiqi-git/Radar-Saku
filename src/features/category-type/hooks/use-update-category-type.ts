import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CategoryTypeValues } from "../schemas/category-schema"
import { updateCategoryType } from "../api/category-type"
import { useCategoryTypeStore } from "../store/category-type-store"
import { AxiosError } from "axios"

export const useUpdateCategoryType = () => {
  const closeEditModal = useCategoryTypeStore((state) => state.closeDialogEdit)

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: { id: string; data: CategoryTypeValues }) =>
      updateCategoryType(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryTypes"] })

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
