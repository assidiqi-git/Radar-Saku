// hooks/usePosts.ts
import { getCategoryTypes } from "../api/category-type"
import { useQuery } from "@tanstack/react-query"

export const useGetCategoryType = () => {
  return useQuery({
    queryKey: ["categoryTypes"],
    queryFn: () => getCategoryTypes(),
  })
}
