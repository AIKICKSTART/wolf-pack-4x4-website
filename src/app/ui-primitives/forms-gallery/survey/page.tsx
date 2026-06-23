import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SurveyForm } from "../../components/forms-gallery/survey-form"

import styles from "../forms-gallery.module.css"

export const metadata: Metadata = {
  title: "Survey form | Forms Gallery",
  description:
    "Pattern 07 — single-page workshop survey with mixed inputs: 1–10 scale, chips, ranked list, text, slider.",
}

export default function SurveyScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Pattern 07 / Survey"
        title="Survey form"
        description="Single-page survey with a progress strip at the top and five mixed-input questions — scale, chips, ranked list, free text, slider."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms gallery", href: "/ui-primitives/forms-gallery" },
          { label: "Survey" },
        ]}
      />
      <SurveyForm />
    </main>
  )
}
