import { Camera, KeyRound, Send } from "lucide-react"

import { Chip } from "../primitives/chip"
import { BAY_LABEL, type BayId } from "../roster/roster-types"
import styles from "./handover-ready-banner.module.css"

export interface HandoverReadyBannerProps {
  jobNumber: string
  vehicle: string
  customer: string
  bay: BayId
  /** Photo evidence count e.g. 8. */
  photoCount: number
  /** Whether final sound clip is captured. */
  soundClipCaptured?: boolean
  /** Where it is going next. */
  signalledTo?: "front-desk" | "customer-sms"
  className?: string
}

const SIGNAL_LABEL: Record<
  NonNullable<HandoverReadyBannerProps["signalledTo"]>,
  string
> = {
  "front-desk": "Front desk pinged",
  "customer-sms": "SMS to customer",
}

export function HandoverReadyBanner({
  jobNumber,
  vehicle,
  customer,
  bay,
  photoCount,
  soundClipCaptured = true,
  signalledTo = "front-desk",
  className,
}: HandoverReadyBannerProps) {
  const classes = [styles.banner, className].filter(Boolean).join(" ")

  return (
    <aside
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={`Job ${jobNumber} ready for handover`}
    >
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.iconWrap} aria-hidden="true">
        <KeyRound size={20} strokeWidth={2.2} />
      </span>
      <div className={styles.body}>
        <span className={styles.kicker}>Handover ready · {BAY_LABEL[bay]}</span>
        <strong className={styles.line}>{vehicle}</strong>
        <p className={styles.meta}>
          {customer} · ticket {jobNumber}
        </p>
        <div className={styles.chips}>
          <Chip
            label={`${photoCount} photos`}
            tone="green"
            icon={<Camera size={11} strokeWidth={2.2} aria-hidden="true" />}
          />
          {soundClipCaptured && <Chip label="Sound clip on file" tone="teal" />}
          <Chip
            label={SIGNAL_LABEL[signalledTo]}
            tone="amber"
            icon={<Send size={11} strokeWidth={2.2} aria-hidden="true" />}
          />
        </div>
      </div>
    </aside>
  )
}

export default HandoverReadyBanner
