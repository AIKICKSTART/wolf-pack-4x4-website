"use client"

import { useEffect, useState } from "react"

import { AuthShell, LegalFineprint, TwoFactorPad } from "../../components/auth"
import { QuoteBubble } from "../../components/primitives"

import styles from "./two-factor.module.css"

const CODE_TTL_SECONDS = 60

function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remaining = seconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`
}

export function TwoFactorForm() {
  const [code, setCode] = useState("")
  const [remaining, setRemaining] = useState(CODE_TTL_SECONDS)
  const [error, setError] = useState<string | null>(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const expired = remaining === 0
  const isComplete = code.length === 6

  const handleVerify = () => {
    if (!isComplete) return
    if (code === "000000") {
      setError("That code didn't match. Try again or use a backup code.")
      return
    }
    setError(null)
    // visual demo — no real verify
  }

  const handleResend = () => {
    setRemaining(CODE_TTL_SECONDS)
    setError(null)
    setCode("")
  }

  return (
    <AuthShell
      kicker="Verification required"
      headline="Confirm it's you"
      tagline="We just sent a six-digit code to your authenticator. Drop it in below to finish signing in to the workshop."
      tone="teal"
      version="auth · 2fa · v2"
    >
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          handleVerify()
        }}
        noValidate
      >
        <header className={styles.head}>
          <span className={styles.eyebrow}>Two-factor</span>
          <h2 className={styles.title}>Enter your code</h2>
          <p className={styles.subtitle}>
            Open your authenticator and read the current six-digit code for{" "}
            <strong>Mufflermen — Workshop</strong>.
          </p>
        </header>

        <div className={styles.padWrap}>
          <TwoFactorPad
            value={code}
            onChange={setCode}
            onComplete={(value) => {
              setCode(value)
              if (value !== "000000") {
                setError(null)
              }
            }}
            hasError={Boolean(error)}
          />
          <p className={styles.errorRow} role="alert">
            {error}
          </p>
        </div>

        <div className={styles.timerCard} data-expired={expired || undefined}>
          <span>
            {expired ? "Code expired" : (
              <>
                Code refreshes in <strong>{formatSeconds(remaining)}</strong>
              </>
            )}
          </span>
          <button type="button" className={styles.linkButton} onClick={handleResend}>
            {expired ? "Request new code" : "Resend"}
          </button>
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={!isComplete || expired}
          >
            <span>Verify and continue</span>
            <span aria-hidden="true">→</span>
          </button>

          <div className={styles.altActions}>
            <button type="button" className={styles.linkButton}>
              Use a backup code
            </button>

            <span className={styles.tooltipWrap} data-open={tooltipOpen || undefined}>
              <button
                type="button"
                className={styles.tooltipTrigger}
                aria-label="Lost your device?"
                aria-expanded={tooltipOpen}
                onClick={() => setTooltipOpen((o) => !o)}
                onBlur={() => setTooltipOpen(false)}
              >
                ?
              </button>
              <span className={styles.tooltipBody}>
                <QuoteBubble side="top" tone="teal" label="Help">
                  Lost the device? Contact your workshop admin to issue a temporary code, or use
                  one of the backup codes we provided at setup.
                </QuoteBubble>
              </span>
            </span>
          </div>
        </div>

        <LegalFineprint />
      </form>
    </AuthShell>
  )
}
