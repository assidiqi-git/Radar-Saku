// hooks/usePostDetail.ts
import { useQuery } from "@tanstack/react-query"
import { getCategoryTypesById } from "../api/category-type"
import { useCategoryTypeStore } from "../store/category-type-store"

export const useCategoryTypeEdit = () => {
  const { isDialogEditOpen, editingId } = useCategoryTypeStore()

  return useQuery({
    queryKey: ["categoryTypeById", editingId],
    queryFn: () => getCategoryTypesById(editingId as string),
    enabled: isDialogEditOpen && !!editingId,
    staleTime: 0,
  })
}
