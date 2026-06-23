import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DataTableShowcase } from "./data-table-showcase"
import styles from "../sub-route.module.css"

export const metadata: Metadata = {
  title: "Data table | UI Primitives — Data display",
}

export default function DataTableShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="09.01 / Data display"
        title="Data table - workshop operations"
        description="Controlled table showcase for the Oak Flats job queue: search, status chips, density controls, selectable rows, status badges, progress cells, and empty/loading/fault examples."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data display", href: "/ui-primitives/data-display" },
          { label: "Data table" },
        ]}
      />
      <DataTableShowcase />
    </main>
  )
}
