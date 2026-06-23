import type { Metadata } from "next"

import { DpaViewer } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "DPA viewer | Compliance",
  description:
    "Primitive 04 — data processing agreement viewer showing vendor, term, version, key clauses, and a download CTA.",
}

export default function DpaViewerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / DPA"
        title="DPA viewer"
        description="Surface for an active data processing agreement signed with a service provider. Shows vendor identity, signed date, contractual term, document version, standard contractual clauses indicator, sub-processor count, and a key-clause summary list, plus a download CTA for the signed PDF."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "DPA viewer" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · single DPA</span>
        <DpaViewer
          vendorName="Stripe Payments Australia Pty Ltd"
          signedDate="2026-02-14"
          term="36 months · auto-renew · 90-day exit"
          version="v3.1 · 2026-01"
          scc="EU 2021/914 · AU addendum"
          subprocessorCount={11}
          keyClauses={[
            { ref: "§3.1", summary: "Vendor acts as processor; controller is Oak Flats Mufflermen Pty Ltd." },
            { ref: "§4.2", summary: "Cardholder data tokenised at source; raw PAN never reaches the workshop." },
            { ref: "§6.4", summary: "Sub-processor changes notified 30 days in advance via the trust portal." },
            { ref: "§9.1", summary: "Breach notification within 72 hours of confirmed unauthorised access." },
            { ref: "§11.3", summary: "On termination, encrypted data is returned then crypto-erased within 30 days." },
          ]}
          downloadHref="#download-dpa-stripe"
        />
      </section>
    </main>
  )
}
