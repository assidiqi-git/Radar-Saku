/**
 * Deklarasi global interface untuk api response sukses dan error
 */

/**
 * Menggunakan "Generic Type <T>" pada interface Success
 * Agar type dari "key: data" bisa digunakan oleh semua fitur
 */
export interface ApiResponseSuccess<T> {
  success: boolean
  message: string
  data: T
}

export interface ApiResponseError {
  success: boolean
  message: string
  // Biasanya error dari backend berupa object tak terduga, atau detail validasi.
  // 'unknown' atau 'Record<string, any>' adalah pilihan yang aman,
  errors: Record<string, string[]> | string | null
}
