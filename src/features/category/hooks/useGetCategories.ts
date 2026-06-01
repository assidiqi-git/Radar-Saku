import { getCategories } from "../api/categoryApi"

import { keepPreviousData, useQuery } from "@tanstack/react-query"
import type { CategoryApiResponse } from "../schemas/categorySchema"
import type { AxiosError } from "axios"
import type { ApiResponseError } from "@/types/apiTypes"
import { useState } from "react"

export const useGetCategories = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("")

  const queryInfo = useQuery<
    CategoryApiResponse, // format data jika berhasil
    AxiosError<ApiResponseError> //format response error
  >({
    queryKey: ["categories", currentUrl],
    queryFn: () => getCategories(currentUrl),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  })

  return {
    ...queryInfo,
    currentUrl,
    setCurrentUrl,
  }
}
