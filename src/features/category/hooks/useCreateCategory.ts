import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Category, CreateCategoryPayload } from "../schemas/categorySchema"
import { createCategory } from "../api/categoryApi"
import type { AxiosError } from "axios"
import type { ApiResponseError } from "@/types/apiTypes"

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  return useMutation<
    Category,
    AxiosError<ApiResponseError>,
    CreateCategoryPayload
  >({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: (error) => {
      const backendMessage = error.response?.data?.message
      const validationErrors = error.response?.data?.errors

      console.error("Pesan dari backend:", backendMessage)

      if (validationErrors) {
        console.error("Detail error form:", validationErrors)
      }
    },
  })
}
