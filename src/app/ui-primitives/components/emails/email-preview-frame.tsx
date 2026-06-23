"use client"

import { useId, useState } from "react"
import type { ReactElement } from "react"

import styles from "./email-preview-frame.module.css"

export interface EmailPreviewMeta {
  from: string
  to: string
  subject: string
}

export interface EmailPreviewFrameProps {
  meta: EmailPreviewMeta
  /**
   * The email template element. Must be a renderable React element so the
   * frame can mount it inside the preview chrome without loading server-only
   * rendering utilities into the client bundle.
   */
  email: ReactElement
}

type Theme = "light" | "dark"

export function EmailPreviewFrame({ meta, email }: EmailPreviewFrameProps) {
  const [theme, setTheme] = useState<Theme>("light")
  const [showSource, setShowSource] = useState(false)
  const sourceId = useId()

  return (
    <section className={styles.frame} aria-label={`Preview · ${meta.subject}`}>
      <header className={styles.bar}>
        <div className={styles.meta}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>From</span>
            <span className={styles.metaValue}>{meta.from}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>To</span>
            <span className={styles.metaValue}>{meta.to}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>Subject</span>
            <span className={styles.metaValue}>{meta.subject}</span>
          </div>
        </div>
        <div className={styles.controls}>
          <div
            className={styles.toggleGroup}
            role="group"
            aria-label="Preview background"
          >
            <button
              type="button"
              className={styles.toggleButton}
              aria-pressed={theme === "light"}
              aria-label="Use light email preview background"
              onClick={() => setTheme("light")}
            >
              Light
            </button>
            <button
              type="button"
              className={styles.toggleButton}
              aria-pressed={theme === "dark"}
              aria-label="Use dark email preview background"
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
          </div>
          <button
            type="button"
            className={styles.sourceButton}
            aria-expanded={showSource}
            aria-controls={sourceId}
            onClick={() => setShowSource((prev) => !prev)}
          >
            {showSource ? "Hide source" : "View source"}
          </button>
        </div>
      </header>

      <div
        className={[styles.canvas, theme === "dark" ? styles.canvasDark : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={`${styles.canvasInner} ${styles.previewBody}`}>
          {email}
        </div>
      </div>

      {showSource ? (
        <pre id={sourceId} className={styles.source}>
          {`Template source is kept in src/app/ui-primitives/components/emails.
The live preview above renders the same React email primitive without importing react-dom/server into the client bundle.`}
        </pre>
      ) : null}
    </section>
  )
}
