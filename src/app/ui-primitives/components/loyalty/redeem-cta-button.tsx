"use client"

import { Check, Loader2, ShieldAlert, Sparkles } from "lucide-react"
import { useCallback, useRef, useState } from "react"

import { ConfettiBurst, type ConfettiBurstHandle } from "../primitives/confetti-burst"

import styles from "./redeem-cta-button.module.css"

export type RedeemState = "idle" | "confirming" | "redeemed" | "fail"

interface RedeemCtaButtonProps {
  /** Reward label shown in the button. */
  label: string
  /** Points cost shown alongside the label. */
  pointsCost: number
  /** Async redeem handler. Resolve to success/failure. */
  onRedeem?: () => Promise<{ success: boolean; message?: string }>
  /** Override the failure message displayed in the fail state. */
  failureMessage?: string
  className?: string
}

const STATE_LABEL: Record<RedeemState, string> = {
  idle: "Redeem",
  confirming: "Hold to confirm…",
  redeemed: "Redeemed",
  fail: "Try again",
}

export function RedeemCtaButton({
  label,
  pointsCost,
  onRedeem,
  failureMessage = "Could not redeem — check balance",
  className,
}: RedeemCtaButtonProps) {
  const [state, setState] = useState<RedeemState>("idle")
  const confettiRef = useRef<ConfettiBurstHandle | null>(null)

  const reset = useCallback(() => {
    window.setTimeout(() => setState("idle"), 2400)
  }, [])

  const handleClick = useCallback(async () => {
    if (state === "redeemed" || state === "confirming") {
      return
    }
    setState("confirming")
    try {
      const result = await (onRedeem ? onRedeem() : Promise.resolve({ success: true }))
      if (result.success) {
        setState("redeemed")
        confettiRef.current?.fire({ particleCount: 120, spread: 90 })
        reset()
        return
      }
      setState("fail")
      reset()
    } catch {
      setState("fail")
      reset()
    }
  }, [onRedeem, reset, state])

  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <div className={classes} data-state={state}>
      <ConfettiBurst ref={confettiRef} className={styles.confetti} ariaLabel="Reward confetti" />
      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
        aria-live="polite"
        aria-disabled={state === "redeemed"}
      >
        <span className={styles.icon} aria-hidden="true">
          {state === "confirming" ? (
            <Loader2 size={16} strokeWidth={2.4} className={styles.spinner} />
          ) : state === "redeemed" ? (
            <Check size={16} strokeWidth={2.6} />
          ) : state === "fail" ? (
            <ShieldAlert size={16} strokeWidth={2.4} />
          ) : (
            <Sparkles size={16} strokeWidth={2.2} />
          )}
        </span>
        <span className={styles.copy}>
          <strong>{STATE_LABEL[state]}</strong>
          <small>
            {label} · {pointsCost.toLocaleString("en-AU")} pts
          </small>
        </span>
      </button>
      {state === "fail" ? (
        <p className={styles.failNote} role="status">
          {failureMessage}
        </p>
      ) : null}
    </div>
  )
}

export default RedeemCtaButton
