// Asumsikan Anda memiliki instance Axios dengan baseURL dan withCredentials: true
import { axiosInstance } from "@/lib/axios"
import type { WalletValues } from "../schemas/wallet-schema"
import type { Wallet } from "../types"

export const createWallet = async (data: WalletValues): Promise<Wallet> => {
  // 2. Kirim kredensial ke endpoint login
  await axiosInstance.post("/api/wallets", data)

  // 3. Setelah sukses, ambil data profil user
  const response = await axiosInstance.get<{ data: Wallet }>("/api/user")

  return response.data
}
