import { AlertTriangle, BookOpen, Clock } from "lucide-react"

import { CodeBlock } from "../primitives/code-block"
import type { RateLimitTone } from "./dev-experience-types"
import styles from "./rate-limit-error-card.module.css"

export interface RateLimitErrorCardProps {
  /** Tone for the leading chip + retry banner — defaults to "warning". */
  tone?: RateLimitTone
  /** Retry-After header value (seconds or a duration string e.g. "30"). */
  retryAfter: string
  /** Endpoint that triggered the 429 — rendered in the meta strip. */
  endpoint: string
  /** JSON body of the 429 response. */
  body: string
  /** Optional URL for "back-off recipe". */
  backoffRecipeHref?: string
  /** Optional className passthrough. */
  className?: string
}

const TONE_CLASS: Record<RateLimitTone, string> = {
  warning: styles.toneWarning,
  critical: styles.toneCritical,
  info: styles.toneInfo,
}

export function RateLimitErrorCard({
  tone = "warning",
  retryAfter,
  endpoint,
  body,
  backoffRecipeHref,
  className,
}: RateLimitErrorCardProps) {
  const classes = [styles.card, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      aria-label={`HTTP 429 rate-limit error for ${endpoint}`}
    >
      <header className={styles.head}>
        <span className={styles.statusChip}>
          <AlertTriangle size={13} strokeWidth={2.2} aria-hidden="true" />
          429 · Too Many Requests
        </span>
        <code className={styles.endpoint}>{endpoint}</code>
      </header>
      <div className={styles.headers}>
        <span className={styles.headerLabel}>Headers</span>
        <span className={styles.retryAfter}>
          <Clock size={12} strokeWidth={2.2} aria-hidden="true" />
          Retry-After: {retryAfter}s
        </span>
      </div>
      <CodeBlock code={body} language="json" showLineNumbers={false} />
      {backoffRecipeHref ? (
        <a className={styles.recipe} href={backoffRecipeHref}>
          <BookOpen size={13} strokeWidth={2.2} aria-hidden="true" />
          <span>Read the exponential back-off recipe</span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </a>
      ) : null}
    </section>
  )
}

export default RateLimitErrorCard
