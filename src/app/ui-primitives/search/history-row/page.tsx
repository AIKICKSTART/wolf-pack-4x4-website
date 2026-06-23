import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../search.module.css"

import { HistoryRowDemo } from "./history-row-demo"

export const metadata: Metadata = {
  title: "History row | UI Primitives — Search",
}

export default function HistoryRowPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 04"
        title="History row"
        description="A single search-history entry. Click the body to re-run the query; click the trash icon to remove it. Timestamps use the semantic time element."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "History row" },
        ]}
      />
      <section className={styles.canvas} aria-label="History row demo">
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Stack as many rows as fit. The remove button stops propagation so the recall click and
            the dismiss click are independent.
          </p>
        </div>
        <HistoryRowDemo />
      </section>
    </main>
  )
}
