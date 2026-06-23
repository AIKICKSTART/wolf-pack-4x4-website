import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ComplianceCertUpload } from "../../components/supplier-portal"

import styles from "../supplier-portal.module.css"

export const metadata: Metadata = {
  title: "Compliance certificate upload | UI Primitives — Supplier Portal",
}

export default function ComplianceCertPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23.13 / Supplier portal"
        title="Compliance certificate upload"
        description="ADR / ISO / MSDS / insurance / trade-licence uploads with expiry and checksum verification."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Supplier portal", href: "/ui-primitives/supplier-portal" },
          { label: "Compliance cert" },
        ]}
      />
      <section className={styles.canvas}>
        <ComplianceCertUpload
          defaultKind="adr"
          defaultExpiry="2027-05-30"
          checksumVerified
        />
      </section>
    </main>
  )
}
