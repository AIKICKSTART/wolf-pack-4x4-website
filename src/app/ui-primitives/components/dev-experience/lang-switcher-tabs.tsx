"use client"

import { useId, useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import {
  CODE_LANGUAGE_LABEL,
  type CodeLanguage,
} from "./dev-experience-types"
import styles from "./lang-switcher-tabs.module.css"

export interface LangSample {
  language: CodeLanguage
  code: string
  fileName?: string
}

export interface LangSwitcherTabsProps {
  /** Samples — one per language. Order is preserved in the tab list. */
  samples: ReadonlyArray<LangSample>
  /** Optional default language; defaults to first sample. */
  defaultLanguage?: CodeLanguage
  /** Optional title shown above the tab list. */
  title?: string
  /** Optional className passthrough. */
  className?: string
}

export function LangSwitcherTabs({
  samples,
  defaultLanguage,
  title,
  className,
}: LangSwitcherTabsProps) {
  const first = samples[0]?.language ?? "typescript"
  const initial = defaultLanguage ?? first
  const [active, setActive] = useState<CodeLanguage>(initial)
  const tablistId = useId()
  const current = samples.find((s) => s.language === active) ?? samples[0]
  const classes = [styles.switcher, className].filter(Boolean).join(" ")

  if (!current) {
    return null
  }

  return (
    <section className={classes} aria-label={title ?? "Code sample switcher"}>
      {title ? (
        <header className={styles.head}>
          <span className={styles.kicker}>Code sample</span>
          <span className={styles.title}>{title}</span>
        </header>
      ) : null}
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="Language"
        id={tablistId}
      >
        {samples.map((sample) => {
          const selected = sample.language === active
          return (
            <button
              key={sample.language}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tablistId}-panel`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
              onClick={() => setActive(sample.language)}
            >
              {CODE_LANGUAGE_LABEL[sample.language]}
            </button>
          )
        })}
      </div>
      <div
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-label={`${CODE_LANGUAGE_LABEL[current.language]} sample`}
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

export default LangSwitcherTabs
