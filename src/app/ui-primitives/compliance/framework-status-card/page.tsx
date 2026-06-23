import type { Metadata } from "next"

import { FrameworkStatusCard } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Framework status card | Compliance",
  description:
    "Primitive 02 — single framework status card with iconmark, status chip, percent meter, and audit dates.",
}

export default function FrameworkStatusCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Status card"
        title="Framework status card"
        description="One card per compliance framework. Composes an iconmark (FRAMEWORK_SHORT), a tone-mapped status chip (Compliant / In Progress / Lapsed / Not Started), a percent meter backed by role='meter' + aria-valuenow, and last + next audit dates."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Framework status card" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · four status tones</span>
        <div className={styles.demoSplit}>
          <FrameworkStatusCard
            framework="iso-27001"
            status="compliant"
            percent={100}
            lastAuditDate="2026-02-14"
            nextAuditDate="2026-08-14"
          />
          <FrameworkStatusCard
            framework="soc-2"
            status="in-progress"
            percent={78}
            lastAuditDate="2025-11-04"
            nextAuditDate="2026-07-12"
          />
        </div>
        <div className={styles.demoSplit}>
          <FrameworkStatusCard
            framework="austrac-amlctf"
            status="lapsed"
            percent={48}
            lastAuditDate="2024-12-02"
            nextAuditDate="overdue"
          />
          <FrameworkStatusCard
            framework="hipaa"
            status="not-started"
            percent={4}
            lastAuditDate="—"
            nextAuditDate="2026-12-01"
          />
        </div>
      </section>
    </main>
  )
}
