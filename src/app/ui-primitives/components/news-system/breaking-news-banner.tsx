"use client"

import { useState } from "react"
import { ArrowRight, X, Zap } from "lucide-react"

import { formatRelativeTime, type NewsItem } from "./news-types"

import styles from "./breaking-news-banner.module.css"

export interface BreakingNewsBannerProps {
  item: NewsItem
  /** Pill label before the headline. */
  label?: string
  href?: string
  dismissible?: boolean
  className?: string
}

export function BreakingNewsBanner({
  item,
  label = "Breaking",
  href = "#",
  dismissible = true,
  className,
}: BreakingNewsBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <aside className={classes} role="alert" aria-label={`${label}: ${item.headline}`}>
      <span className={styles.sweep} aria-hidden="true" />

      <span className={styles.badge}>
        <Zap size={14} strokeWidth={2.6} aria-hidden="true" />
        {label}
      </span>

      <a href={href} className={styles.content}>
        <span className={styles.headline}>{item.headline}</span>
        <span className={styles.cta}>
          Read more
          <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
        </span>
      </a>

      <time className={styles.time} dateTime={item.publishedAt}>
        {formatRelativeTime(item.publishedAt)}
      </time>

      {dismissible && (
        <button
          type="button"
          className={styles.close}
          aria-label="Dismiss breaking news"
          onClick={() => setDismissed(true)}
        >
          <X size={16} strokeWidth={2.4} aria-hidden="true" />
        </button>
      )}
    </aside>
  )
}

export default BreakingNewsBanner
