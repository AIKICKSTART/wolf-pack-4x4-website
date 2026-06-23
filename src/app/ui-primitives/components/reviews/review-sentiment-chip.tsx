import { Frown, Meh, Smile } from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"

import {
  REVIEW_SENTIMENT_LABEL,
  REVIEW_SENTIMENT_TONE,
  type ReviewSentiment,
} from "./reviews-types"

import styles from "./review-sentiment-chip.module.css"

export interface ReviewSentimentChipProps {
  sentiment: ReviewSentiment
  /** Override the rendered label. */
  label?: string
  className?: string
}

const ICON_FOR_SENTIMENT: Record<ReviewSentiment, ReactNode> = {
  positive: <Smile size={11} strokeWidth={2.4} aria-hidden="true" />,
  mixed: <Meh size={11} strokeWidth={2.4} aria-hidden="true" />,
  negative: <Frown size={11} strokeWidth={2.4} aria-hidden="true" />,
}

export function ReviewSentimentChip({
  sentiment,
  label,
  className,
}: ReviewSentimentChipProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  return (
    <span className={classes}>
      <Chip
        label={label ?? REVIEW_SENTIMENT_LABEL[sentiment]}
        tone={REVIEW_SENTIMENT_TONE[sentiment]}
        icon={ICON_FOR_SENTIMENT[sentiment]}
      />
    </span>
  )
}

export default ReviewSentimentChip
