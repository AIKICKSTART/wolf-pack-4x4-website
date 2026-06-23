"use client"

import { Archive, Download, FileBadge, FolderInput, Tag, X } from "lucide-react"

import styles from "./bulk-select-toolbar.module.css"

export type BulkAction =
  | "tag"
  | "move"
  | "download"
  | "license"
  | "archive"

interface BulkSelectToolbarProps {
  /** Number of selected assets — toolbar appears when > 0. */
  selectedCount: number
  /** Override visible threshold. Defaults to 1. */
  threshold?: number
  onAction?: (action: BulkAction) => void
  onClear?: () => void
  className?: string
}

const ACTIONS: ReadonlyArray<{
  id: BulkAction
  label: string
  icon: typeof Tag
}> = [
  { id: "tag", label: "Tag", icon: Tag },
  { id: "move", label: "Move", icon: FolderInput },
  { id: "download", label: "Download", icon: Download },
  { id: "license", label: "License", icon: FileBadge },
  { id: "archive", label: "Archive", icon: Archive },
]

export function BulkSelectToolbar({
  selectedCount,
  threshold = 1,
  onAction,
  onClear,
  className,
}: BulkSelectToolbarProps) {
  const visible = selectedCount >= threshold

  return (
    <div
      className={[
        styles.toolbar,
        visible ? styles.toolbarVisible : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="toolbar"
      aria-label={`Bulk actions for ${selectedCount} selected assets`}
      aria-hidden={!visible}
    >
      <span className={styles.count} aria-live="polite">
        <span className={styles.countNumber}>{selectedCount}</span>
        <span className={styles.countLabel}>selected</span>
      </span>

      <span className={styles.divider} aria-hidden="true" />

      <div className={styles.actions}>
        {ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.id}
              type="button"
              className={styles.actionBtn}
              onClick={() => onAction?.(action.id)}
            >
              <Icon size={14} strokeWidth={2} aria-hidden="true" />
              {action.label}
            </button>
          )
        })}
      </div>

      <span className={styles.divider} aria-hidden="true" />

      <button
        type="button"
        className={styles.clearBtn}
        onClick={onClear}
        aria-label="Clear selection"
      >
        <X size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  )
}

export default BulkSelectToolbar
