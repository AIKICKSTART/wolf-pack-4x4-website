import Link from "next/link"

import type { BlogPostSummary } from "./types"
import styles from "./prev-next-nav.module.css"

export interface PrevNextNavProps {
  /** The earlier post (left). */
  previous?: Pick<BlogPostSummary, "href" | "title" | "categoryLabel">
  /** The later post (right). */
  next?: Pick<BlogPostSummary, "href" | "title" | "categoryLabel">
  className?: string
}

export function PrevNextNav({ previous, next, className }: PrevNextNavProps) {
  const classes = [styles.nav, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label="Post navigation">
      {previous ? (
        <Link href={previous.href} className={`${styles.link} ${styles.prev}`}>
          <span className={styles.direction}>
            <span className={`${styles.arrow} ${styles.arrowPrev}`} aria-hidden="true" />
            Previous
          </span>
          <span className={styles.category}>{previous.categoryLabel}</span>
          <span className={styles.title}>{previous.title}</span>
        </Link>
      ) : (
        <span className={`${styles.link} ${styles.prev} ${styles.empty}`} aria-hidden="true">
          <span className={styles.direction}>Start of the log</span>
        </span>
      )}

      {next ? (
        <Link href={next.href} className={`${styles.link} ${styles.next}`}>
          <span className={styles.direction}>
            Next
            <span className={`${styles.arrow} ${styles.arrowNext}`} aria-hidden="true" />
          </span>
          <span className={styles.category}>{next.categoryLabel}</span>
          <span className={styles.title}>{next.title}</span>
        </Link>
      ) : (
        <span className={`${styles.link} ${styles.next} ${styles.empty}`} aria-hidden="true">
          <span className={styles.direction}>Latest entry</span>
        </span>
      )}
    </nav>
  )
}

export default PrevNextNav
