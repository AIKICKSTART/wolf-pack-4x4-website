import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SurveyPromptDemos } from "../_interactive-demos"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Survey prompt card | Product tours",
  description:
    "Primitive 13 — one-question embedded survey with multi-choice toggles and a send CTA.",
}

export default function SurveyPromptCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Survey prompt"
        title="Survey prompt card"
        description="Drop-in single-question survey for in-app collection. Single- or multi-select choices with optional tone colouring (positive / warning / negative)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Survey prompt card" },
        ]}
      />

      <SurveyPromptDemos />
    </main>
  )
}
