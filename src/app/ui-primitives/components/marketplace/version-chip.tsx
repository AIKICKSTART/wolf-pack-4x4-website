"use client"

import { useState } from "react"
import { History } from "lucide-react"

import styles from "./version-chip.module.css"

export interface VersionChipProps {
  version: string
  releaseDate: string
  changelog?: string
  className?: string
}

export function VersionChip({
  version,
  releaseDate,
  changelog,
  className,
}: VersionChipProps) {
  const [open, setOpen] = useState(false)
  const classes = [styles.chip, className].filter(Boolean).join(" ")

  if (!changelog) {
    return (
      <span className={classes} aria-label={`Version ${version}, released ${releaseDate}`}>
        <span className={styles.version}>{version}</span>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.date}>{releaseDate}</span>
      </span>
    )
  }

  return (
    <span className={styles.popoverWrap}>
      <span className={classes} aria-label={`Version ${version}, released ${releaseDate}`}>
        <span className={styles.version}>{version}</span>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.date}>{releaseDate}</span>
        <button
          type="button"
          className={styles.changelog}
          aria-label={`Changelog for ${version}`}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <History size={11} strokeWidth={2.4} aria-hidden="true" />
        </button>
      </span>
      {open && (
        <div className={styles.popover} role="dialog" aria-label={`${version} changelog`}>
          <h3 className={styles.popoverTitle}>Changelog · {version}</h3>
          <p className={styles.popoverBody}>{changelog}</p>
        </div>
      )}
    </span>
  )
}

export default VersionChip
