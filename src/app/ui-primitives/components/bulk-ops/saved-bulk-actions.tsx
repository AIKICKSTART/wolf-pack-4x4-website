"use client"

import { Play } from "lucide-react"

import type { BulkActionKind, SavedBulkAction } from "./bulk-ops-types"
import styles from "./saved-bulk-actions.module.css"

interface SavedBulkActionsProps {
  actions: ReadonlyArray<SavedBulkAction>
  /** Heading text. */
  title?: string
  /** Triggered when the operator clicks "Reuse" on a row. */
  onReuse?: (id: string) => void
  className?: string
}

const KIND_GLYPH: Record<BulkActionKind, string> = {
  tag: "#",
  move: "→",
  assign: "@",
  change_status: "Δ",
  export: "↓",
  archive: "▾",
  delete: "×",
}

const KIND_CLASS: Record<BulkActionKind, string> = {
  tag: "kindTag",
  move: "kindMove",
  assign: "kindAssign",
  change_status: "kindStatus",
  export: "kindExport",
  archive: "kindArchive",
  delete: "kindDelete",
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) {
    return "—"
  }
  const diffMs = Date.now() - then
  const diffMin = Math.floor(diffMs / 60_000)
  if (diffMin < 1) {
    return "just now"
  }
  if (diffMin < 60) {
    return `${diffMin}m ago`
  }
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24) {
    return `${diffH}h ago`
  }
  const diffD = Math.floor(diffH / 24)
  if (diffD < 30) {
    return `${diffD}d ago`
  }
  const diffMo = Math.floor(diffD / 30)
  return `${diffMo}mo ago`
}

export function SavedBulkActions({
  actions,
  title = "Saved bulk actions",
  onReuse,
  className,
}: SavedBulkActionsProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kicker}>Reusable</span>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <ul className={styles.list}>
        {actions.map((action) => {
          const kindClass = styles[KIND_CLASS[action.kind]]
          return (
            <li
              key={action.id}
              className={[styles.row, kindClass].filter(Boolean).join(" ")}
            >
              <span className={styles.kindGlyph} aria-hidden="true">
                {KIND_GLYPH[action.kind]}
              </span>
              <span className={styles.body}>
                <span className={styles.bodyName}>{action.name}</span>
                <span className={styles.bodyDescription}>{action.description}</span>
                <span className={styles.bodyMeta}>
                  Last used {relativeTime(action.lastUsedAt)} · avg {" "}
                  {action.averageRows.toLocaleString("en-US")} rows
                </span>
              </span>
              <button
                type="button"
                className={styles.reuseBtn}
                onClick={() => onReuse?.(action.id)}
              >
                <Play size={11} strokeWidth={2.4} aria-hidden="true" />
                Reuse
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default SavedBulkActions
