// services/postApi.ts
import axios from "axios"
import { type Post } from "../types"

// Opsional: Anda bisa membuat instance axios khusus jika punya base URL
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
})

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>("/posts")
  return response.data // Hanya mengembalikan datanya saja
}

export const getPostById = async (id: number): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`)
  return response.data
}
