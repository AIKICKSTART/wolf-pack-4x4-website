"use client"

import { useState } from "react"

import {
  AI_CONFIDENCE_LABEL,
  AI_CONFIDENCE_TONE,
  type AiConfidence,
  type SupportTone,
} from "./support-types"
import styles from "./ai-suggested-reply-card.module.css"

export type AiSuggestionAction = "use" | "refine" | "reject"

export interface AiSuggestedReplyCardProps {
  confidence: AiConfidence
  /** Suggested reply body. */
  suggestion: string
  /** Optional summary of why the AI suggested this. */
  rationale?: string
  /** Source signal, e.g. "Trained on 412 similar tickets". */
  source?: string
  /** Triggered when the user clicks Use / Refine / Reject. */
  onAction?: (action: AiSuggestionAction) => void
  className?: string
}

const TONE_CLASS: Record<SupportTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function AiSuggestedReplyCard({
  confidence,
  suggestion,
  rationale,
  source,
  onAction,
  className,
}: AiSuggestedReplyCardProps) {
  const [chosen, setChosen] = useState<AiSuggestionAction | null>(null)
  const tone = AI_CONFIDENCE_TONE[confidence]
  const classes = [styles.card, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  const handle = (action: AiSuggestionAction) => {
    setChosen(action)
    onAction?.(action)
  }

  return (
    <article className={classes} aria-label="AI suggested reply">
      <header className={styles.head}>
        <span className={styles.kicker}>
          <span className={styles.aiGlyph} aria-hidden="true">
            ✦
          </span>
          AI suggested reply
        </span>
        <span
          className={[styles.confidenceChip, TONE_CLASS[tone]].join(" ")}
          aria-label={AI_CONFIDENCE_LABEL[confidence]}
        >
          {AI_CONFIDENCE_LABEL[confidence]}
        </span>
      </header>

      <p className={styles.suggestion}>{suggestion}</p>

      {rationale ? (
        <p className={styles.rationale}>
          <span className={styles.rationaleKicker}>Why</span>
          <span className={styles.rationaleBody}>{rationale}</span>
        </p>
      ) : null}

      {source ? (
        <p className={styles.source}>{source}</p>
      ) : null}

      <footer className={styles.actions}>
        <button
          type="button"
          className={[styles.useBtn, chosen === "use" ? styles.chosen : ""].join(" ")}
          onClick={() => handle("use")}
        >
          {chosen === "use" ? "Used ✓" : "Use"}
        </button>
        <button
          type="button"
          className={[styles.refineBtn, chosen === "refine" ? styles.chosen : ""].join(" ")}
          onClick={() => handle("refine")}
        >
          {chosen === "refine" ? "Refining…" : "Refine"}
        </button>
        <button
          type="button"
          className={[styles.rejectBtn, chosen === "reject" ? styles.chosen : ""].join(" ")}
          onClick={() => handle("reject")}
        >
          {chosen === "reject" ? "Rejected" : "Reject"}
        </button>
      </footer>
    </article>
  )
}

export default AiSuggestedReplyCard
