import { http, HttpResponse } from "msw"
import type {
  User,
  WalletResource,
  TransactionTypeResource,
  TransactionCategoryResource,
  TransactionResource,
  TransferResource,
} from "./types"

const BASE_URL = "/api"

// =============================================================================
// Helpers
// =============================================================================

let nextId = 100
function generateId(): string {
  return `01J${String(nextId++).padStart(23, "0")}`
}

function now(): string {
  return new Date().toISOString()
}

function paginate<T>(items: T[], url: URL) {
  const page = Number(url.searchParams.get("page") ?? 1)
  const perPage = 15
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  const data = items.slice(start, start + perPage)
  return {
    success: true,
    message: "Success",
    data,
    meta: {
      current_page: page,
      per_page: perPage,
      total_items: total,
      total_pages: totalPages,
    },
  }
}

// =============================================================================
// In-Memory Data Store
// =============================================================================

let isAuthenticated = false

const mockUser: User = {
  id: "01JAAAAAAAAAAAAAAAAAAAAAA1",
  name: "Radar User",
  email: "test@example.com",
  email_verified_at: "2026-01-01T00:00:00.000000Z",
  created_at: "2026-01-01T00:00:00.000000Z",
  updated_at: "2026-01-01T00:00:00.000000Z",
}

let mockWallets: WalletResource[] = [
  {
    id: "01JBBBBBBBBBBBBBBBBBBBBBB1",
    name: "BCA Checking",
    type: "checking",
    balance: "5000000.00",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JBBBBBBBBBBBBBBBBBBBBBB2",
    name: "Cash Wallet",
    type: "cash",
    balance: "750000.00",
    created_at: "2026-01-02T00:00:00Z",
    updated_at: "2026-01-02T00:00:00Z",
  },
  {
    id: "01JBBBBBBBBBBBBBBBBBBBBBB3",
    name: "Emergency Fund",
    type: "savings",
    balance: "10000000.00",
    created_at: "2026-01-03T00:00:00Z",
    updated_at: "2026-01-03T00:00:00Z",
  },
]

let mockTransactionTypes: TransactionTypeResource[] = [
  {
    id: "01JCCCCCCCCCCCCCCCCCCCCCC1",
    name: "income",
    action: "addition",
    description: "Pemasukan",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JCCCCCCCCCCCCCCCCCCCCCC2",
    name: "outcome",
    action: "deduction",
    description: "Pengeluaran",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JCCCCCCCCCCCCCCCCCCCCCC3",
    name: "saving",
    action: "neutral",
    description: "Tabungan",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
]

let mockCategories: TransactionCategoryResource[] = [
  {
    id: "01JDDDDDDDDDDDDDDDDDDDDDD1",
    name: "Gaji",
    description: "Gaji bulanan",
    transaction_type: mockTransactionTypes[0],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JDDDDDDDDDDDDDDDDDDDDDD2",
    name: "Freelance",
    description: "Pendapatan freelance",
    transaction_type: mockTransactionTypes[0],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JDDDDDDDDDDDDDDDDDDDDDD3",
    name: "Makanan",
    description: "Pengeluaran makan",
    transaction_type: mockTransactionTypes[1],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JDDDDDDDDDDDDDDDDDDDDDD4",
    name: "Transportasi",
    description: "Ongkos transportasi",
    transaction_type: mockTransactionTypes[1],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JDDDDDDDDDDDDDDDDDDDDDD5",
    name: "Hiburan",
    description: "Pengeluaran hiburan",
    transaction_type: mockTransactionTypes[1],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "01JDDDDDDDDDDDDDDDDDDDDDD6",
    name: "Dana Darurat",
    description: "Tabungan darurat",
    transaction_type: mockTransactionTypes[2],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
]

let mockTransactions: TransactionResource[] = [
  {
    id: "01JEEEEEEEEEEEEEEEEEEEEEE1",
    name: "Gaji Mei",
    amount: "8000000.00",
    note: "Gaji bulan Mei",
    photo_url: null,
    wallet: mockWallets[0],
    transaction_category: mockCategories[0],
    created_at: "2026-05-01T08:00:00Z",
    updated_at: "2026-05-01T08:00:00Z",
    deleted_at: null,
  },
  {
    id: "01JEEEEEEEEEEEEEEEEEEEEEE2",
    name: "Makan Siang",
    amount: "35000.00",
    note: null,
    photo_url: null,
    wallet: mockWallets[1],
    transaction_category: mockCategories[2],
    created_at: "2026-05-02T12:00:00Z",
    updated_at: "2026-05-02T12:00:00Z",
    deleted_at: null,
  },
  {
    id: "01JEEEEEEEEEEEEEEEEEEEEEE3",
    name: "Grab ke Kantor",
    amount: "25000.00",
    note: null,
    photo_url: null,
    wallet: mockWallets[1],
    transaction_category: mockCategories[3],
    created_at: "2026-05-03T07:30:00Z",
    updated_at: "2026-05-03T07:30:00Z",
    deleted_at: null,
  },
  {
    id: "01JEEEEEEEEEEEEEEEEEEEEEE4",
    name: "Nonton Bioskop",
    amount: "50000.00",
    note: "Film terbaru",
    photo_url: null,
    wallet: mockWallets[0],
    transaction_category: mockCategories[4],
    created_at: "2026-05-04T19:00:00Z",
    updated_at: "2026-05-04T19:00:00Z",
    deleted_at: null,
  },
  {
    id: "01JEEEEEEEEEEEEEEEEEEEEEE5",
    name: "Freelance Project",
    amount: "2000000.00",
    note: "Web project",
    photo_url: null,
    wallet: mockWallets[0],
    transaction_category: mockCategories[1],
    created_at: "2026-05-05T10:00:00Z",
    updated_at: "2026-05-05T10:00:00Z",
    deleted_at: null,
  },
]

let mockTransfers: TransferResource[] = [
  {
    id: "01JFFFFFFFFFFFFFFFFFFFF1",
    amount: "500000.00",
    fee: "0.00",
    transfer_date: "2026-05-01T00:00:00Z",
    note: "Top up cash",
    from_wallet: mockWallets[0],
    to_wallet: mockWallets[1],
    created_at: "2026-05-01T09:00:00Z",
    updated_at: "2026-05-01T09:00:00Z",
  },
  {
    id: "01JFFFFFFFFFFFFFFFFFFFF2",
    amount: "1000000.00",
    fee: "6500.00",
    transfer_date: "2026-05-10T00:00:00Z",
    note: "Tabungan bulanan",
    from_wallet: mockWallets[0],
    to_wallet: mockWallets[2],
    created_at: "2026-05-10T09:00:00Z",
    updated_at: "2026-05-10T09:00:00Z",
  },
]

// =============================================================================
// Auth check helper
// =============================================================================

function checkAuth(request: Request) {
  const authHeader = request.headers.get("Authorization")
  if (isAuthenticated) return true
  if (authHeader?.startsWith("Bearer ")) return true
  return false
}

function unauthorizedResponse() {
  return HttpResponse.json({ message: "Unauthenticated." }, { status: 401 })
}

// =============================================================================
// Handlers
// =============================================================================

export const handlers = [
  // -------------------------------------------------------------------------
  // SANCTUM CSRF
  // -------------------------------------------------------------------------

  // GET /sanctum/csrf-cookie (di luar /api prefix)
  http.get("/sanctum/csrf-cookie", () => {
    return new HttpResponse(null, {
      status: 204,
      headers: {
        "Set-Cookie": "XSRF-TOKEN=mock-csrf-token; Path=/; SameSite=Lax",
      },
    })
  }),

  // -------------------------------------------------------------------------
  // AUTH
  // -------------------------------------------------------------------------

  // POST /register
  http.post(`${BASE_URL}/register`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string
      email: string
      password: string
    }
    const isWeb = request.headers.get("X-Client-Type") === "web"

    const newUser: User = {
      ...mockUser,
      id: generateId(),
      name: body.name,
      email: body.email,
      updated_at: now(),
    }

    if (isWeb) {
      isAuthenticated = true
      return HttpResponse.json(
        {
          success: true,
          message: "Registration successful.",
          data: { user: newUser },
        },
        {
          status: 201,
          headers: {
            "Set-Cookie":
              "laravel_session=mock_session_cookie; HttpOnly; Path=/",
          },
        }
      )
    }
    return HttpResponse.json(
      {
        success: true,
        message: "Registration successful.",
        data: { token: "mock-bearer-token-register", user: newUser },
      },
      { status: 201 }
    )
  }),

  // POST /login
  http.post(`${BASE_URL}/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }
    const isWeb = request.headers.get("X-Client-Type") === "web"

    if (body.email !== mockUser.email) {
      return HttpResponse.json(
        {
          message: "The provided credentials are incorrect.",
          errors: { email: ["The provided credentials are incorrect."] },
        },
        { status: 422 }
      )
    }

    if (isWeb) {
      isAuthenticated = true
      return new HttpResponse(null, {
        status: 204,
        headers: {
          "Set-Cookie": "laravel_session=mock_session_cookie; HttpOnly; Path=/",
        },
      })
    }
    return HttpResponse.json({
      success: true,
      message: "Login successful.",
      data: { token: "mock-bearer-token-login", user: mockUser },
    })
  }),

  // POST /logout
  http.post(`${BASE_URL}/logout`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    isAuthenticated = false
    return HttpResponse.json({
      success: true,
      message: "Successfully logged out.",
      data: null,
    })
  }),

  // GET /user
  http.get(`${BASE_URL}/user`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    return HttpResponse.json({
      success: true,
      message: "Success",
      data: mockUser,
    })
  }),

  // -------------------------------------------------------------------------
  // WALLETS
  // -------------------------------------------------------------------------

  http.get(`${BASE_URL}/wallets`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    return HttpResponse.json(paginate(mockWallets, new URL(request.url)))
  }),

  http.post(`${BASE_URL}/wallets`, async ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const body = (await request.json()) as {
      name: string
      type: string
      balance?: number | null
    }
    const wallet: WalletResource = {
      id: generateId(),
      name: body.name,
      type: body.type,
      balance: (body.balance ?? 0).toFixed(2),
      created_at: now(),
      updated_at: now(),
    }
    mockWallets.push(wallet)
    return HttpResponse.json(
      { success: true, message: "Wallet created successfully.", data: wallet },
      { status: 201 }
    )
  }),

  http.get(`${BASE_URL}/wallets/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const wallet = mockWallets.find((w) => w.id === params.id)
    if (!wallet)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    return HttpResponse.json({
      success: true,
      message: "Success",
      data: wallet,
    })
  }),

  http.put(`${BASE_URL}/wallets/:id`, async ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const idx = mockWallets.findIndex((w) => w.id === params.id)
    if (idx === -1)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    const body = (await request.json()) as {
      name?: string
      type?: string
      balance?: number
    }
    if (body.name !== undefined) mockWallets[idx].name = body.name
    if (body.type !== undefined) mockWallets[idx].type = body.type
    if (body.balance !== undefined)
      mockWallets[idx].balance = body.balance.toFixed(2)
    mockWallets[idx].updated_at = now()
    return HttpResponse.json({
      success: true,
      message: "Wallet updated successfully.",
      data: mockWallets[idx],
    })
  }),

  http.delete(`${BASE_URL}/wallets/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const idx = mockWallets.findIndex((w) => w.id === params.id)
    if (idx === -1)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    mockWallets.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // -------------------------------------------------------------------------
  // TRANSACTION TYPES
  // -------------------------------------------------------------------------

  http.get(`${BASE_URL}/transaction-types`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    return HttpResponse.json(
      paginate(mockTransactionTypes, new URL(request.url))
    )
  }),

  http.post(`${BASE_URL}/transaction-types`, async ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const body = (await request.json()) as {
      name: string
      action: "addition" | "deduction" | "neutral"
      description?: string | null
    }
    const tt: TransactionTypeResource = {
      id: generateId(),
      name: body.name,
      action: body.action,
      description: body.description ?? null,
      created_at: now(),
      updated_at: now(),
    }
    mockTransactionTypes.push(tt)
    return HttpResponse.json(
      {
        success: true,
        message: "Transaction type created successfully.",
        data: tt,
      },
      { status: 201 }
    )
  }),

  http.get(`${BASE_URL}/transaction-types/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const tt = mockTransactionTypes.find((t) => t.id === params.id)
    if (!tt)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    return HttpResponse.json({ success: true, message: "Success", data: tt })
  }),

  http.put(`${BASE_URL}/transaction-types/:id`, async ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const idx = mockTransactionTypes.findIndex((t) => t.id === params.id)
    if (idx === -1)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    const body = (await request.json()) as {
      name?: string
      action?: "addition" | "deduction" | "neutral"
      description?: string | null
    }
    if (body.name !== undefined) mockTransactionTypes[idx].name = body.name
    if (body.action !== undefined)
      mockTransactionTypes[idx].action = body.action
    if (body.description !== undefined)
      mockTransactionTypes[idx].description = body.description
    mockTransactionTypes[idx].updated_at = now()
    // Update references in categories
    mockCategories.forEach((c) => {
      if (c.transaction_type?.id === params.id)
        c.transaction_type = { ...mockTransactionTypes[idx] }
    })
    return HttpResponse.json({
      success: true,
      message: "Transaction type updated successfully.",
      data: mockTransactionTypes[idx],
    })
  }),

  http.delete(`${BASE_URL}/transaction-types/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const idx = mockTransactionTypes.findIndex((t) => t.id === params.id)
    if (idx === -1)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    const hasCategories = mockCategories.some(
      (c) => c.transaction_type?.id === params.id
    )
    if (hasCategories) {
      return HttpResponse.json(
        {
          success: false,
          message: "Cannot delete because it has associated records.",
          errors: null,
        },
        { status: 409 }
      )
    }
    mockTransactionTypes.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // -------------------------------------------------------------------------
  // TRANSACTION CATEGORIES
  // -------------------------------------------------------------------------

  http.get(`${BASE_URL}/transaction-categories`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    return HttpResponse.json(paginate(mockCategories, new URL(request.url)))
  }),

  http.post(`${BASE_URL}/transaction-categories`, async ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const body = (await request.json()) as {
      transaction_type_id: string
      name: string
      description?: string | null
    }
    const tt = mockTransactionTypes.find(
      (t) => t.id === body.transaction_type_id
    )
    if (!tt) {
      return HttpResponse.json(
        {
          message: "Validation error.",
          errors: {
            transaction_type_id: [
              "The selected transaction type id is invalid.",
            ],
          },
        },
        { status: 422 }
      )
    }
    const cat: TransactionCategoryResource = {
      id: generateId(),
      name: body.name,
      description: body.description ?? null,
      transaction_type: { ...tt },
      created_at: now(),
      updated_at: now(),
    }
    mockCategories.push(cat)
    return HttpResponse.json(
      {
        success: true,
        message: "Transaction category created successfully.",
        data: cat,
      },
      { status: 201 }
    )
  }),

  http.get(`${BASE_URL}/transaction-categories/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const cat = mockCategories.find((c) => c.id === params.id)
    if (!cat)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    return HttpResponse.json({ success: true, message: "Success", data: cat })
  }),

  http.put(
    `${BASE_URL}/transaction-categories/:id`,
    async ({ params, request }) => {
      if (!checkAuth(request)) return unauthorizedResponse()
      const idx = mockCategories.findIndex((c) => c.id === params.id)
      if (idx === -1)
        return HttpResponse.json({ message: "Not found." }, { status: 404 })
      const body = (await request.json()) as {
        transaction_type_id?: string
        name?: string
        description?: string | null
      }
      if (body.name !== undefined) mockCategories[idx].name = body.name
      if (body.description !== undefined)
        mockCategories[idx].description = body.description
      if (body.transaction_type_id !== undefined) {
        const tt = mockTransactionTypes.find(
          (t) => t.id === body.transaction_type_id
        )
        if (!tt)
          return HttpResponse.json(
            {
              message: "Validation error.",
              errors: { transaction_type_id: ["Invalid."] },
            },
            { status: 422 }
          )
        mockCategories[idx].transaction_type = { ...tt }
      }
      mockCategories[idx].updated_at = now()
      return HttpResponse.json({
        success: true,
        message: "Transaction category updated successfully.",
        data: mockCategories[idx],
      })
    }
  ),

  http.delete(
    `${BASE_URL}/transaction-categories/:id`,
    ({ params, request }) => {
      if (!checkAuth(request)) return unauthorizedResponse()
      const idx = mockCategories.findIndex((c) => c.id === params.id)
      if (idx === -1)
        return HttpResponse.json({ message: "Not found." }, { status: 404 })
      const hasTx = mockTransactions.some(
        (t) => t.transaction_category?.id === params.id
      )
      if (hasTx) {
        return HttpResponse.json(
          {
            success: false,
            message: "Cannot delete because it has associated records.",
            errors: null,
          },
          { status: 409 }
        )
      }
      mockCategories.splice(idx, 1)
      return new HttpResponse(null, { status: 204 })
    }
  ),

  // -------------------------------------------------------------------------
  // TRANSACTIONS
  // -------------------------------------------------------------------------

  http.get(`${BASE_URL}/transactions`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const active = mockTransactions.filter((t) => !t.deleted_at)
    return HttpResponse.json(paginate(active, new URL(request.url)))
  }),

  http.post(`${BASE_URL}/transactions`, async ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const formData = await request.formData()
    const walletId = formData.get("wallet_id") as string
    const categoryId = formData.get("transaction_category_id") as string
    const amount = parseFloat(formData.get("amount") as string)
    const name = formData.get("name") as string
    const note = (formData.get("note") as string) || null

    const wallet = mockWallets.find((w) => w.id === walletId)
    const category = mockCategories.find((c) => c.id === categoryId)
    if (!wallet || !category) {
      return HttpResponse.json(
        { message: "Validation error.", errors: { wallet_id: ["Invalid."] } },
        { status: 422 }
      )
    }

    // Update wallet balance
    const action = category.transaction_type?.action
    const currentBalance = parseFloat(wallet.balance)
    if (action === "addition")
      wallet.balance = (currentBalance + amount).toFixed(2)
    else if (action === "deduction")
      wallet.balance = (currentBalance - amount).toFixed(2)
    wallet.updated_at = now()

    const tx: TransactionResource = {
      id: generateId(),
      name,
      amount: amount.toFixed(2),
      note,
      photo_url: null,
      wallet: { ...wallet },
      transaction_category: { ...category },
      created_at: now(),
      updated_at: now(),
      deleted_at: null,
    }
    mockTransactions.push(tx)
    return HttpResponse.json(
      { success: true, message: "Transaction created successfully.", data: tx },
      { status: 201 }
    )
  }),

  http.get(`${BASE_URL}/transactions/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const tx = mockTransactions.find((t) => t.id === params.id)
    if (!tx)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    return HttpResponse.json({ success: true, message: "Success", data: tx })
  }),

  http.delete(`${BASE_URL}/transactions/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const tx = mockTransactions.find((t) => t.id === params.id && !t.deleted_at)
    if (!tx)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })

    // Reverse wallet balance
    const wallet = mockWallets.find((w) => w.id === tx.wallet?.id)
    if (wallet) {
      const action = tx.transaction_category?.transaction_type?.action
      const bal = parseFloat(wallet.balance)
      const amt = parseFloat(tx.amount)
      if (action === "addition") wallet.balance = (bal - amt).toFixed(2)
      else if (action === "deduction") wallet.balance = (bal + amt).toFixed(2)
      wallet.updated_at = now()
    }
    tx.deleted_at = now()
    tx.updated_at = now()
    return new HttpResponse(null, { status: 204 })
  }),

  // -------------------------------------------------------------------------
  // TRANSFERS
  // -------------------------------------------------------------------------

  http.get(`${BASE_URL}/transfers`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    return HttpResponse.json(paginate(mockTransfers, new URL(request.url)))
  }),

  http.post(`${BASE_URL}/transfers`, async ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const body = (await request.json()) as {
      from_wallet_id: string
      to_wallet_id: string
      amount: number
      fee?: number | null
      transfer_date: string
      note?: string | null
    }
    const fromW = mockWallets.find((w) => w.id === body.from_wallet_id)
    const toW = mockWallets.find((w) => w.id === body.to_wallet_id)
    if (!fromW || !toW) {
      return HttpResponse.json(
        {
          message: "Validation error.",
          errors: { from_wallet_id: ["Invalid wallet."] },
        },
        { status: 422 }
      )
    }
    const fee = body.fee ?? 0
    const totalDebit = body.amount + fee
    if (parseFloat(fromW.balance) < totalDebit) {
      return HttpResponse.json(
        {
          message: "Validation error.",
          errors: { amount: ["Insufficient balance."] },
        },
        { status: 422 }
      )
    }
    fromW.balance = (parseFloat(fromW.balance) - totalDebit).toFixed(2)
    toW.balance = (parseFloat(toW.balance) + body.amount).toFixed(2)
    fromW.updated_at = now()
    toW.updated_at = now()

    const transfer: TransferResource = {
      id: generateId(),
      amount: body.amount.toFixed(2),
      fee: fee.toFixed(2),
      transfer_date: body.transfer_date,
      note: body.note ?? null,
      from_wallet: { ...fromW },
      to_wallet: { ...toW },
      created_at: now(),
      updated_at: now(),
    }
    mockTransfers.push(transfer)
    return HttpResponse.json(
      {
        success: true,
        message: "Transfer created successfully.",
        data: transfer,
      },
      { status: 201 }
    )
  }),

  http.get(`${BASE_URL}/transfers/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const transfer = mockTransfers.find((t) => t.id === params.id)
    if (!transfer)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    return HttpResponse.json({
      success: true,
      message: "Success",
      data: transfer,
    })
  }),

  http.delete(`${BASE_URL}/transfers/:id`, ({ params, request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    const idx = mockTransfers.findIndex((t) => t.id === params.id)
    if (idx === -1)
      return HttpResponse.json({ message: "Not found." }, { status: 404 })
    const transfer = mockTransfers[idx]

    // Reverse balance
    const fromW = mockWallets.find((w) => w.id === transfer.from_wallet?.id)
    const toW = mockWallets.find((w) => w.id === transfer.to_wallet?.id)
    if (fromW) {
      fromW.balance = (
        parseFloat(fromW.balance) +
        parseFloat(transfer.amount) +
        parseFloat(transfer.fee)
      ).toFixed(2)
      fromW.updated_at = now()
    }
    if (toW) {
      toW.balance = (
        parseFloat(toW.balance) - parseFloat(transfer.amount)
      ).toFixed(2)
      toW.updated_at = now()
    }

    mockTransfers.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),

  // -------------------------------------------------------------------------
  // SYNC
  // -------------------------------------------------------------------------

  http.post(`${BASE_URL}/sync/transactions`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    return HttpResponse.json({
      success: true,
      message: "Sync completed.",
      data: { synced: 5, skipped: 0 },
    })
  }),

  http.get(`${BASE_URL}/sync/transactions/pull`, ({ request }) => {
    if (!checkAuth(request)) return unauthorizedResponse()
    return HttpResponse.json({
      success: true,
      message: "Pull sync completed.",
      data: mockTransactions,
    })
  }),
]
