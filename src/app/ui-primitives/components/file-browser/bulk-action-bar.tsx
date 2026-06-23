"use client"

import { Download, FolderInput, Tag, Trash2, X } from "lucide-react"
import { type ReactNode } from "react"

import styles from "./bulk-action-bar.module.css"

export type BulkActionId = "download" | "move" | "tag" | "delete"

export interface BulkAction {
  id: BulkActionId
  label: string
  icon: ReactNode
  destructive?: boolean
}

interface BulkActionBarProps {
  /** Number of selected items. When 0 the bar hides. */
  count: number
  onAction?: (action: BulkActionId) => void
  onClear?: () => void
  /** Optional override for the default actions. */
  actions?: ReadonlyArray<BulkAction>
  className?: string
}

const DEFAULT_ACTIONS: ReadonlyArray<BulkAction> = [
  {
    id: "download",
    label: "Download",
    icon: <Download size={14} strokeWidth={2.2} />,
  },
  {
    id: "move",
    label: "Move",
    icon: <FolderInput size={14} strokeWidth={2.2} />,
  },
  {
    id: "tag",
    label: "Tag",
    icon: <Tag size={14} strokeWidth={2.2} />,
  },
  {
    id: "delete",
    label: "Delete",
    icon: <Trash2 size={14} strokeWidth={2.2} />,
    destructive: true,
  },
]

export function BulkActionBar({
  count,
  onAction,
  onClear,
  actions = DEFAULT_ACTIONS,
  className,
}: BulkActionBarProps) {
  const visible = count > 0
  return (
    <div
      role="region"
      aria-label="Bulk actions"
      aria-hidden={!visible}
      className={[
        styles.bar,
        visible ? styles.barVisible : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.count} aria-live="polite">
        <span className={styles.countNum}>{count}</span>
        <span className={styles.countLabel}>
          {count === 1 ? "item" : "items"}
        </span>
      </span>

      <div className={styles.actions} role="group">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            className={[
              styles.action,
              action.destructive ? styles.actionDestructive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onAction?.(action.id)}
          >
            <span className={styles.actionIcon} aria-hidden="true">
              {action.icon}
            </span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.clearBtn}
        aria-label="Clear selection"
        onClick={onClear}
      >
        <X size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  )
}

export default BulkActionBar
