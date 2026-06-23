"use client"

import { useEffect, useState } from "react"

import type { TocEntry } from "./types"
import styles from "./table-of-contents.module.css"

export interface TableOfContentsProps {
  entries: ReadonlyArray<TocEntry>
  /** Label above the list. */
  title?: string
  className?: string
}

export function TableOfContents({
  entries,
  title = "On this page",
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || entries.length === 0) {
      return
    }

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((node): node is HTMLElement => node !== null)

    if (headings.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (observed) => {
        const onscreen = observed
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (onscreen[0]) {
          setActiveId(onscreen[0].target.id)
        }
      },
      { rootMargin: "-96px 0px -64% 0px", threshold: [0, 1] },
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [entries])

  if (entries.length === 0) {
    return null
  }

  const classes = [styles.toc, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label={title}>
      <p className={styles.title}>{title}</p>
      <ol className={styles.list}>
        {entries.map((entry) => {
          const active = entry.id === activeId
          return (
            <li key={entry.id} className={styles.item}>
              <a
                href={`#${entry.id}`}
                className={[styles.link, active ? styles.active : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active ? "location" : undefined}
              >
                <span className={styles.marker} aria-hidden="true" />
                <span className={styles.label}>{entry.label}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default TableOfContents
