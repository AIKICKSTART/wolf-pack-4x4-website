"use client"

import { Bell, Check, Smartphone } from "lucide-react"
import { useState } from "react"

import styles from "./notifications-system.module.css"

export type PushPermissionState = "prompt" | "granted" | "denied"

interface PushPermissionCardProps {
  title?: string
  description?: string
  benefits?: ReadonlyArray<string>
  state?: PushPermissionState
  allowLabel?: string
  declineLabel?: string
  onAllow?: () => void
  onDecline?: () => void
  className?: string
}

const DEFAULT_BENEFITS: ReadonlyArray<string> = [
  "Bay-ready alerts the moment your vehicle is up on the hoist",
  "Quote replies inside the app so nothing waits in a spam folder",
  "Optional service-due reminders synced to your rego",
]

export function PushPermissionCard({
  title = "Turn on workshop alerts",
  description = "Get a soft chime when your booking is ready, your quote is back, or a recall lands on your rego. We never push promos.",
  benefits = DEFAULT_BENEFITS,
  state = "prompt",
  allowLabel = "Allow notifications",
  declineLabel = "Not now",
  onAllow,
  onDecline,
  className,
}: PushPermissionCardProps) {
  const [localState, setLocalState] = useState<PushPermissionState>(state)

  const handleAllow = () => {
    setLocalState("granted")
    onAllow?.()
  }

  const handleDecline = () => {
    setLocalState("denied")
    onDecline?.()
  }

  const classes = [styles.pushCard, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <div className={styles.pushHead}>
        <span className={styles.pushIcon} aria-hidden="true">
          <Bell size={18} strokeWidth={2.2} />
          <Smartphone size={12} strokeWidth={2.4} className={styles.pushIconSecondary} />
        </span>
        <div className={styles.pushTitleWrap}>
          <p className={styles.pushKicker}>Push · Mufflermen</p>
          <h3 className={styles.pushTitle}>{title}</h3>
        </div>
      </div>

      <p className={styles.pushDescription}>{description}</p>

      <ul className={styles.pushBenefits}>
        {benefits.map((benefit) => (
          <li key={benefit} className={styles.pushBenefit}>
            <Check size={14} strokeWidth={2.4} aria-hidden="true" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      {localState === "prompt" && (
        <div className={styles.pushActions}>
          <button type="button" className={styles.pushAllow} onClick={handleAllow}>
            {allowLabel}
          </button>
          <button type="button" className={styles.pushDecline} onClick={handleDecline}>
            {declineLabel}
          </button>
        </div>
      )}

      {localState === "granted" && (
        <p className={styles.pushNoteOk} role="status" aria-live="polite">
          <Check size={14} strokeWidth={2.4} aria-hidden="true" />
          Notifications on — you can change this in your profile any time.
        </p>
      )}

      {localState === "denied" && (
        <p className={styles.pushNoteWarn} role="status" aria-live="polite">
          Notifications blocked. You can re-enable them in your browser&apos;s site
          settings.
        </p>
      )}
    </section>
  )
}

export default PushPermissionCard
