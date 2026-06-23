import type { CSSProperties } from "react"

import {
  FRAMEWORK_LABEL,
  FRAMEWORK_SHORT,
  STATUS_LABEL,
  STATUS_TONE,
  type ComplianceFramework,
  type ComplianceStatus,
  type ComplianceTone,
} from "./compliance-types"
import styles from "./framework-status-card.module.css"

export interface FrameworkStatusCardProps {
  framework: ComplianceFramework
  status: ComplianceStatus
  /** Percent complete (0-100). */
  percent: number
  /** Last audit date, e.g. "2026-03-14". */
  lastAuditDate: string
  /** Next audit date, e.g. "2026-09-14". */
  nextAuditDate: string
  /** Optional iconmark glyph (defaults to FRAMEWORK_SHORT). */
  glyph?: string
  className?: string
}

const TONE_CLASS: Record<ComplianceTone, string> = {
  green: styles.toneGreen,
  amber: styles.toneAmber,
  red: styles.toneRed,
  neutral: styles.toneNeutral,
  teal: styles.toneTeal,
  violet: styles.toneViolet,
}

function clampPct(n: number): number {
  if (Number.isNaN(n)) return 0
  if (n < 0) return 0
  if (n > 100) return 100
  return Math.round(n)
}

export function FrameworkStatusCard({
  framework,
  status,
  percent,
  lastAuditDate,
  nextAuditDate,
  glyph,
  className,
}: FrameworkStatusCardProps) {
  const tone = STATUS_TONE[status]
  const value = clampPct(percent)
  const fullName = FRAMEWORK_LABEL[framework]
  const shortName = FRAMEWORK_SHORT[framework]
  const mark = glyph ?? shortName

  const classes = [styles.card, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`${fullName} compliance status`}
    >
      <header className={styles.head}>
        <span className={styles.mark} aria-hidden="true">
          {mark}
        </span>
        <div className={styles.identity}>
          <h3 className={styles.name}>{fullName}</h3>
          <span className={styles.short}>{shortName}</span>
        </div>
      </header>

      <span className={styles.statusChip}>
        <span className={styles.statusDot} aria-hidden="true" />
        {STATUS_LABEL[status]}
      </span>

      <div className={styles.meter}>
        <div
          className={styles.meterTrack}
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-label={`${fullName} percent complete`}
        >
          <span
            className={styles.meterFill}
            style={{ "--meter-fill": `${value}%` } as CSSProperties}
            aria-hidden="true"
          />
        </div>
        <div className={styles.meterRow}>
          <span className={styles.meterValue}>{value}%</span>
          <span className={styles.meterLabel}>complete</span>
        </div>
      </div>

      <footer className={styles.foot}>
        <span>
          <span className={styles.footLabel}>Last audit </span>
          <span className={styles.footValue}>{lastAuditDate}</span>
        </span>
        <span>
          <span className={styles.footLabel}>Next </span>
          <span className={styles.footValue}>{nextAuditDate}</span>
        </span>
      </footer>
    </section>
  )
}

export default FrameworkStatusCard
