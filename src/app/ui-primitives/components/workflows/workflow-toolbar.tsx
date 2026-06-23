"use client"

import { Play, Redo2, Save, Share2, Undo2 } from "lucide-react"
import { useState } from "react"

import type { WorkflowStatus } from "./workflow-types"
import styles from "./workflow-toolbar.module.css"

interface WorkflowToolbarProps {
  /** Workflow display name. */
  name: string
  /** Status — toggled via the chip. */
  initialStatus?: WorkflowStatus
  /** Version label e.g. "v3". */
  version?: string
  /** Last-saved meta line. */
  savedMeta?: string
  /** Disable undo/redo if upstream history is empty. */
  canUndo?: boolean
  canRedo?: boolean
  className?: string
}

const STATUS_CLASS: Record<WorkflowStatus, string> = {
  draft: styles.statusDraft,
  active: styles.statusActive,
  paused: styles.statusPaused,
  archived: styles.statusArchived,
}

const STATUS_LABEL: Record<WorkflowStatus, string> = {
  draft: "Draft",
  active: "Active",
  paused: "Paused",
  archived: "Archived",
}

const STATUS_CYCLE: ReadonlyArray<WorkflowStatus> = [
  "draft",
  "active",
  "paused",
  "archived",
]

export function WorkflowToolbar({
  name,
  initialStatus = "draft",
  version = "v1",
  savedMeta = "Saved · just now",
  canUndo = true,
  canRedo = false,
  className,
}: WorkflowToolbarProps) {
  const [status, setStatus] = useState<WorkflowStatus>(initialStatus)

  const cycleStatus = () => {
    const idx = STATUS_CYCLE.indexOf(status)
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]
    setStatus(next)
  }

  const classes = [styles.toolbar, className].filter(Boolean).join(" ")

  return (
    <header className={classes}>
      <div className={styles.left}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{name}</h2>
          <button
            type="button"
            className={[styles.statusChip, STATUS_CLASS[status]].join(" ")}
            aria-label={`Workflow status: ${STATUS_LABEL[status]} — click to cycle`}
            onClick={cycleStatus}
          >
            {STATUS_LABEL[status]}
          </button>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.versionChip}>{version}</span>
          <span>{savedMeta}</span>
        </div>
      </div>

      <div className={styles.right}>
        <button
          type="button"
          aria-label="Undo"
          disabled={!canUndo}
          aria-disabled={!canUndo}
          className={[styles.iconBtn, !canUndo ? styles.iconBtnDisabled : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <Undo2 strokeWidth={2.2} />
        </button>
        <button
          type="button"
          aria-label="Redo"
          disabled={!canRedo}
          aria-disabled={!canRedo}
          className={[styles.iconBtn, !canRedo ? styles.iconBtnDisabled : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <Redo2 strokeWidth={2.2} />
        </button>
        <span className={styles.divider} aria-hidden="true" />
        <button type="button" className={styles.actionBtn} aria-label="Share workflow">
          <Share2 strokeWidth={2.2} /> Share
        </button>
        <button
          type="button"
          className={[styles.actionBtn, styles.actionBtnPrimary].join(" ")}
          aria-label="Run a test"
        >
          <Play strokeWidth={2.2} /> Test
        </button>
        <button
          type="button"
          className={[styles.actionBtn, styles.actionBtnSave].join(" ")}
          aria-label="Save workflow"
        >
          <Save strokeWidth={2.2} /> Save
        </button>
      </div>
    </header>
  )
}
