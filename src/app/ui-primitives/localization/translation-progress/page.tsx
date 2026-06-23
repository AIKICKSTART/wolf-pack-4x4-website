import type { Metadata } from "next"

import { TranslationProgressMeter } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { PROGRESS_ENTRIES } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Translation progress meter | Localization",
  description:
    "Primitive 07 — translation coverage meter showing translated keys per locale, with a tone-shifting fill (red below 50%, amber 50–90%, green 90% and above).",
}

export default function TranslationProgressScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Status"
        title="Translation progress meter"
        description="A bar per language showing percent translated. The fill colour shifts as coverage improves — red below 50%, amber 50–90%, green at 90% and above — so a glance tells you which markets are blocking launch."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Translation progress meter" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — workshop catalogue coverage</span>
        <TranslationProgressMeter
          entries={PROGRESS_ENTRIES}
          title="Workshop catalogue · keys translated"
        />
      </section>
    </main>
  )
}
