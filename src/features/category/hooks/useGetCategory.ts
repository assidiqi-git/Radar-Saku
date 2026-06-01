import { getCategory } from "../api/categoryApi"

import { useQuery } from "@tanstack/react-query"
import type { Category } from "../schemas/categorySchema"
import type { AxiosError } from "axios"
import type { ApiResponseError } from "@/types/apiTypes"
import { useCategoryStore } from "../store/categoryStore"

export const useGetCategory = () => {
  const { isDialogEditOpen, selectedId } = useCategoryStore()
  return useQuery<
    Category, // format data jika berhasil
    AxiosError<ApiResponseError> //format response error
  >({
    queryKey: ["categoryById", selectedId],
    queryFn: () => getCategory(selectedId as string),
    enabled: isDialogEditOpen && !!selectedId,
    staleTime: 0,
  })
}
