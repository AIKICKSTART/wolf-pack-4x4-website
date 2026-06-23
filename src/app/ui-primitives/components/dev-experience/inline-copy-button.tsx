"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import styles from "./inline-copy-button.module.css"

export interface InlineCopyButtonProps {
  /** Text copied to the clipboard. Also displayed as the visible chip label by default. */
  value: string
  /** Optional override for the visible label (e.g. truncated/redacted). */
  label?: string
  /** Optional aria-label override for assistive tech. */
  ariaLabel?: string
  /** Optional className passthrough. */
  className?: string
}

export function InlineCopyButton({
  value,
  label,
  ariaLabel,
  className,
}: InlineCopyButtonProps) {
  const [copied, setCopied] = useState<boolean>(false)
  const visible = label ?? value

  const handleClick = async (): Promise<void> => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  const classes = [styles.chip, copied ? styles.chipDone : "", className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={styles.wrap}>
      <button
        type="button"
        className={classes}
        onClick={handleClick}
        aria-label={ariaLabel ?? (copied ? `Copied ${visible}` : `Copy ${visible}`)}
      >
        <span className={styles.value}>{visible}</span>
        {copied ? (
          <Check size={12} strokeWidth={2.4} aria-hidden="true" />
        ) : (
          <Copy size={12} strokeWidth={2.2} aria-hidden="true" />
        )}
      </button>
      <span className={styles.status} role="status" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </span>
  )
}

export default InlineCopyButton
