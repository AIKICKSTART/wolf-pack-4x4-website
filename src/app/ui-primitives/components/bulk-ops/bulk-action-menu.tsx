"use client"

import { useState } from "react"
import {
  Archive,
  ChevronDown,
  Download,
  FolderInput,
  Tag,
  Trash2,
  User,
  Workflow,
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"

import type { BulkActionDescriptor, BulkActionKind } from "./bulk-ops-types"
import styles from "./bulk-action-menu.module.css"

interface BulkActionMenuProps {
  /** Override the default action list. */
  actions?: ReadonlyArray<BulkActionDescriptor>
  /** Label on the trigger pill. */
  triggerLabel?: string
  /** Render the menu open by default — useful in showcases. */
  defaultOpen?: boolean
  onSelectAction?: (action: BulkActionKind) => void
  className?: string
}

const DEFAULT_ACTIONS: ReadonlyArray<BulkActionDescriptor> = [
  { id: "tag", label: "Tag", hint: "Add or replace tags" },
  { id: "move", label: "Move", hint: "Reassign to folder / pipeline" },
  { id: "assign", label: "Assign", hint: "Reassign owner" },
  { id: "change_status", label: "Change status", hint: "Set pipeline stage" },
  { id: "export", label: "Export", hint: "CSV / XLSX / PDF" },
  { id: "archive", label: "Archive", hint: "Hide from active views" },
  { id: "delete", label: "Delete", hint: "Irreversible", destructive: true },
]

type IconType = ComponentType<SVGProps<SVGSVGElement>>

const ACTION_ICON: Record<BulkActionKind, IconType> = {
  tag: Tag,
  move: FolderInput,
  assign: User,
  change_status: Workflow,
  export: Download,
  archive: Archive,
  delete: Trash2,
}

export function BulkActionMenu({
  actions = DEFAULT_ACTIONS,
  triggerLabel = "Bulk actions",
  defaultOpen = false,
  onSelectAction,
  className,
}: BulkActionMenuProps) {
  const [open, setOpen] = useState(defaultOpen)
  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((current) => !current)}
      >
        {triggerLabel}
        <ChevronDown size={12} strokeWidth={2.4} aria-hidden="true" />
      </button>
      {open ? (
        <div className={styles.menu} role="menu" aria-label="Bulk actions">
          <span className={styles.menuHeader}>Apply to selection</span>
          {actions.map((action, index) => {
            const Icon = ACTION_ICON[action.id]
            const isLast = index === actions.length - 1
            const showDividerBefore = action.destructive && !isLast === false
            return (
              <div key={action.id}>
                {action.destructive ? (
                  <span className={styles.divider} aria-hidden="true" />
                ) : null}
                <button
                  type="button"
                  role="menuitem"
                  className={[
                    styles.item,
                    action.destructive ? styles.itemDestructive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={Boolean(action.disabledReason)}
                  onClick={() => {
                    setOpen(false)
                    onSelectAction?.(action.id)
                  }}
                >
                  <span className={styles.itemGlyph} aria-hidden="true">
                    <Icon width={14} height={14} strokeWidth={2.2} />
                  </span>
                  <span className={styles.itemLabel}>
                    <span className={styles.labelText}>{action.label}</span>
                    {action.hint ? (
                      <span className={styles.hint}>{action.hint}</span>
                    ) : null}
                  </span>
                  {action.disabledReason ? (
                    <span className={styles.disabledNote}>
                      {action.disabledReason}
                    </span>
                  ) : null}
                </button>
                {showDividerBefore ? null : null}
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default BulkActionMenu
