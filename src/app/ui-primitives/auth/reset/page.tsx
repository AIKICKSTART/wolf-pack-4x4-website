import type { Metadata } from "next"

import { ResetForm } from "./reset-form"

export const metadata: Metadata = {
  title: "Reset password | UI Primitives — Auth",
  description: "Auth scene reference — password reset surface for the primitives gallery.",
}

export default function ResetPage() {
  return <ResetForm />
}
