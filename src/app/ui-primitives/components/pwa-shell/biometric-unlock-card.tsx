"use client"

import { Fingerprint, ScanFace, ShieldCheck } from "lucide-react"

import type { PwaBiometricKind } from "./pwa-shell-types"
import styles from "./biometric-unlock-card.module.css"

type BiometricState = "idle" | "scanning" | "success" | "error"

interface BiometricUnlockCardProps {
  kind: PwaBiometricKind
  state?: BiometricState
  crewName?: string
  crewRole?: string
  initials?: string
  pinLength?: number
  pinFilled?: number
  errorMessage?: string
  onScan?: () => void
  onUsePin?: () => void
  className?: string
}

const KIND_LABEL: Record<PwaBiometricKind, string> = {
  touch: "Touch ID",
  face: "Face ID",
  fingerprint: "Fingerprint",
}

const KIND_HINT: Record<PwaBiometricKind, string> = {
  touch: "Hold home button",
  face: "Look at the screen",
  fingerprint: "Tap the sensor",
}

const STATE_HINT: Record<BiometricState, string> = {
  idle: "Tap to unlock",
  scanning: "Reading...",
  success: "Welcome back",
  error: "Try again",
}

const STATE_CLASS: Record<BiometricState, string> = {
  idle: "",
  scanning: styles.scanning,
  success: styles.success,
  error: styles.error,
}

export function BiometricUnlockCard({
  kind,
  state = "idle",
  crewName = "Roo Ainsworth",
  crewRole = "Lead Mechanic · Bay 2",
  initials = "RA",
  pinLength = 4,
  pinFilled = 0,
  errorMessage,
  onScan,
  onUsePin,
  className,
}: BiometricUnlockCardProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ")
  const Icon = kind === "face" ? ScanFace : kind === "fingerprint" ? Fingerprint : ShieldCheck
  const filled = Math.max(0, Math.min(pinLength, pinFilled))
  const hint =
    state === "error" && errorMessage
      ? errorMessage
      : state === "idle"
        ? `${KIND_LABEL[kind]} · ${KIND_HINT[kind]}`
        : STATE_HINT[state]

  return (
    <section className={classes} aria-label={`Biometric unlock with ${KIND_LABEL[kind]}`}>
      <div className={styles.identity}>
        <span className={styles.avatar} aria-hidden="true">
          {initials}
        </span>
        <h2 className={styles.crewName}>{crewName}</h2>
        <p className={styles.crewRole}>{crewRole}</p>
      </div>
      <div className={styles.unlock}>
        <button
          type="button"
          className={[styles.unlockBtn, STATE_CLASS[state]].filter(Boolean).join(" ")}
          onClick={onScan}
          aria-label={`${KIND_LABEL[kind]} ${STATE_HINT[state]}`}
          aria-pressed={state === "scanning"}
          disabled={state === "success"}
        >
          <Icon size={42} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <p className={styles.unlockHint} role="status" aria-live="polite">
          {hint}
        </p>
      </div>
      <div className={styles.fallback}>
        <p className={styles.fallbackLabel}>Or use crew PIN</p>
        <div
          className={styles.pinRow}
          role="img"
          aria-label={`PIN ${filled} of ${pinLength} digits entered`}
        >
          {Array.from({ length: pinLength }, (_, index) => (
            <span
              key={index}
              className={[styles.pinDot, index < filled ? styles.pinDotFilled : ""]
                .filter(Boolean)
                .join(" ")}
              aria-hidden="true"
            />
          ))}
        </div>
        {onUsePin && (
          <button type="button" className={styles.fallbackBtn} onClick={onUsePin}>
            Enter PIN
          </button>
        )}
      </div>
    </section>
  )
}

export default BiometricUnlockCard
