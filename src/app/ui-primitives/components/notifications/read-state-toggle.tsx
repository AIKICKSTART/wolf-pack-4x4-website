"use client"

import { useState, useCallback } from "react"

import styles from "./read-state-toggle.module.css"

interface ReadStateToggleProps {
  unread: boolean
  defaultUnread?: boolean
  controlled?: boolean
  onChange?: (nextUnread: boolean) => void
  ariaLabel?: string
  className?: string
}

export function ReadStateToggle({
  unread,
  defaultUnread,
  controlled = true,
  onChange,
  ariaLabel,
  className,
}: ReadStateToggleProps) {
  const [internal, setInternal] = useState<boolean>(
    defaultUnread ?? unread,
  )

  const current = controlled ? unread : internal

  const handleClick = useCallback(() => {
    const next = !current
    if (!controlled) {
      setInternal(next)
    }
    onChange?.(next)
  }, [current, controlled, onChange])

  const label = ariaLabel ?? (current ? "Mark as read" : "Mark as unread")
  const classes = [styles.toggle, className].filter(Boolean).join(" ")

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={current}
      aria-label={label}
      onClick={handleClick}
    >
      <span className={styles.sr}>{label}</span>
    </button>
  )
}

export default ReadStateToggle
