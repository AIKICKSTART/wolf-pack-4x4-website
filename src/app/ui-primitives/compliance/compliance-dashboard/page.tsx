import type { Metadata } from "next"

import { ComplianceDashboard } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Compliance dashboard | Compliance",
  description:
    "Primitive 01 — top-level compliance dashboard composing framework status cards with a summary strip.",
}

export default function ComplianceDashboardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Composition"
        title="Compliance dashboard"
        description="Top-level dashboard composing five framework status cards (ISO 27001 / SOC 2 / GDPR / PCI DSS / HIPAA) with a derived summary strip showing total frameworks, compliant count, lapsed count, and average completion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Compliance dashboard" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · five frameworks · summary auto-derived</span>
        <ComplianceDashboard
          title="Mufflermen governance posture"
          tagline="Posture across the four pillars Oak Flats Mufflermen reports against — international (ISO/SOC), regulated (PCI/HIPAA), and the AU-specific Privacy Act 1988."
          frameworks={[
            {
              framework: "iso-27001",
              status: "compliant",
              percent: 100,
              lastAuditDate: "2026-02-14",
              nextAuditDate: "2026-08-14",
            },
            {
              framework: "soc-2",
              status: "compliant",
              percent: 96,
              lastAuditDate: "2026-03-22",
              nextAuditDate: "2026-09-22",
            },
            {
              framework: "gdpr",
              status: "in-progress",
              percent: 78,
              lastAuditDate: "2025-11-04",
              nextAuditDate: "2026-07-12",
            },
            {
              framework: "pci-dss",
              status: "in-progress",
              percent: 64,
              lastAuditDate: "2025-09-30",
              nextAuditDate: "2026-06-30",
            },
            {
              framework: "hipaa",
              status: "not-started",
              percent: 12,
              lastAuditDate: "—",
              nextAuditDate: "2026-12-01",
            },
          ]}
        />
      </section>
    </main>
  )
}
