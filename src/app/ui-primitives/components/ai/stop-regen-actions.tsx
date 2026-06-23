"use client"

import { Copy, Pencil, RefreshCw, Square } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./stop-regen-actions.module.css"

interface ActionItem {
  id: string
  label: string
  icon: ReactNode
  onPress?: () => void
  disabled?: boolean
}

interface StopRegenActionsProps {
  onStop?: () => void
  onRegenerate?: () => void
  onEdit?: () => void
  onCopy?: () => void
  streaming?: boolean
  className?: string
}

export function StopRegenActions({
  onStop,
  onRegenerate,
  onEdit,
  onCopy,
  streaming = false,
  className,
}: StopRegenActionsProps) {
  const items: ReadonlyArray<ActionItem> = [
    {
      id: "stop",
      label: "Stop",
      icon: <Square size={12} strokeWidth={2.6} aria-hidden="true" />,
      onPress: onStop,
      disabled: !streaming,
    },
    {
      id: "regenerate",
      label: "Regenerate",
      icon: <RefreshCw size={12} strokeWidth={2.4} aria-hidden="true" />,
      onPress: onRegenerate,
      disabled: streaming,
    },
    {
      id: "edit",
      label: "Edit prompt",
      icon: <Pencil size={12} strokeWidth={2.4} aria-hidden="true" />,
      onPress: onEdit,
      disabled: streaming,
    },
    {
      id: "copy",
      label: "Copy",
      icon: <Copy size={12} strokeWidth={2.4} aria-hidden="true" />,
      onPress: onCopy,
    },
  ]

  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="toolbar" aria-label="Response actions">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={styles.action}
          onClick={item.onPress}
          disabled={item.disabled}
          data-action={item.id}
        >
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  )
}

export default StopRegenActions
