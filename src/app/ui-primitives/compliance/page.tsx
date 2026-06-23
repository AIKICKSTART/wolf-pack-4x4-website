import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./compliance.module.css"

export const metadata: Metadata = {
  title: "Compliance + governance + privacy | UI Primitives",
  description:
    "Compliance, governance and privacy primitives for the Mufflermen workshop — framework status, ROPA records, DPA viewer, sub-processor list, consent management, DSR forms, retention rules, encryption posture, pentest results, VDP, policy diff, security posture, incident banner, and a composed full dashboard.",
}

interface ComplianceScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<ComplianceScene> = [
  {
    kicker: "Primitive 01",
    title: "Compliance dashboard",
    body: "Top-level dashboard composing framework status cards with a summary strip — frameworks, compliant, lapsed, average completion.",
    href: "/ui-primitives/compliance/compliance-dashboard",
    accent: "green",
    glyph: "▦",
    state: "Composition",
  },
  {
    kicker: "Primitive 02",
    title: "Framework status card",
    body: "Single framework card — iconmark, status chip, percent meter, last + next audit dates. ISO 27001 / SOC 2 / GDPR / E8 / IRAP.",
    href: "/ui-primitives/compliance/framework-status-card",
    accent: "green",
    glyph: "ISO",
    state: "Stateless · meter",
  },
  {
    kicker: "Primitive 03",
    title: "Data processing record",
    body: "ROPA / Article-30 record — category, purpose, legal basis, retention, recipients, transfers in semantic dl/dt/dd.",
    href: "/ui-primitives/compliance/data-processing-record",
    accent: "teal",
    glyph: "ROPA",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "DPA viewer",
    body: "Data processing agreement viewer — vendor, signed date, term, version, key clauses, download CTA.",
    href: "/ui-primitives/compliance/dpa-viewer",
    accent: "violet",
    glyph: "§",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Sub-processor list",
    body: "Schedule 2 sub-processor table — vendor + service + location + DPIA status + last-reviewed.",
    href: "/ui-primitives/compliance/subprocessor-list",
    accent: "teal",
    glyph: "▤",
    state: "Stateless · table",
  },
  {
    kicker: "Primitive 06",
    title: "Consent management banner",
    body: "Full consent surface — Essential / Functional / Analytics / Marketing / Sale-of-data toggles + preference center + save action.",
    href: "/ui-primitives/compliance/consent-management-banner",
    accent: "teal",
    glyph: "◐◑",
    state: "Stateful · toggles",
  },
  {
    kicker: "Primitive 07",
    title: "DSR request form",
    body: "Data subject request form — identity verification, request type, scope chips, three-step flow.",
    href: "/ui-primitives/compliance/dsr-request-form",
    accent: "amber",
    glyph: "DSR",
    state: "Stateful · steps",
  },
  {
    kicker: "Primitive 08",
    title: "Retention schedule editor",
    body: "Retention rule editor — category + duration + disposal method + legal hold toggle with live summary.",
    href: "/ui-primitives/compliance/retention-schedule-editor",
    accent: "amber",
    glyph: "⌛",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 09",
    title: "Encryption status",
    body: "Visual indicator — at-rest (AES-256-GCM) + in-transit (TLS 1.3) + key management chip (KMS / HSM).",
    href: "/ui-primitives/compliance/encryption-status-indicator",
    accent: "green",
    glyph: "🔒",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Pentest results card",
    body: "Engagement card — tester, dates, executive summary, findings by severity (critical/high/medium/low) + download CTA.",
    href: "/ui-primitives/compliance/pentest-results-card",
    accent: "red",
    glyph: "PEN",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Vulnerability disclosure",
    body: "Public VDP card — contact email, PGP key + fingerprint, SLA chip, hall of fame, scope in/out lists.",
    href: "/ui-primitives/compliance/vulnerability-disclosure-card",
    accent: "teal",
    glyph: "VDP",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Policy version diff",
    body: "Side-by-side or unified policy diff — added/removed/changed lines highlighted, version chips, effective date.",
    href: "/ui-primitives/compliance/policy-version-diff",
    accent: "amber",
    glyph: "ΔΔ",
    state: "Stateful · view toggle",
  },
  {
    kicker: "Primitive 13",
    title: "Security posture score",
    body: "Big 0-100 score with dial, contributing factor chips (MFA / DLP / EDR) and a 14-day trend sparkline.",
    href: "/ui-primitives/compliance/security-posture-score",
    accent: "green",
    glyph: "88",
    state: "Stateless · meter",
  },
  {
    kicker: "Primitive 14",
    title: "Incident disclosure banner",
    body: "Top-of-app banner — severity chip + status timeline + mitigation update + statuspage link. role=alert.",
    href: "/ui-primitives/compliance/incident-disclosure-banner",
    accent: "red",
    glyph: "SEV",
    state: "Stateless · alert",
  },
  {
    kicker: "Composition",
    title: "Full compliance dashboard",
    body: "Composed dashboard — framework status row, sub-processor table, DPA viewer aside, consent banner, security posture, audit log.",
    href: "/ui-primitives/compliance/full-dashboard",
    accent: "violet",
    glyph: "▦▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<ComplianceScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
  violet: styles.accentViolet,
}

export default function ComplianceIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Compliance / 14 primitives + composition"
        title="Compliance + governance + privacy primitives"
        description="Visual primitives for the Mufflermen compliance + governance + privacy console — modelled against AU-specific obligations (Privacy Act 1988, OAIC Notifiable Data Breach scheme, ASD Essential 8, IRAP) plus the international frameworks the workshop pursues (ISO 27001, SOC 2, GDPR, PCI DSS v4). Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <FormPatternReferences
        ids={["compliance-kyc-consent", "file-upload", "notification-permissions"]}
      />

      <section className={styles.grid} aria-label="Compliance primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
