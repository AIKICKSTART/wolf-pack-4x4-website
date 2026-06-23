import type { Metadata } from "next"

import { ABVariantEditor } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_AB_VARIANTS } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "A/B variant editor | Marketing campaigns",
  description:
    "Primitive 03 — variant tabs, weight sliders, winner rule chips, per-variant subject and preview.",
}

export default function ABVariantScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / A/B variant editor"
        title="A/B variant editor"
        description="Tab between A, B, and C variants. Each variant carries its own subject, body, and weight. Pick a winner rule — highest opens, clicks, revenue, or manual — and see the live weight distribution at the bottom."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "A/B variant" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ABVariantEditor variants={DEMO_AB_VARIANTS} defaultWinnerRule="clicks" />
      </section>
    </main>
  )
}
