import type { Metadata } from "next"

import { FileGridView } from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import { DEMO_FILES } from "../demo-data"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File grid view | File Browser",
  description:
    "Primitive 04 — auto-fill grid wrapper with selection state and multi-select via shift / cmd.",
}

export default function FileGridViewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Grid view"
        title="File grid view"
        description="An auto-fill grid (min 180px) that lays out file cards. Click selects, shift-click selects a range, ⌘ / Ctrl-click toggles. Listbox semantics with aria-multiselectable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Grid view" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <FileGridView
          files={DEMO_FILES}
          defaultSelectedIds={[DEMO_FILES[0].id, DEMO_FILES[4].id]}
        />
      </section>
    </main>
  )
}
