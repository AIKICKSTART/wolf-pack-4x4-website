import Link from "next/link"

import {
  ENVIRONMENT_LABEL,
  ENVIRONMENT_SHORT,
  STATUS_LABEL as FLAG_STATUS_LABEL,
  type FlagEnvironment,
  type FlagStatusForEnv,
} from "../feature-flags/feature-flag-types"

import styles from "./feature-flag-link-row.module.css"

export interface FeatureFlagLinkRowProps {
  /** Flag key (machine-readable). */
  flagKey: string
  /** Human-readable flag name. */
  name: string
  /** Optional one-line description. */
  description?: string
  /** Linked target environment. */
  environment: FlagEnvironment
  /** Current flag status in that environment. */
  status: FlagStatusForEnv
  /** Rollout percent 0..100. */
  rolloutPct: number
  /** Href to navigate to the flag detail page. */
  href: string
  className?: string
}

const STATUS_FILL_CLASS: Record<FlagStatusForEnv, string> = {
  on: "rolloutFillOn",
  off: "rolloutFill",
  ramping: "rolloutFillRamping",
  killed: "rolloutFillKilled",
}

const ENV_PILL_CLASS: Record<FlagEnvironment, string> = {
  dev: "envDev",
  staging: "envStaging",
  prod: "envProd",
}

export function FeatureFlagLinkRow({
  flagKey,
  name,
  description,
  environment,
  status,
  rolloutPct,
  href,
  className,
}: FeatureFlagLinkRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const fillClasses = [
    styles.rolloutFill,
    styles[STATUS_FILL_CLASS[status] as keyof typeof styles],
  ]
    .filter(Boolean)
    .join(" ")
  const envClasses = [
    styles.envPill,
    styles[ENV_PILL_CLASS[environment] as keyof typeof styles],
  ].join(" ")

  const fillPct = status === "off" || status === "killed" ? 0 : Math.max(0, Math.min(100, Math.round(rolloutPct)))

  return (
    <Link
      href={href}
      className={classes}
      aria-label={`Linked feature flag ${name} (${flagKey}) in ${ENVIRONMENT_LABEL[environment]}, ${FLAG_STATUS_LABEL[status]}, rollout ${fillPct} percent`}
      prefetch={false}
    >
      <span className={styles.icon} aria-hidden="true">
        ⚑
      </span>
      <div className={styles.body}>
        <span className={styles.flagKey}>{flagKey}</span>
        <span className={styles.flagName}>{name}</span>
        {description ? (
          <span className={styles.flagDesc}>{description}</span>
        ) : null}
      </div>
      <div className={styles.rollout}>
        <div className={styles.rolloutLabelRow}>
          <span>{FLAG_STATUS_LABEL[status]}</span>
          <span>{fillPct}%</span>
        </div>
        <div className={styles.rolloutTrack} aria-hidden="true">
          <span className={fillClasses} style={{ width: `${fillPct}%` }} />
        </div>
      </div>
      <span className={envClasses}>{ENVIRONMENT_SHORT[environment]}</span>
    </Link>
  )
}

export default FeatureFlagLinkRow
