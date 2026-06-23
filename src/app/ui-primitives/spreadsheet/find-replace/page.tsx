import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FindReplaceBar } from "../../components/spreadsheet"
import styles from "../spreadsheet.module.css"

export const metadata: Metadata = {
  title: "Find / replace bar | UI Primitives — Spreadsheet",
}

export default function FindReplacePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Spreadsheet · 10"
        title="Find / replace bar"
        description="Slide-in find and replace bar with case-sensitive toggle, scope cycler, and bulk replace actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Spreadsheet", href: "/ui-primitives/spreadsheet" },
          { label: "Find / replace" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>Open — sheet scope, case-insensitive</span>
          <FindReplaceBar
            initialFind="Magnaflow"
            initialReplace="MagnaFlow"
            initialScope="sheet"
            resultsCount={28}
          />
          <span className={styles.demoLabel}>Open — workbook scope, case-sensitive</span>
          <FindReplaceBar
            initialFind="OF-1"
            initialReplace="OF-2"
            initialScope="workbook"
            initialCaseSensitive
            resultsCount={146}
          />
          <span className={styles.demoLabel}>Open — selection scope, empty replace</span>
          <FindReplaceBar
            initialFind="A$"
            initialReplace=""
            initialScope="selection"
            resultsCount={0}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Closed state slides out with reduced-motion respect. The scope chip cycles{" "}
            <code>Sheet → Workbook → Selection</code> on click. Replace fires per-occurrence;
            Replace all fires once for the whole scope.
          </p>
        </div>
      </section>
    </main>
  )
}
