import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RecentlyUpdatedRow } from "../../components/marketplace/recently-updated-row"
import { RECENTLY_UPDATED } from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Recently updated row | Marketplace | UI Primitives",
  description:
    "Row of plugins recently updated — logo, name, version chip, release date, and changelog excerpt.",
}

export default function RecentlyUpdatedRowShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.13 / Recently updated"
        title="Recently updated row"
        description="Compact release-list primitive used on the marketplace home page — every row carries an embedded VersionChip for inline changelog access."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Recently updated row" },
        ]}
      />

      <section className={styles.section} aria-labelledby="recently-updated-row-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Recent releases</span>
          <h2 id="recently-updated-row-demo" className={styles.sectionTitle}>
            Five releases — last fortnight
          </h2>
        </header>
        <RecentlyUpdatedRow items={RECENTLY_UPDATED} />
      </section>
    </main>
  )
}
