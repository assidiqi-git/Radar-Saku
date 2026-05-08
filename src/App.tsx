import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { router } from "./routes"
import { Toaster } from "./components/ui/sonner"

const queryClient = new QueryClient()
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            // Class khusus untuk variant success
            success: "!bg-green-500 !text-white !border-green-600",

            // Class khusus untuk variant error
            error: "!bg-red-500 !text-white !border-red-600",

            // Class khusus untuk variant warning
            warning: "!bg-yellow-500 !text-black !border-yellow-600",

            // Class khusus untuk variant info
            info: "!bg-blue-500 !text-white !border-blue-600",

            // Class default/general untuk toast biasa (toast('Pesan'))
            toast: "!bg-gray-100 !text-gray-800",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
