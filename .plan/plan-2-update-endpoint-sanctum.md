# Update Context: Laravel Sanctum CSRF Initialization

I need to update the previously generated MSW implementation for the "Radar Saku" project. There is one critical step missing in the authentication flow: the frontend must call the Sanctum CSRF-cookie endpoint before any authentication or state-changing requests are made.

# Task: Implement CSRF Mocking

Please update the `src/mocks/handlers.ts` and ensure the following logic is implemented:

## 1. Add Sanctum CSRF-Cookie Endpoint

- Implement a `GET` handler for `http://api-radar-saku.test/sanctum/csrf-cookie`.
- Note that this endpoint is usually outside the `/api` prefix.
- Behavior:
  - It must return a `204 No Content` response.
  - It must set a mock `XSRF-TOKEN` cookie in the response headers.
  - Example Header: `'Set-Cookie': 'XSRF-TOKEN=mock-csrf-token; Path=/; SameSite=Lax'`.

## 2. Update Authentication Handlers

- Ensure the `/login` and `/register` handlers are aware that the `XSRF-TOKEN` should ideally be present in the request cookies (as a simulation of Laravel's CSRF protection).
- If the `/login` request is made and the `X-Client-Type: web` header is present, ensure the response also sets the `laravel_session` cookie alongside the 204 status code, as previously instructed.

## 3. Usage Example (Documentation)

- Provide a brief code snippet showing how to call this in a React `useEffect` or inside the `axios.ts` interceptor logic to ensure the CSRF-cookie is fetched before the first login attempt.

# Constraints

- Keep all existing TypeScript interfaces in `src/mocks/types.ts`.
- Maintain the in-memory data store for wallets and transactions.
- Do not remove the `X-Client-Type` conditional logic; simply augment it with this CSRF requirement.
