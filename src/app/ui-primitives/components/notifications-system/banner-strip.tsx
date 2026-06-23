"use client"

import {
  AlertTriangle,
  Megaphone,
  Sparkles,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react"
import { useState } from "react"

import type { BannerSpec, BannerVariant } from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface BannerStripProps {
  spec: BannerSpec
  onAction?: (id: string) => void
  onDismiss?: (id: string) => void
  className?: string
}

const VARIANT_CLASS: Record<BannerVariant, string> = {
  announcement: styles.bannerAnnouncement,
  alert: styles.bannerAlert,
  promo: styles.bannerPromo,
  maintenance: styles.bannerMaintenance,
}

const VARIANT_ICON: Record<BannerVariant, LucideIcon> = {
  announcement: Megaphone,
  alert: AlertTriangle,
  promo: Sparkles,
  maintenance: Wrench,
}

const VARIANT_ROLE: Record<BannerVariant, "status" | "alert"> = {
  announcement: "status",
  alert: "alert",
  promo: "status",
  maintenance: "alert",
}

const VARIANT_LIVE: Record<BannerVariant, "polite" | "assertive"> = {
  announcement: "polite",
  alert: "assertive",
  promo: "polite",
  maintenance: "assertive",
}

export function BannerStrip({ spec, onAction, onDismiss, className }: BannerStripProps) {
  const [dismissed, setDismissed] = useState<boolean>(false)
  const Icon = VARIANT_ICON[spec.variant]

  if (dismissed) {
    return null
  }

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.(spec.id)
  }

  const classes = [styles.bannerStrip, VARIANT_CLASS[spec.variant], className]
    .filter(Boolean)
    .join(" ")

  return (
    <div
      className={classes}
      role={VARIANT_ROLE[spec.variant]}
      aria-live={VARIANT_LIVE[spec.variant]}
    >
      <span className={styles.bannerIcon} aria-hidden="true">
        <Icon size={16} strokeWidth={2.2} />
      </span>
      <div className={styles.bannerBody}>
        <strong className={styles.bannerTitle}>{spec.title}</strong>
        <span className={styles.bannerMessage}>{spec.message}</span>
      </div>
      <div className={styles.bannerActions}>
        {spec.ctaLabel && onAction && (
          <button
            type="button"
            className={styles.bannerCta}
            onClick={() => onAction(spec.id)}
          >
            {spec.ctaLabel}
          </button>
        )}
        {spec.dismissible !== false && (
          <button
            type="button"
            className={styles.bannerDismiss}
            onClick={handleDismiss}
            aria-label={`Dismiss ${spec.title}`}
          >
            <X size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

export default BannerStrip
