"use client"

import { useState } from "react"

import type { ShareTarget } from "./types"
import styles from "./share-row.module.css"

export interface ShareRowProps {
  /** Share targets. A `copy` target copies `url` to the clipboard. */
  targets: ReadonlyArray<ShareTarget>
  /** Canonical URL to copy. */
  url?: string
  /** Leading label. */
  label?: string
  className?: string
}

const GLYPH: Record<ShareTarget["id"], string> = {
  copy: "link",
  x: "X",
  facebook: "f",
  linkedin: "in",
  email: "@",
}

export function ShareRow({
  targets,
  url,
  label = "Share",
  className,
}: ShareRowProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!url || typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <span className={styles.label}>{label}</span>
      <ul className={styles.list}>
        {targets.map((target) => {
          const glyph = (
            <span className={styles.glyph} aria-hidden="true">
              {GLYPH[target.id]}
            </span>
          )

          if (target.id === "copy") {
            return (
              <li key={target.id}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={handleCopy}
                  aria-label={copied ? "Link copied" : target.label}
                >
                  {glyph}
                  <span className={styles.tip} role={copied ? "status" : undefined}>
                    {copied ? "Copied" : "Copy link"}
                  </span>
                </button>
              </li>
            )
          }

          return (
            <li key={target.id}>
              <a
                href={target.href ?? "#"}
                className={styles.button}
                aria-label={target.label}
                target="_blank"
                rel="noreferrer noopener"
              >
                {glyph}
                <span className={styles.tip}>{target.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ShareRow
