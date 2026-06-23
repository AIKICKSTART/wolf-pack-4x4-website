import type { Metadata } from "next"

import { TwoFactorForm } from "./two-factor-form"

export const metadata: Metadata = {
  title: "Two-factor | UI Primitives — Auth",
  description: "Auth scene reference — two-factor verification surface for the primitives gallery.",
}

export default function TwoFactorPage() {
  return <TwoFactorForm />
}
