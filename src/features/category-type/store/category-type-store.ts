// store/postStore.ts
import { create } from "zustand"
import { type CategoryType } from "../types"

interface PostState {
  // List Post
  posts: CategoryType[]
  isLoading: boolean
  error: string | null
  setPosts: (posts: CategoryType[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  setPosts: (posts) => set({ posts }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))
