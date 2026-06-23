"use client"

import { useState } from "react"

import type { FormBuilderPage } from "./form-builder-types"
import styles from "./multi-page-form-wizard.module.css"

interface MultiPageFormWizardProps {
  pages: ReadonlyArray<FormBuilderPage>
  /** Id of the initially active page — defaults to the first page. */
  initialPageId?: string
  className?: string
}

export function MultiPageFormWizard({
  pages,
  initialPageId,
  className,
}: MultiPageFormWizardProps) {
  const initial = initialPageId ?? pages[0]?.id ?? ""
  const [active, setActive] = useState<string>(initial)

  const classes = [styles.wizard, className].filter(Boolean).join(" ")
  const totalFields = pages.reduce((sum, page) => sum + page.fieldCount, 0)

  return (
    <section className={classes} aria-label="Form page wizard">
      <header className={styles.head}>
        <span className={styles.kicker}>Pages</span>
        <div className={styles.headRow}>
          <h3 className={styles.title}>Multi-page form</h3>
          <span className={styles.summary}>
            {pages.length} pages · {totalFields} fields total
          </span>
        </div>
      </header>

      <nav className={styles.tabs} aria-label="Form pages" role="tablist">
        {pages.map((page, index) => {
          const isActive = page.id === active
          return (
            <button
              key={page.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[styles.tab, isActive ? styles.tabActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActive(page.id)}
            >
              <span className={styles.tabIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.tabBody}>
                <span className={styles.tabName}>{page.title}</span>
                <span className={styles.tabCount}>
                  {page.fieldCount} {page.fieldCount === 1 ? "field" : "fields"}
                </span>
              </span>
            </button>
          )
        })}
        <button type="button" className={styles.addTab}>
          <span aria-hidden="true">+</span> Page
        </button>
      </nav>

      <footer className={styles.actions}>
        <button type="button" className={styles.actionBtn}>
          Reorder pages
        </button>
        <button type="button" className={styles.actionBtn}>
          Duplicate active
        </button>
        <button type="button" className={styles.actionPrimary}>
          Preview from here
        </button>
      </footer>
    </section>
  )
}
