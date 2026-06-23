"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import styles from "./magic-link-sent.module.css"

export interface MagicLinkSentProps {
  email: string
  countdownSeconds?: number
  onResend?: () => void
  altActionSlot?: ReactNode
  className?: string
}

function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`
}

export function MagicLinkSent({
  email,
  countdownSeconds = 60,
  onResend,
  altActionSlot,
  className,
}: MagicLinkSentProps) {
  const [remaining, setRemaining] = useState(countdownSeconds)
  const [resendNonce, setResendNonce] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [resendNonce])

  const handleResend = () => {
    onResend?.()
    setRemaining(countdownSeconds)
    setResendNonce((n) => n + 1)
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")
  const canResend = remaining === 0

  return (
    <section className={classes} aria-live="polite">
      <span className={styles.iconSlot} aria-hidden="true">
        <svg viewBox="0 0 32 32" className={styles.envelope}>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            d="M3 8.5a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            d="M3.5 9 16 18 28.5 9"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            d="M22 12.5l5-3M5 12.5l-1.5-1"
          />
        </svg>
      </span>

      <header>
        <h2 className={styles.headline}>Check your inbox</h2>
        <p className={styles.copy}>
          We sent a one-time sign-in link to <strong>{email}</strong>. The link expires in 10 minutes.
        </p>
      </header>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.resend}
          onClick={handleResend}
          disabled={!canResend}
          aria-disabled={!canResend}
        >
          {canResend ? "Resend link" : "Link sent"}
        </button>

        <div className={styles.timerRow}>
          {canResend ? (
            <span>You can request a fresh link</span>
          ) : (
            <span>
              Resend available in{" "}
              <span className={styles.timerValue}>{formatSeconds(remaining)}</span>
            </span>
          )}
        </div>

        {altActionSlot ? <div>{altActionSlot}</div> : null}
      </div>
    </section>
  )
}

export default MagicLinkSent
