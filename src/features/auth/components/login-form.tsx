import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginValues } from "../schemas/auth-schema"
import { useLogin } from "../hooks/use-login"
import axios from "axios"

// axios.defaults.baseURL removed to use Vite Proxy
axios.defaults.withCredentials = true
axios.defaults.headers.common["Accept"] = "application/json"
// PENTING: Karena Anda menggunakan X-Client-Type: web di controller untuk mengenali SPA
axios.defaults.headers.common["X-Client-Type"] = "web"

// const handleLogin = async (email: string, password: string) => {
//   try {
//     // Step 1: Inisialisasi CSRF Protection
//     // Laravel akan mengirimkan cookie XSRF-TOKEN ke browser Anda
//     await axios.get("/sanctum/csrf-cookie")

//     // Step 2: Kirim Request Login
//     // Axios otomatis menyertakan cookie dan header X-XSRF-TOKEN
//     const response = await axios.post("/api/login", {
//       email: email,
//       password: password,
//     })

//     console.log("Berhasil Login!", response.data)
//     return response.data
//   } catch (err) {
//     console.error("Gagal login:", err.response?.data || err.message)
//     throw err // Lempar error agar bisa ditangkap di UI
//   }
// }

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutate, isPending } = useLogin()
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (values: LoginValues) => {
    mutate(values) // Ini akan memicu alur Sanctum -> Login -> Get User -> Zustand -> Redirect

    // handleLogin(values.email, values.password)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="password"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
