import type { Metadata } from "next"

import { LeadImportWizard } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"
import {
  MUFFLERMEN_IMPORT_MAPPINGS,
  MUFFLERMEN_IMPORT_PREVIEW,
} from "../demo-data"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Lead import wizard | Sales leads",
  description:
    "Primitive 14 — five-step lead import wizard — upload, map columns, dedupe, preview, import.",
}

export default function LeadImportScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Import wizard"
        title="Lead import wizard"
        description="The CSV import flow used after trade-shows and supplier-shared lead lists. Step-by-step — upload, map, dedupe, preview, then import."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Import wizard" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Demo flow</span>
        <LeadImportWizard
          fileName="trade-show-leads-2026-05-29.csv"
          fileSizeKb={184}
          mappings={MUFFLERMEN_IMPORT_MAPPINGS}
          previewRows={MUFFLERMEN_IMPORT_PREVIEW}
        />
      </section>
    </main>
  )
}
