import { useEffect } from "react"
import { useGetPosts } from "../hooks/use-get-post"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Post() {
  const { posts, isLoading, error, fetchPosts } = useGetPosts()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (isLoading) {
    return <div className="p-4 text-center">Memuat data secara modular...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {posts.map((post) => {
        return (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.body}</p>
            </CardContent>
            <CardFooter>
              <Link to={"/post/" + post.id}>
                <Button variant="outline" size="sm" className="w-full">
                  View
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
