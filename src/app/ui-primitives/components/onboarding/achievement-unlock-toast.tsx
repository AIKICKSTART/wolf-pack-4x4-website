"use client"

import { useEffect, useRef } from "react"

import {
  ConfettiBurst,
  type ConfettiBurstHandle,
} from "../primitives/confetti-burst"
import styles from "./achievement-unlock-toast.module.css"

interface AchievementUnlockToastProps {
  /** Whether the toast is currently shown. */
  open: boolean
  /** Eyebrow chip text, default "Achievement unlocked". */
  kicker?: string
  /** Title of the unlocked achievement, e.g. "First Quote". */
  title: string
  /** Optional supporting line, e.g. "You logged your first job quote — nice work, Pi crew." */
  body?: string
  /** Points awarded chip text, e.g. "+50 XP". */
  points?: string
  /** Click handler for dismissing. */
  onClose: () => void
  /** Optional auto-close delay in ms (default 6000). Pass null to disable. */
  autoCloseMs?: number | null
  /** Optional CSS class to position the toast. */
  className?: string
}

export function AchievementUnlockToast({
  open,
  kicker = "Achievement unlocked",
  title,
  body,
  points,
  onClose,
  autoCloseMs = 6000,
  className,
}: AchievementUnlockToastProps) {
  const confettiRef = useRef<ConfettiBurstHandle | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }
    confettiRef.current?.fire({
      particleCount: 80,
      spread: 70,
      startVelocity: 30,
      scalar: 0.95,
    })
  }, [open])

  useEffect(() => {
    if (!open || autoCloseMs === null) {
      return
    }
    const timer = window.setTimeout(onClose, autoCloseMs)
    return () => window.clearTimeout(timer)
  }, [open, autoCloseMs, onClose])

  if (!open) {
    return null
  }

  const classes = [styles.toast, className].filter(Boolean).join(" ")

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className={styles.confettiHost} aria-hidden="true">
        <ConfettiBurst ref={confettiRef} ariaLabel="Achievement confetti" />
      </span>
      <div className={styles.trophyWrap} aria-hidden="true">
        <svg viewBox="0 0 36 36" width="32" height="32" className={styles.trophy}>
          <defs>
            <linearGradient id="trophyGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffd97a" />
              <stop offset="100%" stopColor="#b87f17" />
            </linearGradient>
          </defs>
          <path
            d="M11 6 H25 V14 C25 19 22 22 18 22 C14 22 11 19 11 14 Z"
            fill="url(#trophyGold)"
            stroke="#a05f00"
            strokeWidth="1"
          />
          <path d="M7 8 H11 V12 C9 12 7 11 7 8 Z" fill="#7f5500" />
          <path d="M29 8 H25 V12 C27 12 29 11 29 8 Z" fill="#7f5500" />
          <rect x="15" y="22" width="6" height="3" fill="#7f5500" />
          <rect x="11" y="25" width="14" height="3" rx="1" fill="#a05f00" />
          <rect x="9" y="28" width="18" height="3" rx="1.5" fill="#7f5500" />
          <text
            x="18"
            y="16"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="6"
            fontWeight="800"
            fill="#3a2400"
          >
            OFM
          </text>
        </svg>
      </div>
      <div className={styles.copy}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
        {body ? <p className={styles.body}>{body}</p> : null}
      </div>
      {points ? <span className={styles.points}>{points}</span> : null}
      <button
        type="button"
        className={styles.close}
        onClick={onClose}
        aria-label="Dismiss achievement"
      >
        <svg viewBox="0 0 16 16" width="12" height="12">
          <path
            d="M4 4 L12 12 M12 4 L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}

export default AchievementUnlockToast
