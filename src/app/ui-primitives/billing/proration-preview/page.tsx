import type { Metadata } from "next"

import { ProrationPreview } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { DEMO_AMOUNTS } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Proration preview | Billing | UI Primitives",
  description:
    "Proration preview primitive — credit, charge, effective date and net due. Uses role='status' and aria-live for live updates.",
}

export default function ProrationPreviewPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12"
        title="Proration preview"
        description="Shown when a customer changes plans. Computes unused credit from the old plan, the new cycle charge, and the net amount due (or credit added). Live region announces changes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Proration preview" },
        ]}
      />
      <ProrationPreview
        fromPlanName="Starter"
        toPlanName="Workshop Pro"
        effectiveISO="2026-05-30"
        unusedCredit={DEMO_AMOUNTS.prorationUnusedCredit}
        newCharge={DEMO_AMOUNTS.prorationNewCharge}
      />
    </main>
  )
}
