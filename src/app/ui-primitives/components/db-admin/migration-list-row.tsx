"use client"

import { Eye, RotateCcw, Play } from "lucide-react"
import type { ReactNode } from "react"

import type { MigrationStatus } from "./db-admin-types"
import styles from "./migration-list-row.module.css"

interface MigrationListRowProps {
  version: string
  name: string
  /** Applied-at timestamp string or "—". */
  appliedAt?: string
  status: MigrationStatus
  /** Duration label — e.g. "184ms". */
  duration?: string
  /** Action callbacks — passed through to action buttons. */
  onView?: () => void
  onRun?: () => void
  onRollback?: () => void
  className?: string
}

const STATUS_LABEL: Record<MigrationStatus, string> = {
  applied: "Applied",
  pending: "Pending",
  failed: "Failed",
  rolled_back: "Rolled back",
}

const STATUS_CLASS: Record<MigrationStatus, string> = {
  applied: styles.statusApplied,
  pending: styles.statusPending,
  failed: styles.statusFailed,
  rolled_back: styles.statusRolledBack,
}

interface ActionConfig {
  key: string
  label: string
  icon: ReactNode
  onClick?: () => void
}

export function MigrationListRow({
  version,
  name,
  appliedAt,
  status,
  duration,
  onView,
  onRun,
  onRollback,
  className,
}: MigrationListRowProps) {
  const actions: ReadonlyArray<ActionConfig> = [
    {
      key: "view",
      label: `View migration ${version}`,
      icon: <Eye size={12} strokeWidth={2.2} aria-hidden="true" />,
      onClick: onView,
    },
    status === "pending"
      ? {
          key: "run",
          label: `Run migration ${version}`,
          icon: <Play size={12} strokeWidth={2.2} aria-hidden="true" />,
          onClick: onRun,
        }
      : {
          key: "rollback",
          label: `Rollback migration ${version}`,
          icon: <RotateCcw size={12} strokeWidth={2.2} aria-hidden="true" />,
          onClick: onRollback,
        },
  ]

  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Migration ${version} — ${STATUS_LABEL[status]}`}>
      <span className={styles.version}>{version}</span>
      <div className={styles.name}>
        <span className={styles.title}>{name}</span>
        <span className={styles.meta}>
          {appliedAt ?? "Not applied"} {duration ? `· ${duration}` : ""}
        </span>
      </div>
      <span className={`${styles.statusChip} ${STATUS_CLASS[status]}`}>
        {STATUS_LABEL[status]}
      </span>
      <div className={styles.actions}>
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            className={styles.actionBtn}
            onClick={action.onClick}
            aria-label={action.label}
          >
            {action.icon}
          </button>
        ))}
      </div>
    </article>
  )
}

export default MigrationListRow
