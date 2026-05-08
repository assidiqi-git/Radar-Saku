import { createBrowserRouter, Navigate } from "react-router-dom"

// Layouts & Guards
import { ProtectedRoute } from "./protected-route"
import { PublicRoute } from "./public-route"
import { LoginForm } from "@/features/auth/components/login-form"
import AuthLayout from "@/components/layouts/AuthLayout"
import MainLayout from "@/components/layouts/MainLayout"
import { AppInitializer } from "@/components/layouts/AppInitializer"
import Post from "@/features/post/components/post"
import DetailPost from "@/features/post/components/detail-post"
import { CategoryTypes } from "@/features/category-type/components/category-type"

// Pages (Idealnya di-import secara lazy loading untuk performa)
// import { WalletList } from '@/features/wallets/components/WalletList';
// import { TransactionList } from '@/features/transactions/components/TransactionList';

export const router = createBrowserRouter([
  {
    element: <AppInitializer />,
    children: [
      {
        // RUTE PUBLIK (Auth)
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: "/login",
                element: <LoginForm />,
              },
              // Rute publik lainnya seperti /register, /forgot-password
            ],
          },
        ],
      },
      {
        // RUTE TERPROTEKSI (Area Aplikasi)
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: "/",
                element: <div>Ini Adalah Dashboard</div>, // Redirect default
              },
              {
                path: "/wallets",
                element: <div>Halaman Manajemen Dompet (WalletList)</div>,
              },
              {
                path: "/category",
                element: <div>Halaman Manajemen kategori </div>,
              },
              {
                path: "/category/types",
                element: <CategoryTypes />,
              },
              {
                path: "/transactions",
                element: <div>Halaman Transaksi (TransactionList)</div>,
              },
              {
                path: "/post",
                element: <Post />,
              },
              {
                path: "/post/:id",
                element: <DetailPost />,
              },
              // Rute terproteksi lainnya seperti /categories
            ],
          },
        ],
      },
      {
        // Rute Fallback untuk 404 Not Found
        path: "*",
        element: (
          <div className="p-8 text-center">404 - Halaman Tidak Ditemukan</div>
        ),
      },
    ],
  },
])
