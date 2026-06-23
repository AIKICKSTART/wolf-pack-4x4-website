"use client"

import { Clock, CalendarPlus } from "lucide-react"
import { useEffect, useState } from "react"

import styles from "./quote-validity-countdown.module.css"

interface QuoteValidityCountdownProps {
  /** ISO timestamp the quote expires. */
  expiresAt: string
  /** Optional override of "now" — used by tests + showcase. */
  nowOverride?: string
  onExtendValidity?: () => void
}

interface Breakdown {
  days: number
  hours: number
  minutes: number
  expired: boolean
  urgent: boolean
}

const HOUR_MS = 1000 * 60 * 60
const DAY_MS = HOUR_MS * 24

function breakdown(expiresAt: string, now: number): Breakdown {
  const target = new Date(expiresAt).getTime()
  const remaining = target - now
  if (remaining <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true, urgent: true }
  }
  const days = Math.floor(remaining / DAY_MS)
  const hours = Math.floor((remaining % DAY_MS) / HOUR_MS)
  const minutes = Math.floor((remaining % HOUR_MS) / (1000 * 60))
  return {
    days,
    hours,
    minutes,
    expired: false,
    urgent: remaining <= DAY_MS,
  }
}

export function QuoteValidityCountdown({
  expiresAt,
  nowOverride,
  onExtendValidity,
}: QuoteValidityCountdownProps) {
  const overrideTime = nowOverride ? new Date(nowOverride).getTime() : null
  const [liveNow, setLiveNow] = useState<number>(() => overrideTime ?? Date.now())

  useEffect(() => {
    if (overrideTime !== null) {
      return
    }
    const id = window.setInterval(() => setLiveNow(Date.now()), 60_000)
    return () => window.clearInterval(id)
  }, [overrideTime])

  const effectiveNow = overrideTime ?? liveNow
  const { days, hours, minutes, expired, urgent } = breakdown(expiresAt, effectiveNow)

  const message = expired
    ? "Quote has expired"
    : `Expires in ${days} day${days === 1 ? "" : "s"} ${hours} hour${hours === 1 ? "" : "s"} ${minutes} min`

  return (
    <section
      className={[styles.bar, urgent && styles.barUrgent, expired && styles.barExpired]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-labelledby="validity-countdown-title"
    >
      <div className={styles.icon} aria-hidden="true">
        <Clock size={18} strokeWidth={1.6} />
      </div>
      <div className={styles.body}>
        <span className={styles.kicker}>Validity</span>
        <h3 id="validity-countdown-title" className={styles.message}>{message}</h3>
        <span className={styles.expiry}>Expires {new Date(expiresAt).toLocaleString("en-AU")}</span>
      </div>
      <button
        type="button"
        className={styles.extend}
        onClick={onExtendValidity}
        disabled={!onExtendValidity}
      >
        <CalendarPlus size={14} aria-hidden="true" />
        Extend validity
      </button>
    </section>
  )
}

export default QuoteValidityCountdown
