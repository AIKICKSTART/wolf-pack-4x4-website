"use client"

import { ArrowRight, BookOpen } from "lucide-react"

import { Chip } from "../primitives/chip"

import styles from "./kb-snippet-suggester.module.css"

export interface KbSnippet {
  id: string
  /** Article title. */
  title: string
  /** Knowledge base category caption. */
  category: string
  /** Estimated read time in minutes. */
  readMinutes: number
  /** Short preview rendered below the title. */
  preview: string
  /** Match score 0..1. */
  matchScore: number
  /** Optional href for "Open article". */
  href?: string
}

interface KbSnippetSuggesterProps {
  /** Suggested article list, already ranked. */
  snippets: ReadonlyArray<KbSnippet>
  /** Short context the suggestions are built from. */
  contextLabel?: string
  /** Triggered when the operator inserts the snippet into the composer. */
  onInsert?: (snippet: KbSnippet) => void
  className?: string
}

function scorePercent(score: number): number {
  return Math.round(Math.max(0, Math.min(1, score)) * 100)
}

export function KbSnippetSuggester({
  snippets,
  contextLabel = "Matching this chat",
  onInsert,
  className,
}: KbSnippetSuggesterProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label="Knowledge base snippet suggestions"
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>KB suggester</span>
          <h3 className={styles.title}>Insert an article</h3>
        </div>
        <span className={styles.context}>{contextLabel}</span>
      </header>

      <ul className={styles.list}>
        {snippets.map((snippet) => {
          const percent = scorePercent(snippet.matchScore)
          const tone =
            percent >= 80 ? "green" : percent >= 60 ? "teal" : "neutral"
          return (
            <li key={snippet.id} className={styles.item}>
              <div className={styles.row}>
                <span className={styles.itemTitle}>{snippet.title}</span>
                <Chip label={`${percent}% match`} tone={tone} />
              </div>
              <div className={styles.itemMeta}>
                <BookOpen size={11} strokeWidth={2.4} aria-hidden="true" />
                <span>{snippet.category}</span>
                <span aria-hidden="true">·</span>
                <span>{snippet.readMinutes} min read</span>
              </div>
              <p className={styles.itemSummary}>{snippet.preview}</p>
              <div className={styles.itemActions}>
                <button
                  type="button"
                  className={[styles.actionBtn, styles.actionPrimary].join(" ")}
                  onClick={() => onInsert?.(snippet)}
                  aria-label={`Insert ${snippet.title} into reply`}
                >
                  Insert in reply
                </button>
                {snippet.href ? (
                  <a
                    href={snippet.href}
                    className={styles.actionBtn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Open article</span>
                    <ArrowRight size={11} strokeWidth={2.4} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default KbSnippetSuggester
