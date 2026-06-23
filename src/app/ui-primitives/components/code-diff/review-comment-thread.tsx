"use client"

import { useState } from "react"
import { MessagesSquare } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import type { AvatarTone } from "../primitives/avatar"
import styles from "./review-comment-thread.module.css"

export interface ReviewSuggestion {
  /** Lines being removed by the suggestion. */
  remove: ReadonlyArray<string>
  /** Lines being added by the suggestion. */
  add: ReadonlyArray<string>
}

export interface ReviewReaction {
  /** Glyph or emoji shown on the chip. */
  glyph: string
  /** Reaction count. */
  count: number
}

export interface ReviewCommentMessage {
  author: string
  avatarSrc?: string
  avatarTone?: AvatarTone
  timestamp: string
  text: string
  reactions?: ReadonlyArray<ReviewReaction>
  suggestion?: ReviewSuggestion
}

export interface ReviewCommentThreadProps {
  /** Path being commented on — e.g. "apps/web/quote-instant-pricing.ts". */
  filePath: string
  /** Line number anchor. */
  lineNumber: number
  /** Messages in the thread, in order. */
  messages: ReadonlyArray<ReviewCommentMessage>
  /** Initial resolved state. */
  resolved?: boolean
  /** Resolved-toggle handler. */
  onToggleResolved?: (next: boolean) => void
  className?: string
}

export function ReviewCommentThread({
  filePath,
  lineNumber,
  messages,
  resolved: resolvedProp = false,
  onToggleResolved,
  className,
}: ReviewCommentThreadProps) {
  const [resolved, setResolved] = useState(resolvedProp)
  const classes = [styles.thread, className].filter(Boolean).join(" ")

  const toggle = () => {
    const next = !resolved
    setResolved(next)
    onToggleResolved?.(next)
  }

  return (
    <section
      role="region"
      aria-label={`Review thread on ${filePath} line ${lineNumber}`}
      aria-live="polite"
      className={classes}
    >
      <span className={styles.anchor}>
        <MessagesSquare aria-hidden="true" />
        {filePath} · L{lineNumber}
      </span>
      <div className={styles.body}>
        {messages.map((message, index) => (
          <article
            key={`${message.author}-${index}`}
            className={styles.message}
          >
            <Avatar
              name={message.author}
              src={message.avatarSrc}
              tone={message.avatarTone ?? "obsidian"}
              size="sm"
            />
            <div className={styles.messageBody}>
              <div className={styles.head}>
                <span className={styles.authorName}>{message.author}</span>
                <time className={styles.timestamp} dateTime={message.timestamp}>
                  {message.timestamp}
                </time>
              </div>
              <p className={styles.text}>{message.text}</p>
              {message.suggestion ? (
                <div className={styles.suggestion} aria-label="Suggested change">
                  <div className={styles.suggestionHead}>
                    <span>Suggested change</span>
                    <button type="button" className={styles.suggestionApply}>
                      Apply suggestion
                    </button>
                  </div>
                  <div className={styles.suggestionBody}>
                    {message.suggestion.remove.map((line, lineIndex) => (
                      <div
                        key={`r-${lineIndex}-${line.slice(0, 8)}`}
                        className={`${styles.suggestionLine} ${styles.removed}`}
                      >
                        <span className={styles.suggestionMarker} aria-hidden="true">
                          -
                        </span>
                        <span>{line === "" ? " " : line}</span>
                      </div>
                    ))}
                    {message.suggestion.add.map((line, lineIndex) => (
                      <div
                        key={`a-${lineIndex}-${line.slice(0, 8)}`}
                        className={`${styles.suggestionLine} ${styles.added}`}
                      >
                        <span className={styles.suggestionMarker} aria-hidden="true">
                          +
                        </span>
                        <span>{line === "" ? " " : line}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {message.reactions && message.reactions.length > 0 ? (
                <div className={styles.reactions}>
                  {message.reactions.map((reaction) => (
                    <button
                      key={reaction.glyph}
                      type="button"
                      className={styles.reaction}
                      aria-label={`${reaction.glyph} reaction, ${reaction.count}`}
                    >
                      <span aria-hidden="true">{reaction.glyph}</span>
                      {reaction.count}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
      <div className={styles.foot}>
        <span className={styles.metaLabel}>
          {messages.length} {messages.length === 1 ? "reply" : "replies"}
        </span>
        <button
          type="button"
          className={styles.resolveToggle}
          data-resolved={resolved}
          aria-pressed={resolved}
          onClick={toggle}
        >
          {resolved ? "Resolved" : "Resolve thread"}
        </button>
      </div>
    </section>
  )
}

export default ReviewCommentThread
