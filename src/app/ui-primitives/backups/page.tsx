import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./backups.module.css"

export const metadata: Metadata = {
  title: "Backups | UI Primitives",
  description:
    "Generic backup + snapshot management primitives — schedule cards, snapshot rows, restore wizard, size charts, retention editor, encryption indicators, verification, PITR slider, destinations, kind + compression chips, restore progress, integrity checks, and cold archive cards.",
}

interface BackupScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<BackupScene> = [
  {
    kicker: "Primitive 01",
    title: "Backup schedule card",
    body: "Schedule card with frequency chip, cron, next-run countdown, last-run status, enabled toggle and retention chip.",
    href: "/ui-primitives/backups/backup-schedule-card",
    accent: "teal",
    glyph: "▦",
    state: "Live countdown",
  },
  {
    kicker: "Primitive 02",
    title: "Snapshot list row",
    body: "Semantic table row — id, timestamp, size, duration, status chip, restore + delete actions.",
    href: "/ui-primitives/backups/snapshot-list-row",
    accent: "neutral",
    glyph: "≣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Restore wizard",
    body: "4-step wizard: choose snapshot → choose target → review impact → confirm. Progress stepper at top.",
    href: "/ui-primitives/backups/restore-wizard",
    accent: "amber",
    glyph: "1·2·3·4",
    state: "Wizard state",
  },
  {
    kicker: "Primitive 04",
    title: "Backup size chart",
    body: "Stacked area chart — daily full / differential / incremental bytes with retention horizon + growth projection.",
    href: "/ui-primitives/backups/backup-size-chart",
    accent: "red",
    glyph: "▲",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Retention policy editor",
    body: "Keep-last-N rules for daily / weekly / monthly / yearly plus tier-mover toggle.",
    href: "/ui-primitives/backups/retention-policy-editor",
    accent: "amber",
    glyph: "N×",
    state: "Local form state",
  },
  {
    kicker: "Primitive 06",
    title: "Encryption at rest",
    body: "Algorithm chip + key source chip + last-rotated timestamp with shield glyph.",
    href: "/ui-primitives/backups/encryption-at-rest-indicator",
    accent: "teal",
    glyph: "AES",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Verification result",
    body: "Checksum pass/fail, restore-test pass/fail, last-verified time, manual verify-now CTA.",
    href: "/ui-primitives/backups/backup-verification-result",
    accent: "green",
    glyph: "✓✗",
    state: "Stateless",
  },
  {
    kicker: "Primitive 08",
    title: "PITR slider",
    body: "Point-in-time recovery slider on a continuous time axis with selected timestamp chip + lag warning.",
    href: "/ui-primitives/backups/point-in-time-recovery-slider",
    accent: "amber",
    glyph: "◷",
    state: "Slider state",
  },
  {
    kicker: "Primitive 09",
    title: "Backup destination card",
    body: "Provider glyph + bucket / path + region + redundancy chip + transfer-rate chip.",
    href: "/ui-primitives/backups/backup-destination-card",
    accent: "teal",
    glyph: "s3",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Compressed size badge",
    body: "Tiny badge showing raw → compressed bytes with savings ratio.",
    href: "/ui-primitives/backups/compressed-size-badge",
    accent: "green",
    glyph: "−68%",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Backup kind chip",
    body: "Kind chip with tone variants — Full / Differential / Incremental / Log-only.",
    href: "/ui-primitives/backups/backup-kind-chip",
    accent: "red",
    glyph: "F D I L",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Restore progress status",
    body: "In-progress restore — rows / total + ETA + throughput chip + pause/resume CTA.",
    href: "/ui-primitives/backups/restore-progress-status",
    accent: "teal",
    glyph: "↻",
    state: "Progress",
  },
  {
    kicker: "Primitive 13",
    title: "Integrity check",
    body: "Scan progress + per-snapshot pass/fail rows with remediate CTA on failure.",
    href: "/ui-primitives/backups/backup-integrity-check",
    accent: "red",
    glyph: "✓/✗",
    state: "Alert region",
  },
  {
    kicker: "Primitive 14",
    title: "Cold storage archive",
    body: "Cold archive card — id, tier chip (Glacier / Deep / Archive Tier), retrieval-time estimate, thaw CTA.",
    href: "/ui-primitives/backups/cold-storage-archive-card",
    accent: "violet",
    glyph: "❅",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full console",
    body: "Schedule + snapshot list + retention editor + size chart + verification + PITR slider + destinations grid.",
    href: "/ui-primitives/backups/full-console",
    accent: "red",
    glyph: "▦↻",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<BackupScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function BackupsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Backups / 14 primitives + composition"
        title="Backup & snapshot management primitives"
        description="Generic backup, snapshot and restore primitives — schedules, snapshots, retention, encryption, verification, PITR, destinations and integrity checks. Modelled against Mufflermen production data (Quote DB, Parts catalogue, CMS media, Workshop scheduler)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no live snapshot pipeline wired
      </span>

      <section className={styles.grid} aria-label="Backup primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
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
