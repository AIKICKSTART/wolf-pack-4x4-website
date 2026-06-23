import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { DocDownloadRowsDemo } from "../_interactive-demos"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Doc download row | Customer portal",
  description:
    "Primitive 07 — document download row for receipts, pink-slips, dyno charts — three states.",
}

export default function DocDownloadRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Doc download row"
        title="Document download row"
        description="Interactive (clickable download for the latest tax invoice + dyno chart), static (visual reference for receipt + pink-slip), and the warranty + manual variants."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Doc download row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <DocDownloadRowsDemo />
      </section>
    </main>
  )
}
