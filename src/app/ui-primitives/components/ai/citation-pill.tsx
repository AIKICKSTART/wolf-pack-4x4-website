import { ExternalLink } from "lucide-react"

import { QuoteBubble } from "../primitives/quote-bubble"
import styles from "./citation-pill.module.css"

interface CitationPillProps {
  index: number
  title: string
  url: string
  snippet?: string
  className?: string
}

export function CitationPill({
  index,
  title,
  url,
  snippet,
  className,
}: CitationPillProps) {
  const classes = [styles.wrap, className].filter(Boolean).join(" ")
  const labelText = `Citation ${index}: ${title}`

  return (
    <span className={classes}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.pill}
        aria-label={labelText}
      >
        <span className={styles.index}>[{index}]</span>
        <span className={styles.title}>{title}</span>
        <ExternalLink size={10} strokeWidth={2.4} aria-hidden="true" />
      </a>
      <span className={styles.popover} role="presentation">
        <QuoteBubble side="bottom" tone="obsidian" label={labelText}>
          <span className={styles.popTitle}>{title}</span>
          {snippet && <span className={styles.popSnippet}>{snippet}</span>}
          <span className={styles.popUrl}>{url}</span>
        </QuoteBubble>
      </span>
    </span>
  )
}

export default CitationPill
