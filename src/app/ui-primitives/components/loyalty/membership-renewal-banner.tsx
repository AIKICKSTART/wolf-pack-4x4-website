"use client"

import { useState } from "react"

import { StickyCtaBar } from "../marketing/sticky-cta-bar"
import { Chip } from "../primitives/chip"

import styles from "./membership-renewal-banner.module.css"

interface MembershipRenewalBannerProps {
  /** Days until membership lapses. */
  daysRemaining: number
  /** Optional plan name displayed in the badge. */
  planLabel?: string
  /** Renewal CTA URL. */
  renewHref: string
  /** Whether auto-renew is currently on. */
  autoRenewInitial?: boolean
  /** Callback when the auto-renew toggle changes. */
  onAutoRenewChange?: (value: boolean) => void
  className?: string
}

function urgencyKey(daysRemaining: number): "critical" | "soon" | "ok" {
  if (daysRemaining <= 3) {
    return "critical"
  }
  if (daysRemaining <= 14) {
    return "soon"
  }
  return "ok"
}

const URGENCY_COPY: Record<ReturnType<typeof urgencyKey>, string> = {
  critical: "Membership ends very soon",
  soon: "Renewal window open",
  ok: "Plenty of time to renew",
}

export function MembershipRenewalBanner({
  daysRemaining,
  planLabel = "Mufflermen Brodie",
  renewHref,
  autoRenewInitial = false,
  onAutoRenewChange,
  className,
}: MembershipRenewalBannerProps) {
  const [autoRenew, setAutoRenew] = useState<boolean>(autoRenewInitial)
  const urgency = urgencyKey(daysRemaining)
  const classes = [styles.shell, className].filter(Boolean).join(" ")
  const countdownLabel = `${daysRemaining} day${daysRemaining === 1 ? "" : "s"} left`

  const handleToggle = (next: boolean) => {
    setAutoRenew(next)
    onAutoRenewChange?.(next)
  }

  return (
    <section className={classes} data-urgency={urgency}>
      <StickyCtaBar
        position="top"
        badge={planLabel}
        message={`${URGENCY_COPY[urgency]} · ${countdownLabel}`}
        primaryAction={{ label: "Renew now", href: renewHref }}
        threshold={0}
        className={styles.bar}
      />
      <div className={styles.aside}>
        <Chip label={countdownLabel} tone={urgency === "critical" ? "red" : "amber"} />
        <span className={styles.countdown} role="status" aria-live="polite">
          {countdownLabel} · renewal closes
        </span>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            className={styles.toggleInput}
            checked={autoRenew}
            onChange={(event) => handleToggle(event.target.checked)}
          />
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>Auto-renew</span>
        </label>
      </div>
    </section>
  )
}

export default MembershipRenewalBanner
