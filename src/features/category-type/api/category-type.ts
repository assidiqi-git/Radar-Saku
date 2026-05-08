import { axiosInstance } from "@/lib/axios"

import { type CategoryType } from "../types"

const categoryTypes = [
  {
    id: "OIASNDIOUASN1",
    name: "Pemasukan",
    action: "addition",
    description: "Credit Card",
  },
  {
    id: "OIASNDIOUASN2",
    name: "Pengeluaran",
    action: "deduction",
    description: "PayPal",
  },
  {
    id: "OIASNDIOUASN3",
    name: "Transfer Antar Bank Sendiri",
    action: "neutral",
    description: "Bank Transfer",
  },
]

export const getCategoryTypes = async (): Promise<CategoryType[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return categoryTypes

  // Endpoint standar Laravel Sanctum untuk mengambil profil user yang login
  const response = await axiosInstance.get<{ data: CategoryType[] }>(
    "/api/transaction-types"
  )
  return response.data.data
}

export const getCategoryTypesById = async (
  id: string
): Promise<CategoryType> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // return

  return new Promise((resolve, reject) => {
    // Simulasi delay jaringan selama 1.5 detik
    setTimeout(() => {
      // Nanti ganti dengan:
      // const response = await axios.delete(`/api/items/${id}`);
      // return response.data;

      console.log(`[API LAYER] Request delete dikirim untuk ID: ${id}`)

      // Simulasi response sukses
      resolve(categoryTypes.find((categoryType) => categoryType.id === id))

      // Jika ingin mengetes error, uncomment baris di bawah ini dan comment resolve di atas:
      // reject(new Error('Gagal terhubung ke server saat menghapus data.'));
    }, 1500)
  })
}

export const deleteCategoryType = async (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Simulasi delay jaringan selama 1.5 detik
    setTimeout(() => {
      // Nanti ganti dengan:
      // const response = await axios.delete(`/api/items/${id}`);
      // return response.data;

      // Simulasi response sukses
      resolve({
        success: true,
        message: `Data dengan ID ${id} berhasil dihapus.`,
      })

      // Jika ingin mengetes error, uncomment baris di bawah ini dan comment resolve di atas:
      // reject(new Error('Gagal terhubung ke server saat menghapus data.'));
    }, 500)
  })
}
