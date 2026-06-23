"use client"

import { AnimatePresence, motion } from "framer-motion"

import styles from "./loading-overlay.module.css"

export type LoadingOverlayTone = "red" | "amber" | "teal"

interface LoadingOverlayProps {
  open: boolean
  message?: string
  detail?: string
  tone?: LoadingOverlayTone
  /** When true, fixed to viewport. Otherwise absolute to the nearest positioned parent. */
  fixed?: boolean
  ariaLabel?: string
}

const TONE_CLASS: Record<LoadingOverlayTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
}

export function LoadingOverlay({
  open,
  message,
  detail,
  tone = "red",
  fixed = false,
  ariaLabel = "Loading",
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={[styles.veil, TONE_CLASS[tone], fixed ? styles.fixed : styles.absolute].join(" ")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          aria-label={ariaLabel}
          aria-busy="true"
        >
          <div className={styles.spinnerWrap} aria-hidden="true">
            <svg
              className={styles.spinner}
              viewBox="0 0 50 50"
              width="50"
              height="50"
              focusable="false"
            >
              <circle className={styles.spinnerTrack} cx="25" cy="25" r="20" />
              <circle className={styles.spinnerArc} cx="25" cy="25" r="20" />
            </svg>
            <span className={styles.spinnerDot} aria-hidden="true" />
          </div>
          {message && <strong className={styles.message}>{message}</strong>}
          {detail && <span className={styles.detail}>{detail}</span>}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingOverlay
