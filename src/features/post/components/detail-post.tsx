// components/PostDetail.tsx
import React, { useEffect } from "react"
import { useParams } from "react-router-dom" // Import useParams
import { usePostDetail } from "../hooks/use-post-detail"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PostDetail: React.FC = () => {
  // Ambil parameter 'id' dari URL (bentuknya selalu string dari URL)
  const { id } = useParams<{ id: string }>()
  const { currentPost, isDetailLoading, detailError, fetchPostDetail } =
    usePostDetail()

  useEffect(() => {
    // Pastikan ID ada dan ubah menjadi number sebelum memanggil API
    if (id) {
      fetchPostDetail(Number(id))
    }
  }, [id, fetchPostDetail])

  if (isDetailLoading)
    return <div className="p-4 text-center">Memuat detail post...</div>
  if (detailError)
    return <div className="p-4 text-red-500">Error: {detailError}</div>
  if (!currentPost) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentPost.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{currentPost.body}</p>
      </CardContent>
    </Card>
  )
}

export default PostDetail
