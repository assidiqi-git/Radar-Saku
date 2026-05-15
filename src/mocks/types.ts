// =============================================================================
// src/mocks/types.ts
// All TypeScript types extracted from OpenAPI 3.1.0 specification
// Generated from Laravel Scramble's endpoint.json
// =============================================================================

// ---------------------------------------------------------------------------
// Enums & Union Types
// ---------------------------------------------------------------------------

/** Enum yang menentukan bagaimana transaksi mempengaruhi saldo wallet */
export type TransactionAction = "addition" | "deduction" | "neutral"

/** Tipe wallet yang tersedia */
export type WalletType = "checking" | "savings" | "cash" | "investment"

// ---------------------------------------------------------------------------
// Resource / Response Types (dari components.schemas.*Resource)
// ---------------------------------------------------------------------------

export interface User {
  id: string
  name: string
  email: string
  email_verified_at: string | null
  created_at: string | null
  updated_at: string | null
}

export interface WalletResource {
  id: string
  name: string
  type: string
  balance: string
  created_at: string | null
  updated_at: string | null
}

export interface TransactionTypeResource {
  id: string
  name: string
  action: TransactionAction
  description: string | null
  created_at: string | null
  updated_at: string | null
}

export interface TransactionCategoryResource {
  id: string
  name: string
  description: string | null
  transaction_type?: TransactionTypeResource
  created_at: string | null
  updated_at: string | null
}

export interface TransactionResource {
  id: string
  name: string
  amount: string
  note: string | null
  photo_url: string | null
  wallet?: WalletResource
  transaction_category?: TransactionCategoryResource
  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
}

export interface TransferResource {
  id: string
  amount: string
  fee: string
  transfer_date: string
  note: string | null
  from_wallet?: WalletResource
  to_wallet?: WalletResource
  created_at: string | null
  updated_at: string | null
}

// ---------------------------------------------------------------------------
// Request Types (dari components.schemas.*Request)
// ---------------------------------------------------------------------------

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface StoreWalletRequest {
  name: string
  type: WalletType
  balance?: number | null
}

export interface UpdateWalletRequest {
  name?: string
  type?: WalletType
  balance?: number
}

export interface StoreTransactionTypeRequest {
  name: string
  action: TransactionAction
  description?: string | null
}

export interface UpdateTransactionTypeRequest {
  name?: string
  action?: TransactionAction
  description?: string | null
}

export interface StoreTransactionCategoryRequest {
  transaction_type_id: string
  name: string
  description?: string | null
}

export interface UpdateTransactionCategoryRequest {
  transaction_type_id?: string
  name?: string
  description?: string | null
}

export interface StoreTransactionRequest {
  wallet_id: string
  transaction_category_id: string
  amount: number
  name: string
  note?: string | null
  photo?: File | null
}

export interface StoreTransferRequest {
  from_wallet_id: string
  to_wallet_id: string
  amount: number
  fee?: number | null
  transfer_date: string
  note?: string | null
}

export interface SyncTransactionItem {
  id: string
  wallet_id: string
  transaction_category_id: string
  amount: number
  name: string
  note?: string | null
  created_at?: string | null
  deleted_at?: string | null
}

export interface SyncTransactionRequest {
  transactions: SyncTransactionItem[]
}

// ---------------------------------------------------------------------------
// Generic API Envelope Types
// ---------------------------------------------------------------------------

export interface ApiSuccessResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginationMeta {
  current_page: number
  per_page: number
  total_items: number
  total_pages: number
}

export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: T[]
  meta: PaginationMeta
}

// ---------------------------------------------------------------------------
// Error Response Types
// ---------------------------------------------------------------------------

export interface ValidationErrorResponse {
  message: string
  errors: Record<string, string[]>
}

export interface AuthenticationErrorResponse {
  message: string
}

export interface NotFoundErrorResponse {
  message: string
}

export interface ConflictErrorResponse {
  success: boolean
  message: string
  errors: null
}
