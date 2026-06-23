import type { Metadata } from "next"

import { PersonalizationTokenPicker } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { PERSONALIZATION_TOKENS } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Personalisation token picker | Email builder",
  description:
    "Primitive 06 — searchable token picker with sample-data preview and an insert action.",
}

export default function PersonalizationTokenPickerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Personalisation token picker"
        title="Personalisation token picker"
        description="A searchable list of every merge field that the Mufflermen send pipeline understands — customer, vehicle, quote, and workshop tokens — with a sample preview using the CodeBlock primitive and an insert CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Personalisation token picker" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — all tokens</span>
        <div className={styles.demoInline}>
          <PersonalizationTokenPicker tokens={PERSONALIZATION_TOKENS} />
        </div>
      </section>
    </main>
  )
}
