import { ThumbsDown, ThumbsUp } from "lucide-react"
import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"
import styles from "./assistant-message-bubble.module.css"

interface AssistantMessageBubbleProps {
  children: ReactNode
  authorName?: string
  modelName?: string
  timestamp: string
  streaming?: boolean
  citations?: ReactNode
  feedback?: ReactNode
  showFeedbackRow?: boolean
  className?: string
}

export function AssistantMessageBubble({
  children,
  authorName = "Mufflermen Assistant",
  modelName,
  timestamp,
  streaming = false,
  citations,
  feedback,
  showFeedbackRow = true,
  className,
}: AssistantMessageBubbleProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <li className={classes}>
      <article className={styles.bubble} aria-label={`${authorName} message`}>
        <header className={styles.head}>
          <Avatar name={authorName} size="sm" tone="amber" />
          <div className={styles.headMeta}>
            <span className={styles.author}>{authorName}</span>
            {modelName && <span className={styles.model}>{modelName}</span>}
          </div>
          <time className={styles.time}>{timestamp}</time>
        </header>

        <div
          className={styles.content}
          aria-live={streaming ? "polite" : undefined}
          aria-busy={streaming || undefined}
        >
          {streaming ? <output className={styles.output}>{children}</output> : children}
        </div>

        {citations && (
          <div className={styles.citations} aria-label="Sources">
            {citations}
          </div>
        )}

        {showFeedbackRow && (
          <footer className={styles.feedback}>
            {feedback ?? (
              <>
                <button type="button" className={styles.feedbackBtn} aria-label="Helpful response">
                  <ThumbsUp size={13} strokeWidth={2.2} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.feedbackBtn}
                  aria-label="Unhelpful response"
                >
                  <ThumbsDown size={13} strokeWidth={2.2} aria-hidden="true" />
                </button>
              </>
            )}
          </footer>
        )}
      </article>
    </li>
  )
}

export default AssistantMessageBubble
