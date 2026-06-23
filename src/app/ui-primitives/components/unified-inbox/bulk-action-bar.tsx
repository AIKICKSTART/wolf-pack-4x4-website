"use client"

import { ArrowRight, CheckCheck, ShieldAlert, UserPlus, X } from "lucide-react"
import type { ReactNode } from "react"

import {
  BULK_ACTION_LABEL,
  type BulkAction,
} from "./unified-inbox-types"
import styles from "./bulk-action-bar.module.css"

interface BulkActionBarProps {
  /** Number of selected conversations. */
  selectedCount: number
  /** Triggered when the operator clicks an action. */
  onAction?: (action: BulkAction) => void
  /** Triggered when the operator dismisses the selection. */
  onDismiss?: () => void
  /** Optional context label, e.g. "across 3 channels". */
  contextLabel?: string
  className?: string
}

interface ActionDescriptor {
  id: BulkAction
  icon: ReactNode
  tone: "neutral" | "amber" | "red"
}

const ACTIONS: ReadonlyArray<ActionDescriptor> = [
  {
    id: "assign",
    icon: <UserPlus size={13} strokeWidth={2.3} aria-hidden="true" />,
    tone: "neutral",
  },
  {
    id: "move",
    icon: <ArrowRight size={13} strokeWidth={2.3} aria-hidden="true" />,
    tone: "neutral",
  },
  {
    id: "close",
    icon: <CheckCheck size={13} strokeWidth={2.4} aria-hidden="true" />,
    tone: "amber",
  },
  {
    id: "spam",
    icon: <ShieldAlert size={13} strokeWidth={2.3} aria-hidden="true" />,
    tone: "red",
  },
]

export function BulkActionBar({
  selectedCount,
  onAction,
  onDismiss,
  contextLabel,
  className,
}: BulkActionBarProps) {
  const isHidden = selectedCount <= 0
  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="region"
      aria-label="Bulk action bar"
      aria-hidden={isHidden}
      data-hidden={isHidden ? "true" : undefined}
    >
      <span className={styles.count} aria-live="polite">
        <span className={styles.countValue}>
          {selectedCount.toString().padStart(2, "0")}
        </span>
        <span className={styles.countLabel}>
          selected
          {contextLabel ? (
            <span className={styles.countContext}> · {contextLabel}</span>
          ) : null}
        </span>
      </span>

      <div className={styles.actions} role="toolbar" aria-label="Bulk actions">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            className={[styles.actionBtn, styles[`tone_${action.tone}`]]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onAction?.(action.id)}
            disabled={isHidden}
          >
            <span className={styles.actionIcon}>{action.icon}</span>
            <span>{BULK_ACTION_LABEL[action.id]}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.dismissBtn}
        onClick={onDismiss}
        aria-label="Dismiss selection"
        disabled={isHidden}
      >
        <X size={13} strokeWidth={2.4} aria-hidden="true" />
      </button>
    </div>
  )
}

export default BulkActionBar
