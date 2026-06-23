import type { Metadata } from "next"

import { TranslationKeyRow } from "../../components/localization"
import { PageHeader } from "../../components/page-header"
import { KEY_TARGETS } from "../seed-data"

import styles from "../localization.module.css"

export const metadata: Metadata = {
  title: "Translation key row | Localization",
  description:
    "Primitive 06 — translation key row with source string, per-locale targets, status chips, and a missing-translation marker for unfilled locales.",
}

export default function TranslationKeyRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Editing"
        title="Translation key row"
        description="A single translation key with its canonical source string and the translation per locale. Each target carries a status chip (translated, missing, fuzzy, in review, approved) and a reviewer-state chip. Missing rows are made obvious."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization", href: "/ui-primitives/localization" },
          { label: "Translation key row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — workshop.booking.cta.primary</span>
        <TranslationKeyRow
          translationKey="workshop.booking.cta.primary"
          sourceString="Book a muffler service"
          sourceLocale="en-AU"
          targets={KEY_TARGETS}
        />
      </section>
    </main>
  )
}
