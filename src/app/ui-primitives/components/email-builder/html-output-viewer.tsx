"use client"

import { useState } from "react"

import { CodeBlock } from "../primitives/code-block"

import type { HtmlOutputTab } from "./email-builder-types"
import styles from "./html-output-viewer.module.css"

interface HtmlOutputViewerProps {
  /** Raw HTML output. */
  html: string
  /** CSS-inlined version e.g. ready-to-send markup. */
  inlinedCss: string
  /** Plain-text fallback. */
  plainText: string
  /** Initial active tab. Defaults to "html". */
  defaultTab?: HtmlOutputTab
  className?: string
}

const TABS: ReadonlyArray<{ id: HtmlOutputTab; label: string; lang: string; file: string }> = [
  { id: "html", label: "HTML", lang: "html", file: "winter-newsletter.html" },
  { id: "inlined-css", label: "Inlined CSS", lang: "html", file: "winter-newsletter.inlined.html" },
  { id: "plain-text", label: "Plain text", lang: "text", file: "winter-newsletter.txt" },
]

export function HtmlOutputViewer({
  html,
  inlinedCss,
  plainText,
  defaultTab = "html",
  className,
}: HtmlOutputViewerProps) {
  const [tab, setTab] = useState<HtmlOutputTab>(defaultTab)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const value =
    tab === "html" ? html : tab === "inlined-css" ? inlinedCss : plainText
  const meta = TABS.find((entry) => entry.id === tab) ?? TABS[0]

  return (
    <section className={classes} aria-label="HTML output viewer">
      <header className={styles.head}>
        <span className={styles.kicker}>HTML output</span>
        <h3 className={styles.title}>Live source</h3>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Output format">
        {TABS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={tab === entry.id}
            className={[styles.tab, tab === entry.id ? styles.tabOn : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setTab(entry.id)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className={styles.codeWrap}>
        <CodeBlock
          code={value}
          language={meta.lang}
          fileName={meta.file}
          maxHeight={320}
        />
      </div>
    </section>
  )
}
