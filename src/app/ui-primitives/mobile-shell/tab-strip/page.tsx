import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { TabStripDemo } from "./tab-strip-demo"

export const metadata: Metadata = {
  title: "Tab indicator strip | UI Primitives — Mobile Shell",
}

export default function TabStripPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 04"
        title="Tab indicator strip"
        description="Horizontally scrollable topical tabs with a sliding gradient underline. Counts in the chip, ARIA tab semantics, keyboard focus respected."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Tab strip" },
        ]}
      />
      <section className={styles.canvas} aria-label="Tab strip demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Lives below the top app bar on the Jobs screen. Faster than reaching for a filter sheet
            when you only need to swap status views.
          </p>
        </div>
        <TabStripDemo />
      </section>
    </main>
  )
}
