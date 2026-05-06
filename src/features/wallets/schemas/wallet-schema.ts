import { z } from "zod"

export const walletSchema = z.object({
  name: z.string().min(1, { message: "Kolom ini wajib diisi" }),
  type: z.string().min(1, { message: "Kolom ini wajib diisi" }),
  balance: z.string().min(1, { error: "Kolom ini wajib diisi" }),
})

export type WalletValues = z.infer<typeof walletSchema>
