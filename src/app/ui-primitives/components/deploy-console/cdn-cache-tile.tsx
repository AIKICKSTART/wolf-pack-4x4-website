"use client"

import { ProgressLinear } from "../primitives/progress-linear"

import type { CdnCachePattern } from "./deploy-console-types"
import styles from "./cdn-cache-tile.module.css"
import shell from "./deploy-console.module.css"

export interface CdnCacheTileProps {
  pattern: CdnCachePattern
  /** Optional handler for the purge button. Visual primitive — not wired in showcase. */
  onPurge?: (pattern: string) => void
  className?: string
}

function toneFor(ratio: number): "red" | "amber" | "teal" | "green" {
  if (ratio >= 0.9) return "green"
  if (ratio >= 0.75) return "teal"
  if (ratio >= 0.5) return "amber"
  return "red"
}

function toneClass(tone: "red" | "amber" | "teal" | "green"): string {
  switch (tone) {
    case "red":
      return shell.toneRed
    case "amber":
      return shell.toneAmber
    case "teal":
      return shell.toneTeal
    default:
      return shell.toneGreen
  }
}

export function CdnCacheTile({ pattern, onPurge, className }: CdnCacheTileProps) {
  const tone = toneFor(pattern.hitRatio)
  const toneCls = toneClass(tone)
  const hitPercent = Math.round(pattern.hitRatio * 1000) / 10

  return (
    <article
      className={[shell.shell, toneCls, styles.tile, className].filter(Boolean).join(" ")}
      aria-label={`CDN cache for ${pattern.pattern}`}
    >
      <header className={styles.head}>
        <div className={shell.shellIdentity}>
          <span className={shell.kicker}>CDN cache</span>
          <code className={styles.pattern}>{pattern.pattern}</code>
          <p className={shell.subtitle}>{pattern.description}</p>
        </div>
        <span className={[shell.chip, toneCls].join(" ")}>
          {pattern.purging ? "Purging" : "Live"}
        </span>
      </header>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={shell.sectionLabel}>Hit ratio</span>
          <span className={[styles.statValue, styles.statValueTone].join(" ")}>
            <span className={shell.tabular}>{hitPercent.toFixed(1)}</span>
            <em>%</em>
          </span>
        </div>
        <div className={styles.stat}>
          <span className={shell.sectionLabel}>TTL</span>
          <span className={styles.statValue}>
            <span className={shell.tabular}>{pattern.ttlMinutes}</span>
            <em>min</em>
          </span>
        </div>
        <div className={styles.stat}>
          <span className={shell.sectionLabel}>Req/min</span>
          <span className={styles.statValue}>
            <span className={shell.tabular}>{pattern.rpm.toLocaleString()}</span>
          </span>
        </div>
      </div>

      <ProgressLinear
        value={hitPercent}
        max={100}
        tone={tone}
        variant="striped"
        label={`Cache hit ratio for ${pattern.pattern}`}
      />

      <footer className={styles.foot}>
        <button
          type="button"
          className={[shell.button, toneCls].join(" ")}
          disabled={pattern.purging}
          onClick={() => onPurge?.(pattern.pattern)}
          aria-label={
            pattern.purging
              ? `Purge in progress for ${pattern.pattern}`
              : `Purge cache for ${pattern.pattern}`
          }
        >
          {pattern.purging ? "Purging…" : "Purge cache"}
        </button>
        <a
          className={[shell.button, shell.buttonGhost].join(" ")}
          href={`#${pattern.pattern.replace(/[^a-z0-9]+/gi, "-")}`}
        >
          Open rules →
        </a>
      </footer>
    </article>
  )
}

export default CdnCacheTile
