// store/postStore.ts
import { create } from "zustand"
import { type Post } from "../types"

interface PostState {
  // List Post
  posts: Post[]
  isLoading: boolean
  error: string | null
  setPosts: (posts: Post[]) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // Detail Post
  currentPost: Post | null
  isDetailLoading: boolean
  detailError: string | null
  setCurrentPost: (post: Post | null) => void
  setIsDetailLoading: (isDetailLoading: boolean) => void
  setDetailError: (error: string | null) => void
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  setPosts: (posts) => set({ posts }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  currentPost: null,
  isDetailLoading: false,
  detailError: null,
  setCurrentPost: (currentPost) => set({ currentPost }),
  setIsDetailLoading: (isDetailLoading) => set({ isDetailLoading }),
  setDetailError: (detailError) => set({ detailError }),
}))
