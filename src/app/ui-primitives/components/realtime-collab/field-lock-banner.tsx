"use client"

import { Lock } from "lucide-react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import type { CollabUser } from "./realtime-collab-types"
import styles from "./field-lock-banner.module.css"

interface FieldLockBannerProps {
  /** User who currently holds the lock. */
  holder: CollabUser
  /** Field label e.g. "Customer email" / "Quote total". */
  fieldLabel: string
  /** Optional human relative timestamp e.g. "Held 28s". */
  heldFor?: string
  /** Whether the viewer can request release of the lock. */
  canRelease?: boolean
  /** Release-lock CTA handler. */
  onRelease?: () => void
  className?: string
}

export function FieldLockBanner({
  holder,
  fieldLabel,
  heldFor,
  canRelease = true,
  onRelease,
  className,
}: FieldLockBannerProps) {
  const classes = [styles.banner, className].filter(Boolean).join(" ")
  const labelId = `field-lock-${holder.id}-${fieldLabel.replace(/\s+/g, "-")}`

  return (
    <div
      className={classes}
      role="status"
      aria-busy="true"
      aria-labelledby={labelId}
    >
      <span className={styles.iconWrap} aria-hidden="true">
        <Lock size={14} strokeWidth={2.4} />
      </span>
      <Avatar
        name={holder.name}
        src={holder.avatar}
        size="sm"
        tone={holder.tone ?? "amber"}
      />
      <div className={styles.copy}>
        <span id={labelId} className={styles.title}>
          <strong>{holder.name}</strong> is editing this field
        </span>
        <span className={styles.meta}>
          <span className={styles.fieldChip}>{fieldLabel}</span>
          {heldFor && <span className={styles.held}>· {heldFor}</span>}
        </span>
      </div>
      {canRelease && (
        <Chip
          label="Request release"
          tone="amber"
          onSelect={onRelease}
          className={styles.cta}
        />
      )}
    </div>
  )
}

export default FieldLockBanner
