// store/postStore.ts
import { create } from "zustand"
import { type CategoryType } from "../types"

interface CategoryTypeState {
  // List Category Types
  categoryTypes: CategoryType[]
  isLoading: boolean
  error: string | null
  setCategoryTypes: (categoryTypes: CategoryType[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  currentCategoryType: CategoryType | null
  isDetailLoading: boolean
  detailError: string | null
  setCurrentCategoryType: (categoryType: CategoryType | null) => void
  setIsDetailLoading: (isDetailLoading: boolean) => void
  setDetailError: (error: string | null) => void
}

export const useCategoryTypeStore = create<CategoryTypeState>((set) => ({
  categoryTypes: [],
  isLoading: false,
  error: null,
  setCategoryTypes: (categoryTypes) => set({ categoryTypes }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  currentCategoryType: null,
  isDetailLoading: false,
  detailError: null,
  setCurrentCategoryType: (currentCategoryType) => set({ currentCategoryType }),
  setIsDetailLoading: (isDetailLoading) => set({ isDetailLoading }),
  setDetailError: (detailError) => ({ detailError }),
}))
