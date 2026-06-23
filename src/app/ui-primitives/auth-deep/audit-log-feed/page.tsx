import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuditLogFeed } from "../../components/auth-deep"

import { AUDIT_ENTRIES } from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Audit log feed | Auth deep",
  description:
    "Primitive 06 — authentication audit feed with severity tone, filter chips and timeline rail.",
}

export default function AuditLogFeedPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Audit"
        title="Audit log feed"
        description="Authentication audit timeline — Mick's suspicious Brisbane sign-in attempts, Jase's YubiKey enrolment, Mick impersonating Hannah during ticket SUPPORT-2026-0184."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Audit log feed" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Full feed · last 72 hours</span>
        <AuditLogFeed
          scopeLabel="Mick Davies — Admin"
          tenantLabel="Oak Flats Mufflermen"
          entries={AUDIT_ENTRIES}
          filterChips={[
            { label: "All", tone: "neutral", selected: true },
            { label: "Login", tone: "teal" },
            { label: "MFA", tone: "green" },
            { label: "Permissions", tone: "amber" },
            { label: "Impersonation", tone: "red" },
          ]}
        />

        <span className={styles.stageCaption}>Critical-only · BCC to risk team</span>
        <AuditLogFeed
          scopeLabel="Tenant scope · Oak Flats Mufflermen"
          tenantLabel="Oak Flats Mufflermen"
          entries={AUDIT_ENTRIES.filter((e) => e.severity === "critical" || e.severity === "high")}
        />

        <span className={styles.stageCaption}>Empty · quiet day</span>
        <AuditLogFeed
          scopeLabel="Reece Saunders — Manager"
          tenantLabel="Illawarra 4WD Co"
          entries={[]}
        />
      </section>
    </main>
  )
}
