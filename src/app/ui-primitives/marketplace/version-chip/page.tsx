import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VersionChip } from "../../components/marketplace/version-chip"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Version chip | Marketplace | UI Primitives",
  description: "Version chip with semver number, release date, and optional changelog popover trigger.",
}

interface VersionEntry {
  version: string
  releaseDate: string
  changelog?: string
}

const VERSIONS: ReadonlyArray<VersionEntry> = [
  {
    version: "5.4.2",
    releaseDate: "21 May 2026",
    changelog:
      "Apple Pay support on the workshop quote tablet. Faster Afterpay redirect with fewer drop-offs at the consent screen.",
  },
  {
    version: "3.12.0",
    releaseDate: "18 May 2026",
    changelog:
      "Sender ID resolution fixed for the Shellharbour bay. Opt-out keyword list expanded with workshop-specific terms.",
  },
  {
    version: "0.9.4",
    releaseDate: "26 May 2026",
  },
  {
    version: "1.3.0",
    releaseDate: "27 May 2026",
    changelog:
      "Adds cross-posting to Mufflerpulse audio show notes. Redacts customer PII before publish to the public site.",
  },
]

export default function VersionChipShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.8 / Version chip"
        title="Version chip"
        description="Semver chip with release date and a changelog popover trigger — clickable to reveal the release notes inline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Version chip" },
        ]}
      />

      <section className={styles.section} aria-labelledby="version-chip-row">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Chips</span>
          <h2 id="version-chip-row" className={styles.sectionTitle}>
            Four current versions
          </h2>
          <p className={styles.sectionLead}>
            Chips with a changelog expose a popover trigger; chips without one stay as a static stamp.
          </p>
        </header>
        <div className={styles.chipRow}>
          {VERSIONS.map((entry) => (
            <VersionChip
              key={entry.version}
              version={entry.version}
              releaseDate={entry.releaseDate}
              changelog={entry.changelog}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
