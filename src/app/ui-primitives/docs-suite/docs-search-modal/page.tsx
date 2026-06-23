"use client"

import { useState } from "react"

import { DocsSearchModal } from "../../components/docs-suite"
import { PageHeader } from "../../components/page-header"
import { DOCS_SEARCH_GROUPS } from "../docs-suite-fixtures"
import styles from "../docs-suite.module.css"

export default function DocsSearchModalPage() {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Docs Suite · 05"
        title="Docs search modal"
        description="Cmd+K command palette grouped by Operator Manual, Trade Account API, Playbook, and recent History. Keyboard-navigable end to end — arrow keys move, Enter opens, Escape closes."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Docs Suite", href: "/ui-primitives/docs-suite" },
          { label: "Docs search modal" },
        ]}
      />
      <section className={styles.canvas} aria-label="Docs search modal demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Cmd+K from anywhere in the docs platform. The history group surfaces what the user
            opened last so repeat lookups are one keystroke.
          </p>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageRow}>
            <span className={styles.stageHelp}>Modal is {open ? "open" : "closed"}</span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={styles.stageHelp}
              style={{
                appearance: "none",
                cursor: "pointer",
                background: "var(--primitive-btn-secondary-bg)",
                border: "1px solid var(--primitive-btn-secondary-border)",
                color: "var(--primitive-btn-secondary-fg)",
                padding: "var(--primitive-space-2) 14px",
                borderRadius: "var(--primitive-btn-radius)",
              }}
            >
              Re-open palette
            </button>
          </div>
        </div>
        <DocsSearchModal
          open={open}
          groups={DOCS_SEARCH_GROUPS}
          onClose={() => setOpen(false)}
        />
      </section>
    </main>
  )
}
