import type { Metadata } from "next"

import { SmartCollectionRow } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import { DEMO_SMART_COLLECTION_CRITERIA } from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Smart collection row | Asset Library",
  description:
    "Primitive 09 — smart-collection row showing rule criteria chips and an auto-updating count.",
}

export default function SmartCollectionRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Smart Collection"
        title="Smart collection row"
        description="A row that summarises a rule-based collection. Each criterion appears as a chip, the live asset count sits to the right of the name, and an edit CTA opens the rule editor."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Smart collection row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ display: "grid", gap: 12 }}>
          <SmartCollectionRow
            name="Recent customer stories"
            count={42}
            criteria={DEMO_SMART_COLLECTION_CRITERIA}
          />
          <SmartCollectionRow
            name="Manta family — hero approved"
            count={18}
            criteria={[
              { id: "c1", label: "tag: manta" },
              { id: "c2", label: "approval: published" },
              { id: "c3", label: "kind: image" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
