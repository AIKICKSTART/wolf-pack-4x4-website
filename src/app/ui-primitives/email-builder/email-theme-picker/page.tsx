import type { Metadata } from "next"

import { EmailThemePicker } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { THEME_PRESETS } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Email theme picker | Email builder",
  description:
    "Primitive 12 — six pre-built themes: Workshop Dark, Heritage Cream, Cinematic, Newsletter Classic, Receipt Style, Minimal.",
}

export default function EmailThemePickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Email theme picker"
        title="Email theme picker"
        description="Six tile-based theme presets, each with a mini preview of header, body, CTA, and accent. Selecting a tile updates the active radio in the radiogroup — the inspector and canvas pick the chosen tone up downstream."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Email theme picker" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — all six themes</span>
        <EmailThemePicker presets={THEME_PRESETS} initialTheme="workshop-dark" />
      </section>
    </main>
  )
}
