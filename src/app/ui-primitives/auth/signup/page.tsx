import type { Metadata } from "next"

import { SignupForm } from "./signup-form"

export const metadata: Metadata = {
  title: "Create account | UI Primitives — Auth",
  description: "Auth scene reference — workshop signup stepper for the primitives gallery.",
}

export default function SignupPage() {
  return <SignupForm />
}
