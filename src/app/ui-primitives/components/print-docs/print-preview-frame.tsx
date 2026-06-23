"use client"

import type { ReactNode } from "react"

import styles from "./print-preview-frame.module.css"

interface PrintPreviewFrameProps {
  documentId: string
  documentLabel: string
  format: "A4" | "Letter" | "Receipt"
  pages?: number
  children: ReactNode
}

export function PrintPreviewFrame({
  documentId,
  documentLabel,
  format,
  pages = 1,
  children,
}: PrintPreviewFrameProps) {
  function handlePrint(): void {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <section className={styles.frame} aria-label={`Print preview — ${documentLabel}`}>
      <header className={styles.toolbar}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Document</span>
          <strong className={styles.docId}>{documentId}</strong>
          <span className={styles.docLabel}>{documentLabel}</span>
        </div>
        <dl className={styles.meta}>
          <div>
            <dt>Format</dt>
            <dd>{format}</dd>
          </div>
          <div>
            <dt>Pages</dt>
            <dd>{pages}</dd>
          </div>
        </dl>
        <button
          type="button"
          className={styles.printBtn}
          onClick={handlePrint}
          aria-label="Open browser print dialog"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M4 3h8v3H4zM3 6h10a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1v2H4v-2H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm2 5h6v2H5z"
              fill="currentColor"
            />
          </svg>
          Print
        </button>
      </header>
      <div className={styles.ruler} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className={styles.stage}>
        <div className={styles.paper}>{children}</div>
      </div>
      <footer className={styles.statusBar}>
        <span className={styles.statusDot} aria-hidden="true" />
        <span>Live preview · {format}</span>
        <span className={styles.statusRight}>Press the print button to open the browser dialog</span>
      </footer>
    </section>
  )
}

export default PrintPreviewFrame
