"use client"

import { useId, useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import type { CodeLanguage } from "./dev-experience-types"
import styles from "./tabbed-code-switcher.module.css"

export interface CodeTopic {
  /** Stable key — used for tab identity + aria-controls. */
  key: string
  /** Tab label, e.g. "Initialize". */
  label: string
  /** Code shown in the tab panel. */
  code: string
  /** Language tag passed down to code-block. */
  language: CodeLanguage
  /** Optional file name surfaced on the code-block header. */
  fileName?: string
}

export interface TabbedCodeSwitcherProps {
  /** Topics — at least one required. Order is preserved. */
  topics: ReadonlyArray<CodeTopic>
  /** Default topic key. Defaults to first topic. */
  defaultKey?: string
  /** Optional title. */
  title?: string
  /** Optional className passthrough. */
  className?: string
}

export function TabbedCodeSwitcher({
  topics,
  defaultKey,
  title,
  className,
}: TabbedCodeSwitcherProps) {
  const initial = defaultKey ?? topics[0]?.key ?? ""
  const [active, setActive] = useState<string>(initial)
  const tablistId = useId()
  const current = topics.find((t) => t.key === active) ?? topics[0]
  const classes = [styles.switcher, className].filter(Boolean).join(" ")

  if (!current) {
    return null
  }

  return (
    <section className={classes} aria-label={title ?? "Code topic switcher"}>
      {title ? (
        <header className={styles.head}>
          <span className={styles.kicker}>Walk-through</span>
          <span className={styles.title}>{title}</span>
        </header>
      ) : null}
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="Topic"
        id={tablistId}
      >
        {topics.map((topic) => {
          const selected = topic.key === active
          return (
            <button
              key={topic.key}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tablistId}-${topic.key}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
              onClick={() => setActive(topic.key)}
            >
              {topic.label}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${tablistId}-${current.key}`}
        aria-label={`${current.label} sample`}
        className={styles.panel}
      >
        <CodeBlock
          code={current.code}
          language={current.language}
          fileName={current.fileName}
          showLineNumbers
        />
      </div>
    </section>
  )
}

export default TabbedCodeSwitcher
