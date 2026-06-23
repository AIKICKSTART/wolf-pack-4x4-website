"use client"

import { useState } from "react"

import { CodeBlock } from "../primitives/code-block"
import {
  SAMPLE_LANGUAGE_LABEL,
  type SampleLanguage,
} from "./api-explorer-types"

import styles from "./code-sample-tabs.module.css"

export type CodeSamples = Partial<Record<SampleLanguage, string>>

interface CodeSampleTabsProps {
  samples: CodeSamples
  /** Override the initial language. Falls back to the first available sample. */
  defaultLanguage?: SampleLanguage
  /** Heading text rendered above the tab strip. */
  heading?: string
  /** When true, the tab strip is hidden — useful for tightly packed contexts. */
  compact?: boolean
  className?: string
}

const DEFAULT_ORDER: ReadonlyArray<SampleLanguage> = ["curl", "javascript", "python", "php"]

function pickInitial(samples: CodeSamples, preferred?: SampleLanguage): SampleLanguage {
  if (preferred && samples[preferred]) {
    return preferred
  }
  for (const lang of DEFAULT_ORDER) {
    if (samples[lang]) {
      return lang
    }
  }
  return "curl"
}

function languageMarker(language: SampleLanguage): string {
  switch (language) {
    case "javascript":
      return "js"
    case "python":
      return "py"
    case "php":
      return "php"
    case "curl":
    default:
      return "bash"
  }
}

export function CodeSampleTabs({
  samples,
  defaultLanguage,
  heading,
  compact = false,
  className,
}: CodeSampleTabsProps) {
  const available = DEFAULT_ORDER.filter((lang) => samples[lang] !== undefined)
  const [active, setActive] = useState<SampleLanguage>(pickInitial(samples, defaultLanguage))
  const sample = samples[active] ?? ""
  const classes = [styles.tabs, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading ?? "Code samples"}>
      {(heading || !compact) && (
        <header className={styles.head}>
          {heading && <span className={styles.kicker}>{heading}</span>}
          {!compact && (
            <div className={styles.strip} role="tablist" aria-label="Code sample languages">
              {available.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  role="tab"
                  aria-selected={lang === active}
                  className={`${styles.tab} ${lang === active ? styles.tabActive : ""}`}
                  onClick={() => setActive(lang)}
                >
                  {SAMPLE_LANGUAGE_LABEL[lang]}
                </button>
              ))}
            </div>
          )}
        </header>
      )}
      <CodeBlock
        code={sample}
        language={languageMarker(active)}
        showLineNumbers={false}
        maxHeight={260}
        fileName={`example.${languageMarker(active)}`}
      />
    </section>
  )
}

export default CodeSampleTabs
