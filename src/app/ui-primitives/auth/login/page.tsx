import type { Metadata } from "next"

import { LoginForm } from "./login-form"

export const metadata: Metadata = {
  title: "Sign in | UI Primitives — Auth",
  description: "Auth scene reference — workshop sign in surface for the primitives gallery.",
}

export default function LoginPage() {
  return <LoginForm />
}
