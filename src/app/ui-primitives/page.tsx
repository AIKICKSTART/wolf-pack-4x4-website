import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { uiPrimitivesCollectionJsonLd } from "@/lib/primitives/seo"

import { UiPrimitivesDashboard } from "./ui-primitives-dashboard"

export const metadata: Metadata = {
  title: "UI Primitives Dashboard",
  description:
    "Internal inspection board for Oak Flats Mufflermen UI foundations, reusable components, workflow patterns, and production gaps.",
}

export const dynamic = "force-dynamic"

export default function UiPrimitivesPage() {
  const isProduction = process.env.NODE_ENV === "production"
  const isEnabledInProd = process.env.NEXT_PUBLIC_PRIMITIVES_ROUTE_ENABLED === "1"

  if (isProduction && !isEnabledInProd) {
    notFound()
  }

  return (
    <>
      <JsonLd data={uiPrimitivesCollectionJsonLd()} />
      <UiPrimitivesDashboard />
    </>
  )
}
