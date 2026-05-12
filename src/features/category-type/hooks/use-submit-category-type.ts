import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CategoryTypeValues } from "../schemas/category-schema"
import { createCategoryType } from "../api/category-type"
// import { useCategoryTypeStore } from "../store/category-type-store"

export const useSubmitCategoryType = () => {
  // const addCategoryType = useCategoryTypeStore((state) => state.addCategoryType)
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CategoryTypeValues) => createCategoryType(data),
    onSuccess: () => {
      // addCategoryType(response.data)
      queryClient.invalidateQueries({ queryKey: ["categoryTypes"] })
    },
    onError: (error) => {
      console.error("Login gagal:", error)
      // Handle notifikasi error di sini
    },
  })
}
