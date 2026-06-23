import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ChangelogEntryCard } from "../../components/api-explorer"
import { CHANGELOG_ENTRIES } from "../_mock-data"

import styles from "../api-explorer.module.css"

export const metadata: Metadata = {
  title: "Changelog entry card | API Explorer",
  description:
    "Primitive 12 — versioned changelog entry. Three states: minor release, breaking change, point release.",
}

const [V1_4, V1_3, V1_2] = CHANGELOG_ENTRIES

export default function ChangelogEntryCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Changelog entry card"
        title="Changelog entry cards"
        description="Versioned changelog cards with a breaking-change badge variant. Compose multiple in date-descending order to render a docs changelog."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API explorer", href: "/ui-primitives/api-explorer" },
          { label: "Changelog entry card" },
        ]}
      />

      <section className={styles.routeSection} aria-label="Minor release">
        <span className={styles.sectionLabel}>State 01 / Minor release</span>
        <ChangelogEntryCard {...V1_4} />
      </section>

      <section className={styles.routeSection} aria-label="Breaking change">
        <span className={styles.sectionLabel}>State 02 / Breaking change</span>
        <ChangelogEntryCard {...V1_3} />
      </section>

      <section className={styles.routeSection} aria-label="Point release">
        <span className={styles.sectionLabel}>State 03 / Point release</span>
        <ChangelogEntryCard {...V1_2} />
      </section>

      <section className={styles.routeSection} aria-label="Full timeline">
        <span className={styles.sectionLabel}>Bonus / Full release timeline</span>
        <div className={styles.stack}>
          {CHANGELOG_ENTRIES.map((entry) => (
            <ChangelogEntryCard key={entry.version} {...entry} />
          ))}
        </div>
      </section>
    </main>
  )
}
