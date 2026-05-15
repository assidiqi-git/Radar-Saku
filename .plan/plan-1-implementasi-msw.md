# Role & Context

You are an expert Full-Stack TypeScript Developer and AI Native Engineer.
I am building a React + Vite + TypeScript application for a personal financial tracker named "Radar Saku".
The frontend and backend are completely decoupled. We are using Mock Service Worker (MSW) v2 for API mocking during development.

# Input Data

I have attached the OpenAPI 3.1.0 JSON specifications exported from Laravel Scramble. This document contains all the necessary API contracts.

# Task

Your task is to parse the entire attached OpenAPI specification and generate the complete, production-ready MSW v2 setup.

# Strict Requirements & Output Specifications

## 1. Type Generation (`src/mocks/types.ts`)

- Extract ALL schemas defined in `components.schemas` from the OpenAPI JSON.
- Convert them into strictly typed TypeScript `interfaces` or `types`.
- Pay attention to nullable fields (e.g., `type: ["string", "null"]` should become `string | null`).
- Handle enums correctly as TypeScript union types (e.g., TransactionAction).

## 2. Mock Handlers (`src/mocks/handlers.ts`)

- Create an MSW `http` handler for EVERY SINGLE endpoint defined in the `paths` object.
- DO NOT skip any endpoint. DO NOT use placeholders like "// ... rest of endpoints". Write them all out.
- Base URL must be: `http://api-radar-saku.test/api`
- Create an in-memory data store (e.g., `let mockTransactions = []`, `let mockWallets = []`) at the top of the file to simulate state changes across POST/PUT/DELETE requests during a single browser session.
- For `GET` endpoints that return paginated data, wrap the array in the standard success response matching the OpenAPI definition (`success`, `message`, `data`, `meta`).
- For the POST `/transactions` endpoint, note that it uses `multipart/form-data`. Ensure you use `await request.formData()` instead of `request.json()` to parse the mock request.
- For the sync endpoints (`/sync/transactions`), just return a standard mock 200 response with `synced` and `skipped` counts. No need to implement the complex idempotency logic in the mock.
- **CRITICAL - Authentication Logic:** Pay very close attention to the `/login` and `/register` endpoints. The OpenAPI description specifies conditional responses based on the `X-Client-Type` header.
- Implement logic in the MSW handler to check for `request.headers.get('X-Client-Type') === 'web'`.
- If it is a web client, simulate Laravel Sanctum's SPA authentication: Return a `204 No Content` HttpResponse, AND set a mock `HttpOnly` cookie in the response headers using `Set-Cookie: laravel_session=mock_session_cookie; HttpOnly; Path=/`.
- If it is a mobile client (no web header), return the standard JSON response with the Bearer token as defined in the schema.
- Ensure the `/user` endpoint and other protected routes check for either this mock cookie OR the Bearer token to return the user data or a 401 Unauthorized.

## 3. MSW Browser Setup (`src/mocks/browser.ts`)

- Generate the setup file using `setupWorker` from `msw/browser` and export the initialized worker.

## 4. Vite Entry Point (`src/main.tsx` or equivalent)

- Provide the exact snippet required to conditionally start the MSW worker ONLY when `import.meta.env.MODE === 'development'`.
- Ensure the worker starts before `ReactDOM.createRoot().render()` is called.
- Add `{ onUnhandledRequest: 'bypass' }` to the `worker.start()` options.

# Execution

Please output the code file by file, using markdown code blocks with the file path clearly stated at the top of each block (e.g., `// src/mocks/types.ts`). Generate the complete code without omitting any fields or endpoints from the provided JSON.
