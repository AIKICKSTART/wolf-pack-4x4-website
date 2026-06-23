import type { Metadata } from "next"

import { EnrichmentStatusChip } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Enrichment status chip | Sales leads",
  description:
    "Primitive 11 — tiny chip showing enriched fields count with provider popover.",
}

export default function EnrichmentChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Enrichment chip"
        title="Enrichment status chip"
        description="Compact at-a-glance signal of how much data the lead arrived with vs. how much we've enriched. Click to inspect providers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Enrichment chip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three completion states</span>
        <div className={styles.demoInline}>
          <EnrichmentStatusChip
            enrichedCount={8}
            totalCount={9}
            providers={["abn-lookup", "manual", "hunter"]}
          />
          <EnrichmentStatusChip
            enrichedCount={5}
            totalCount={9}
            providers={["manual", "clearbit"]}
          />
          <EnrichmentStatusChip
            enrichedCount={2}
            totalCount={9}
            providers={["manual"]}
          />
        </div>
      </section>
    </main>
  )
}
