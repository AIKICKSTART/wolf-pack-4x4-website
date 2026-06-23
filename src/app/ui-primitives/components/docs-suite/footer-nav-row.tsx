import Link from "next/link"

import type { DocsNavTarget } from "./docs-suite-types"

import styles from "./footer-nav-row.module.css"

interface FooterNavRowProps {
  previous?: DocsNavTarget | null
  next?: DocsNavTarget | null
  ariaLabel?: string
}

export function FooterNavRow({
  previous = null,
  next = null,
  ariaLabel = "Article navigation",
}: FooterNavRowProps) {
  return (
    <nav className={styles.row} aria-label={ariaLabel} role="navigation">
      {previous ? (
        <Link
          className={styles.cell}
          href={previous.href}
          rel="prev"
          aria-label={`Previous article: ${previous.title}`}
        >
          <span className={styles.kicker}>
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Previous
          </span>
          <span className={styles.category}>{previous.category}</span>
          <h3 className={styles.title}>{previous.title}</h3>
          {previous.relationHint ? <p className={styles.hint}>{previous.relationHint}</p> : null}
        </Link>
      ) : (
        <span className={[styles.cell, styles.cellEmpty].join(" ")} aria-hidden="true" />
      )}

      {next ? (
        <Link
          className={[styles.cell, styles.cellNext].join(" ")}
          href={next.href}
          rel="next"
          aria-label={`Next article: ${next.title}`}
        >
          <span className={styles.kicker}>
            Next
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
          <span className={styles.category}>{next.category}</span>
          <h3 className={styles.title}>{next.title}</h3>
          {next.relationHint ? <p className={styles.hint}>{next.relationHint}</p> : null}
        </Link>
      ) : (
        <span className={[styles.cell, styles.cellEmpty].join(" ")} aria-hidden="true" />
      )}
    </nav>
  )
}

export default FooterNavRow
