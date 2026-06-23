"use client"

import { History, Trash2 } from "lucide-react"
import type { MouseEvent } from "react"

import styles from "./search-history-row.module.css"

interface SearchHistoryRowProps {
  query: string
  timestamp: string
  occurredAt: Date | string
  resultCount?: number
  onRecall?: (query: string) => void
  onRemove?: (query: string) => void
  className?: string
}

function toIsoString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString()
  }
  return value
}

export function SearchHistoryRow({
  query,
  timestamp,
  occurredAt,
  resultCount,
  onRecall,
  onRemove,
  className,
}: SearchHistoryRowProps) {
  const handleRecall = () => {
    onRecall?.(query)
  }

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onRemove?.(query)
  }

  const classes = [styles.row, className].filter(Boolean).join(" ")
  const isoTime = toIsoString(occurredAt)

  return (
    <article className={classes}>
      <button
        type="button"
        className={styles.main}
        onClick={handleRecall}
        aria-label={`Re-run search: ${query}`}
      >
        <span className={styles.icon} aria-hidden="true">
          <History size={14} strokeWidth={2.2} />
        </span>
        <span className={styles.body}>
          <span className={styles.query}>{query}</span>
          <span className={styles.meta}>
            <time dateTime={isoTime}>{timestamp}</time>
            {typeof resultCount === "number" ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {resultCount} {resultCount === 1 ? "result" : "results"}
                </span>
              </>
            ) : null}
          </span>
        </span>
      </button>
      {onRemove ? (
        <button
          type="button"
          className={styles.remove}
          onClick={handleRemove}
          aria-label={`Remove ${query} from history`}
        >
          <Trash2 size={12} strokeWidth={2.4} aria-hidden="true" />
        </button>
      ) : null}
    </article>
  )
}

export default SearchHistoryRow
