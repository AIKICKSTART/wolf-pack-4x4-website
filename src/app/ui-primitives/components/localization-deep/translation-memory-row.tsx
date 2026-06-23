"use client"

import { ProgressLinear } from "../primitives/progress-linear"
import { isRtlTag } from "../localization/localization-types"

import styles from "./translation-memory-row.module.css"

export interface TranslationMemoryRowProps {
  /** Source locale tag. */
  sourceLocale: string
  /** Target locale tag. */
  targetLocale: string
  /** Source text of the TM hit. */
  source: string
  /** Cached target translation. */
  target: string
  /** Fuzzy match score 0–1. 1.0 = exact match. */
  score: number
  /** Optional context note from where the TM hit was originally translated. */
  context?: string
  /** Optional reviewer or translator credited with the original translation. */
  contributor?: string
  /** Optional reuse handler. */
  onReuse?: () => void
}

function toneFor(score: number): "green" | "amber" | "teal" | "red" {
  if (score >= 0.99) return "green"
  if (score >= 0.85) return "teal"
  if (score >= 0.7) return "amber"
  return "red"
}

function scoreLabel(score: number): string {
  if (score >= 0.99) return "Exact"
  if (score >= 0.85) return "High"
  if (score >= 0.7) return "Fuzzy"
  return "Low"
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

export function TranslationMemoryRow({
  sourceLocale,
  targetLocale,
  source,
  target,
  score,
  context,
  contributor,
  onReuse,
}: TranslationMemoryRowProps) {
  const tone = toneFor(score)
  const sourceDir = isRtlTag(sourceLocale) ? "rtl" : "ltr"
  const targetDir = isRtlTag(targetLocale) ? "rtl" : "ltr"

  return (
    <article
      className={styles.row}
      data-tone={tone}
      aria-label={`Translation memory hit — ${scoreLabel(score)} match`}
    >
      <div className={styles.scoreCell}>
        <div className={styles.scoreNumber} data-tone={tone}>
          {formatPercent(score)}
        </div>
        <div className={styles.scoreLabel} data-tone={tone}>
          {scoreLabel(score)}
        </div>
        <ProgressLinear
          value={Math.round(score * 100)}
          max={100}
          tone={tone}
          variant="segmented"
          segments={10}
          label="TM score"
        />
      </div>

      <div className={styles.body}>
        <div className={styles.snippet}>
          <span className={styles.snippetTag}>{sourceLocale}</span>
          <p className={styles.snippetValue} dir={sourceDir}>
            {source}
          </p>
        </div>
        <div className={styles.snippet}>
          <span className={styles.snippetTag} data-target="true">
            {targetLocale}
          </span>
          <p className={styles.snippetValue} dir={targetDir}>
            {target}
          </p>
        </div>

        {context || contributor ? (
          <div className={styles.metaRow}>
            {context ? (
              <span className={styles.metaItem}>
                <span className={styles.metaKey}>Context</span>
                <span className={styles.metaValue}>{context}</span>
              </span>
            ) : null}
            {contributor ? (
              <span className={styles.metaItem}>
                <span className={styles.metaKey}>By</span>
                <span className={styles.metaValue}>{contributor}</span>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.reuse} onClick={onReuse}>
          Reuse
        </button>
      </div>
    </article>
  )
}

export default TranslationMemoryRow
