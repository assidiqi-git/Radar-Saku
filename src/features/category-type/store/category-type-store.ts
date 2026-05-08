// store/postStore.ts
import { create } from "zustand"
import { type CategoryType } from "../types"

interface CategoryTypeState {
  // List Post
  categoryTypes: CategoryType[]
  isLoading: boolean
  error: string | null
  setCategoryTypes: (posts: CategoryType[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useCategoryTypeStore = create<CategoryTypeState>((set) => ({
  categoryTypes: [],
  isLoading: false,
  error: null,
  setCategoryTypes: (categoryTypes) => set({ categoryTypes }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
