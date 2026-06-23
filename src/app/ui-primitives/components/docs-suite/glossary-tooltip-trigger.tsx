"use client"

import Link from "next/link"
import { useId, useState } from "react"

import type { DocsGlossaryEntry } from "./docs-suite-types"

import styles from "./glossary-tooltip-trigger.module.css"

interface GlossaryTooltipTriggerProps {
  entry: DocsGlossaryEntry
  readMoreLabel?: string
}

export function GlossaryTooltipTrigger({
  entry,
  readMoreLabel = "Open glossary",
}: GlossaryTooltipTriggerProps) {
  const [open, setOpen] = useState<boolean>(false)
  const popoverId = useId()

  return (
    <span
      className={styles.wrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-describedby={open ? popoverId : undefined}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((prev) => !prev)}
      >
        {entry.term}
        <svg className={styles.tipMark} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4" strokeLinecap="round" />
          <path d="M12 17h.01" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        <span
          id={popoverId}
          className={styles.popover}
          role="tooltip"
          aria-label={`Glossary: ${entry.term}`}
        >
          <span className={styles.term}>{entry.term}</span>
          <p className={styles.definition}>{entry.definition}</p>
          {entry.href ? (
            <Link className={styles.more} href={entry.href}>
              {readMoreLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="12" height="12" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          ) : null}
        </span>
      ) : null}
    </span>
  )
}

export default GlossaryTooltipTrigger
