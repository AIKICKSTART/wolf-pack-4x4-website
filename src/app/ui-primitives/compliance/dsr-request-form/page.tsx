import type { Metadata } from "next"

import { DsrRequestForm } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "DSR request form | Compliance",
  description:
    "Primitive 07 — data subject request form with identity verification, request type, and scope chips.",
}

export default function DsrRequestFormScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / DSR"
        title="Data subject request form"
        description="Three-step data subject request form aligned to the Australian Privacy Act 1988 (Cth) and GDPR Article 15-21. Step 1 — identity verification. Step 2 — request type (Access / Erasure / Rectification / Portability / Restriction). Step 3 — scope chips. OAIC 30-day response notice in the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "DSR request form" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three-step flow</span>
        <DsrRequestForm
          scopeOptions={[
            { id: "account", label: "Account profile + contact details" },
            { id: "bookings", label: "Workshop bookings + invoices" },
            { id: "vehicles", label: "Saved vehicles + VIN history" },
            { id: "support", label: "Support chat transcripts" },
            { id: "marketing", label: "Marketing subscriptions" },
            { id: "telephony", label: "Telephony recordings" },
          ]}
        />
      </section>
    </main>
  )
}
