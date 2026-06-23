import type { Metadata } from "next"

import { FileListView } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_FILES } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File list view | File Browser",
  description:
    "Primitive 05 — table-style list view with sortable headers using aria-sort.",
}

export default function FileListViewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / List view"
        title="File list view"
        description="Semantic table wrapper rendering file rows. Sortable headers expose aria-sort, an icon shows the current direction, and rows highlight on focus."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "List view" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <FileListView
          files={DEMO_FILES}
          defaultSelectedIds={[DEMO_FILES[0].id]}
          caption="Workshop assets"
        />
      </section>
    </main>
  )
}
