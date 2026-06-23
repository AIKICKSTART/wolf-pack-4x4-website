import type { ReactNode } from "react"

import { CodeBlock } from "../primitives/code-block"

import styles from "./code-playground.module.css"

interface CodePlaygroundProps {
  title: string
  description?: string
  code: string
  language?: string
  fileName?: string
  preview: ReactNode
  openInLabel?: string
  openInHref?: string
}

export function CodePlayground({
  title,
  description,
  code,
  language = "tsx",
  fileName,
  preview,
  openInLabel = "Open in StackBlitz",
  openInHref = "#",
}: CodePlaygroundProps) {
  return (
    <section className={styles.playground} aria-labelledby="playground-title">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Live playground</span>
          <h3 id="playground-title" className={styles.title}>
            {title}
          </h3>
          {description && <p className={styles.body}>{description}</p>}
        </div>
        <a className={styles.openIn} href={openInHref}>
          <span aria-hidden="true">↗</span>
          {openInLabel}
        </a>
      </header>

      <div className={styles.panes}>
        <div className={styles.editor} aria-label="Source code">
          <span className={styles.paneLabel}>Source</span>
          <CodeBlock code={code} language={language} fileName={fileName} showLineNumbers />
        </div>
        <div className={styles.preview} aria-label="Preview">
          <span className={styles.paneLabel}>Preview</span>
          <div className={styles.previewBody}>{preview}</div>
        </div>
      </div>
    </section>
  )
}

export default CodePlayground
