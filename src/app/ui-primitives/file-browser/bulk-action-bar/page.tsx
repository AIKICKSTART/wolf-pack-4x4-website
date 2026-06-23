import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { BulkActionBarDemo } from "./bulk-action-bar-demo"
import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "Bulk action bar | File Browser",
  description:
    "Primitive 10 — floating bottom bar with count chip, actions row, clear button, and animated entrance.",
}

export default function BulkActionBarScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Bulk bar"
        title="Bulk action bar"
        description="Appears when items are selected. Slides up from the bottom of the viewport, exposes the live count, action chips, and a clear-selection button. Animates in respecting reduced motion."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Bulk action bar" },
        ]}
      />
      <BulkActionBarDemo />
    </main>
  )
}
