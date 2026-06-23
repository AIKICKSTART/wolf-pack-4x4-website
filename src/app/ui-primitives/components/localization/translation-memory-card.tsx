"use client"

import styles from "./translation-memory-card.module.css"
import { isRtlTag } from "./localization-types"

export interface TranslationMemoryHit {
  /** Memory hit string, e.g. a previously translated phrase. */
  value: string
  /** BCP-47 locale of the translation. */
  locale: string
  /** Similarity score 0–100 (100 = exact match). */
  similarity: number
  /** Optional reference label, e.g. "TM:checkout/cta:v3". */
  reference?: string
}

export interface TranslationMemoryCardProps {
  /** The source string the lookup was run against. */
  sourceString: string
  /** Source locale of the source string. */
  sourceLocale: string
  /** Memory hits sorted by relevance — highest similarity first. */
  hits: ReadonlyArray<TranslationMemoryHit>
  /** Click handler for the reuse CTA. */
  onReuse?: (hit: TranslationMemoryHit) => void
}

function bandFor(similarity: number): "high" | "mid" | "low" {
  if (similarity >= 90) return "high"
  if (similarity >= 70) return "mid"
  return "low"
}

export function TranslationMemoryCard({
  sourceString,
  sourceLocale,
  hits,
  onReuse,
}: TranslationMemoryCardProps) {
  return (
    <article className={styles.card} aria-label="Translation memory suggestions">
      <header className={styles.head}>
        <span className={styles.kicker}>Translation memory</span>
        <span className={styles.sourceTag}>{sourceLocale}</span>
        <span className={styles.count}>{hits.length} hits</span>
      </header>

      <blockquote className={styles.source} dir={isRtlTag(sourceLocale) ? "rtl" : "ltr"}>
        {sourceString}
      </blockquote>

      <ol className={styles.list}>
        {hits.map((hit) => {
          const band = bandFor(hit.similarity)
          const rtl = isRtlTag(hit.locale)
          return (
            <li key={`${hit.locale}-${hit.value}`} className={styles.hit}>
              <div className={styles.hitMeta}>
                <span className={styles.hitLocale}>{hit.locale}</span>
                <span className={styles.similarity} data-band={band}>
                  {hit.similarity}%
                </span>
                {hit.reference ? (
                  <code className={styles.reference}>{hit.reference}</code>
                ) : null}
              </div>
              <p className={styles.hitValue} dir={rtl ? "rtl" : "ltr"}>
                {hit.value}
              </p>
              <button
                type="button"
                className={styles.cta}
                onClick={() => onReuse?.(hit)}
              >
                Reuse <span aria-hidden="true">→</span>
              </button>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default TranslationMemoryCard
