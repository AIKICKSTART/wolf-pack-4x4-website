"use client"

import styles from "./linked-articles-suggester.module.css"

export interface LinkedArticleSuggestion {
  id: string
  title: string
  /** Source collection, e.g. "Booking FAQs", "Warranty policy". */
  category?: string
  /** Match-score 0..100. */
  matchScore: number
  /** href to the article in the knowledge base. */
  href: string
}

export interface LinkedArticlesSuggesterProps {
  ticketSubject?: string
  suggestions: ReadonlyArray<LinkedArticleSuggestion>
  /** Triggered when "Open in side-pane" is clicked. Receives the article id. */
  onOpenInSidePane?: (id: string) => void
  className?: string
}

function scoreTone(score: number): "green" | "amber" | "neutral" {
  if (score >= 80) return "green"
  if (score >= 60) return "amber"
  return "neutral"
}

const TONE_CLASS: Record<"green" | "amber" | "neutral", string> = {
  green: "toneGreen",
  amber: "toneAmber",
  neutral: "toneNeutral",
}

export function LinkedArticlesSuggester({
  ticketSubject,
  suggestions,
  onOpenInSidePane,
  className,
}: LinkedArticlesSuggesterProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      aria-label={
        ticketSubject
          ? `Suggested articles related to ${ticketSubject}`
          : "Suggested articles"
      }
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Knowledge base</span>
        <h3 className={styles.title}>Suggested articles</h3>
        {ticketSubject ? (
          <p className={styles.subtitle}>For: {ticketSubject}</p>
        ) : null}
      </header>

      <ol className={styles.list}>
        {suggestions.map((article) => {
          const tone = scoreTone(article.matchScore)
          const toneKey = TONE_CLASS[tone] as keyof typeof styles
          return (
            <li key={article.id} className={styles.item}>
              <div className={styles.itemBody}>
                <a
                  href={article.href}
                  className={styles.articleLink}
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
                {article.category ? (
                  <p className={styles.category}>{article.category}</p>
                ) : null}
              </div>
              <div className={styles.itemActions}>
                <span
                  className={[styles.scoreChip, styles[toneKey]].join(" ")}
                  aria-label={`Match score ${article.matchScore} out of 100`}
                >
                  {article.matchScore}%
                </span>
                <button
                  type="button"
                  className={styles.openBtn}
                  onClick={() => onOpenInSidePane?.(article.id)}
                  aria-label={`Open ${article.title} in side pane`}
                >
                  Side-pane →
                </button>
              </div>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}

export default LinkedArticlesSuggester
