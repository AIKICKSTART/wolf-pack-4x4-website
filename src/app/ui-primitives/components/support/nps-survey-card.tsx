"use client"

import { useId, useState, type ChangeEvent } from "react"

import styles from "./nps-survey-card.module.css"

export type NpsTrend = "up" | "flat" | "down"

export interface NpsSurveyCardProps {
  question?: string
  /** Previously submitted score, surfaced in the trend chip. */
  previousScore?: number
  /** Trend direction vs previous response. */
  previousTrend?: NpsTrend
  /** Initial score selection. Defaults to none. */
  initialScore?: number
  /** Initial follow-up comment. */
  initialComment?: string
  /** Submit handler. */
  onSubmit?: (payload: { score: number; comment: string }) => void
  className?: string
}

const TREND_LABEL: Record<NpsTrend, string> = {
  up: "vs prev. ▲",
  flat: "vs prev. =",
  down: "vs prev. ▼",
}

const TREND_CLASS: Record<NpsTrend, string> = {
  up: "trendUp",
  flat: "trendFlat",
  down: "trendDown",
}

function bucketFor(score: number): "promoter" | "passive" | "detractor" {
  if (score >= 9) return "promoter"
  if (score >= 7) return "passive"
  return "detractor"
}

export function NpsSurveyCard({
  question = "On a scale of 0 to 10, how likely are you to recommend Mufflermen to a mate?",
  previousScore,
  previousTrend,
  initialScore,
  initialComment = "",
  onSubmit,
  className,
}: NpsSurveyCardProps) {
  const [score, setScore] = useState<number | null>(
    typeof initialScore === "number" ? initialScore : null,
  )
  const [comment, setComment] = useState<string>(initialComment)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const commentId = useId()

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const handleSubmit = () => {
    if (score === null) return
    setSubmitted(true)
    onSubmit?.({ score, comment: comment.trim() })
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")
  const bucket = score !== null ? bucketFor(score) : null
  const trendClass = previousTrend
    ? styles[TREND_CLASS[previousTrend] as keyof typeof styles]
    : ""

  return (
    <section
      className={classes}
      aria-label="NPS survey"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>NPS · Net promoter score</span>
        {typeof previousScore === "number" && previousTrend ? (
          <span className={[styles.trend, trendClass].join(" ")}>
            {previousScore} {TREND_LABEL[previousTrend]}
          </span>
        ) : null}
      </header>

      <p className={styles.question}>{question}</p>

      <div
        className={styles.scale}
        role="radiogroup"
        aria-label="Pick a score from 0 to 10"
      >
        {Array.from({ length: 11 }, (_, i) => i).map((value) => {
          const selected = score === value
          const valBucket = bucketFor(value)
          return (
            <button
              key={value}
              type="button"
              className={[
                styles.scaleBtn,
                styles[`bucket-${valBucket}` as keyof typeof styles],
                selected ? styles.scaleBtnSelected : "",
              ].join(" ")}
              role="radio"
              aria-checked={selected}
              onClick={() => setScore(value)}
            >
              {value}
            </button>
          )
        })}
      </div>
      <div className={styles.scaleLegend}>
        <span>Not at all</span>
        <span>Extremely likely</span>
      </div>

      <div className={styles.commentWrap}>
        <label htmlFor={commentId} className={styles.commentLabel}>
          What drove that score?
        </label>
        <textarea
          id={commentId}
          className={styles.comment}
          placeholder="Optional — anything you want the workshop team to hear."
          rows={3}
          value={comment}
          onChange={handleCommentChange}
        />
      </div>

      <footer className={styles.foot}>
        {bucket ? (
          <span className={[styles.bucketChip, styles[`bucket-${bucket}` as keyof typeof styles]].join(" ")}>
            {bucket === "promoter"
              ? "Promoter"
              : bucket === "passive"
              ? "Passive"
              : "Detractor"}
          </span>
        ) : (
          <span className={styles.bucketHint}>Pick a score to continue</span>
        )}
        <button
          type="button"
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={score === null || submitted}
        >
          {submitted ? "Submitted ✓" : "Submit response"}
        </button>
      </footer>
    </section>
  )
}

export default NpsSurveyCard
