"use client"

import { Chip } from "../primitives/chip"

import {
  formatAud,
  formatAudCompact,
  regionLabel,
  serviceTone,
  type AwsRegion,
  type AwsService,
  type IdleResourceAction,
} from "./cloud-costs-types"
import styles from "./unused-resource-row.module.css"

export interface UnusedResourceRowProps {
  /** Resource identifier (ARN / ID). */
  id: string
  /** Resource name. */
  name: string
  /** AWS service. */
  service: AwsService
  /** Region the resource runs in. */
  region: AwsRegion
  /** Number of days resource has been idle. */
  idleDays: number
  /** Monthly cost in AUD. */
  monthlyCostAud: number
  /** Last activity timestamp (ISO). */
  lastActivityISO?: string
  /** Suggested action. */
  suggestedAction: IdleResourceAction
  /** Optional CTA when the user picks the suggested action. */
  onAction?: () => void
  /** Optional snooze CTA. */
  onSnooze?: () => void
  className?: string
}

function actionLabel(action: IdleResourceAction): string {
  switch (action) {
    case "decommission":
      return "Decommission"
    case "stop":
      return "Stop"
    case "snapshot":
      return "Snapshot & retire"
    case "keep":
      return "Keep"
  }
}

function idleTone(days: number): "amber" | "red" {
  return days >= 30 ? "red" : "amber"
}

export function UnusedResourceRow({
  id,
  name,
  service,
  region,
  idleDays,
  monthlyCostAud,
  lastActivityISO,
  suggestedAction,
  onAction,
  onSnooze,
  className,
}: UnusedResourceRowProps) {
  const annual = monthlyCostAud * 12

  return (
    <article
      className={[styles.row, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Idle resource ${name}`}
    >
      <div className={styles.identity}>
        <span className={styles.indicator} aria-hidden="true" />
        <div className={styles.identityText}>
          <span className={styles.name}>{name}</span>
          <span className={styles.id}>{id}</span>
        </div>
      </div>

      <div className={styles.chips}>
        <Chip label={service} tone={serviceTone(service)} />
        <Chip label={regionLabel(region).split(" (")[0]} tone="neutral" />
      </div>

      <div className={styles.idleCell}>
        <span className={styles.idleLabel}>Idle</span>
        <span className={styles.idleValue} data-tone={idleTone(idleDays)}>
          {idleDays}d
        </span>
        {lastActivityISO ? (
          <span className={styles.idleSub}>
            Last activity {new Date(lastActivityISO).toLocaleDateString("en-AU")}
          </span>
        ) : null}
      </div>

      <div className={styles.costCell}>
        <span className={styles.costLabel}>Cost</span>
        <span className={styles.costValue}>{formatAud(monthlyCostAud)}</span>
        <span className={styles.costSub}>
          / mo · {formatAudCompact(annual)} / yr
        </span>
      </div>

      <div className={styles.actions}>
        {onAction ? (
          <button type="button" className={styles.actionPrimary} onClick={onAction}>
            {actionLabel(suggestedAction)}
          </button>
        ) : (
          <span className={styles.actionPlaceholder}>{actionLabel(suggestedAction)}</span>
        )}
        {onSnooze ? (
          <button type="button" className={styles.actionGhost} onClick={onSnooze}>
            Snooze
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default UnusedResourceRow
