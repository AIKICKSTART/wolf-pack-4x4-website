import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { GlobalSearchBar } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "Global search bar | UI Primitives — Search",
}

export default function GlobalBarPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 01"
        title="Global search bar"
        description="Persistent masthead search input — wider and more permanent than the spotlight command palette. Holds an input, a clear button, a slash-key hint, and tone variants for context-dependent placement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Global search bar" },
        ]}
      />
      <section className={styles.canvas} aria-label="Global search bar demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Always-on masthead search. Operator hits <kbd>/</kbd> to focus, types a query, presses
            Enter to submit. Clear button appears once any text is entered.
          </p>
        </div>

        <div className={styles.stage}>
          <div className={styles.stageGrid}>
            <div className={styles.subStage}>
              <h4>Neutral tone — default</h4>
              <GlobalSearchBar defaultValue="" />
            </div>
            <div className={styles.subStage}>
              <h4>Red tone — escalated workshop search</h4>
              <GlobalSearchBar
                tone="red"
                defaultValue="brake-line recall"
                leadingBadge="Recall"
                placeholder="Search recalls, defect notices…"
              />
            </div>
            <div className={styles.subStage}>
              <h4>Teal tone — diagnostics</h4>
              <GlobalSearchBar
                tone="teal"
                defaultValue=""
                placeholder="Search OBD-II codes, ECU logs…"
              />
            </div>
            <div className={styles.subStage}>
              <h4>Ghost tone — embedded inside a panel</h4>
              <GlobalSearchBar
                tone="ghost"
                defaultValue=""
                placeholder="Search invoices and quotes…"
                showShortcutHint={false}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
