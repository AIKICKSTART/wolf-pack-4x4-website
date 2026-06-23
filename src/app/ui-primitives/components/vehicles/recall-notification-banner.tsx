import Link from "next/link"
import { Megaphone, ChevronRight } from "lucide-react"

import { Chip } from "../primitives/chip"

import styles from "./recall-notification-banner.module.css"

export type RecallSeverity = "watch" | "advised" | "mandatory"

interface RecallNotificationBannerAction {
  label: string
  href: string
}

interface RecallNotificationBannerProps {
  /** Manufacturer recall reference (NHTSA-style). */
  recallId: string
  /** Manufacturer issuing the recall (e.g. Toyota, Ford, Iveco). */
  manufacturer: string
  /** Short headline (≤72 chars). */
  headline: string
  /** Affected systems (e.g. ["Front airbag", "Wiring harness"]). */
  affectedSystems: ReadonlyArray<string>
  /** What the fleet operator needs to do. */
  actionRequired: string
  severity: RecallSeverity
  /** Issued ISO date. */
  issuedISO: string
  primaryAction: RecallNotificationBannerAction
  secondaryAction?: RecallNotificationBannerAction
  className?: string
}

const SEVERITY_LABEL: Record<RecallSeverity, string> = {
  watch: "Recall · Watch",
  advised: "Recall · Advised",
  mandatory: "Recall · Mandatory",
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return iso
  }
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function RecallNotificationBanner({
  recallId,
  manufacturer,
  headline,
  affectedSystems,
  actionRequired,
  severity,
  issuedISO,
  primaryAction,
  secondaryAction,
  className,
}: RecallNotificationBannerProps) {
  const classes = [styles.banner, styles[`sev-${severity}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <aside
      className={classes}
      role="alert"
      aria-live="assertive"
      aria-label={`${manufacturer} recall ${recallId}`}
    >
      <div className={styles.left}>
        <span className={styles.glyph} aria-hidden="true">
          <Megaphone size={18} strokeWidth={2.2} />
        </span>
        <div className={styles.copy}>
          <div className={styles.kicker}>
            <span>{SEVERITY_LABEL[severity]}</span>
            <span className={styles.kickerSep} aria-hidden="true">·</span>
            <span>{manufacturer}</span>
            <span className={styles.kickerSep} aria-hidden="true">·</span>
            <span>{recallId}</span>
            <span className={styles.kickerSep} aria-hidden="true">·</span>
            <span>Issued {formatDate(issuedISO)}</span>
          </div>
          <h2 className={styles.headline}>{headline}</h2>
          <p className={styles.action}>{actionRequired}</p>
          <ul className={styles.systems} aria-label="Affected systems">
            {affectedSystems.map((sys) => (
              <li key={sys}>
                <Chip label={sys} tone="red" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.actions}>
        {secondaryAction ? (
          <Link href={secondaryAction.href} className={styles.actionGhost}>
            {secondaryAction.label}
          </Link>
        ) : null}
        <Link href={primaryAction.href} className={styles.actionPrimary}>
          <span>{primaryAction.label}</span>
          <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  )
}

export default RecallNotificationBanner
