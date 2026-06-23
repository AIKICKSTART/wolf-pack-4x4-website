import type { Metadata } from "next"

import { UsageTracker } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_USAGES } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Usage tracker | Asset Library",
  description:
    "Primitive 11 — where-used surface listing the pages, workflows, and emails that reference an asset.",
}

export default function UsageTrackerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Where Used"
        title="Usage tracker"
        description="A focused list of everywhere this asset is currently referenced — pages, Mufflerpulse issues, marketing emails, Hermes workflow steps — with the date that surface last changed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Usage tracker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 560, marginInline: "auto" }}>
          <UsageTracker usages={DEMO_USAGES} />
        </div>
      </section>
    </main>
  )
}
