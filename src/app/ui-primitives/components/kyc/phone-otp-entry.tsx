"use client"

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react"

import styles from "./phone-otp-entry.module.css"

const DIGIT_REGEX = /^\d$/
const OTP_LENGTH = 6

export interface PhoneOtpEntryProps {
  /** Eyebrow label, e.g. "Mobile verification". */
  kicker: string
  /** Headline above the pad. */
  title: string
  /** Country code prefix, e.g. "+61". */
  countryCode: string
  /** Phone number rendered next to the country code. */
  phoneNumber: string
  /** Seconds until the user can resend the code. */
  resendSeconds: number
  /** Fired when 6 digits are entered. */
  onComplete?: (code: string) => void
  /** Fired when the user taps resend. */
  onResend?: () => void
  hasError?: boolean
  className?: string
}

function formatTime(secs: number): string {
  const safe = Math.max(0, Math.floor(secs))
  const m = Math.floor(safe / 60)
  const s = safe % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function PhoneOtpEntry({
  kicker,
  title,
  countryCode,
  phoneNumber,
  resendSeconds,
  onComplete,
  onResend,
  hasError = false,
  className,
}: PhoneOtpEntryProps) {
  const groupId = useId()
  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => ""),
  )
  const [secondsLeft, setSecondsLeft] = useState<number>(resendSeconds)
  const refs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (secondsLeft <= 0) return undefined
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [secondsLeft])

  const apply = useCallback(
    (next: string[]) => {
      setDigits(next)
      const joined = next.join("")
      if (joined.length === OTP_LENGTH && next.every((d) => DIGIT_REGEX.test(d))) {
        onComplete?.(joined)
      }
    },
    [onComplete],
  )

  const handleChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value.replace(/\D/g, "")
      const next = [...digits]
      if (raw.length === 0) {
        next[index] = ""
        apply(next)
        return
      }
      const char = raw[raw.length - 1]
      next[index] = char
      apply(next)
      if (index < OTP_LENGTH - 1) {
        refs.current[index + 1]?.focus()
        refs.current[index + 1]?.select()
      }
    }

  const handleKeyDown =
    (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace") {
        if (digits[index]) return
        event.preventDefault()
        const next = [...digits]
        if (index > 0) {
          next[index - 1] = ""
          apply(next)
          refs.current[index - 1]?.focus()
        }
        return
      }
      if (event.key === "ArrowLeft" && index > 0) {
        event.preventDefault()
        refs.current[index - 1]?.focus()
        return
      }
      if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
        event.preventDefault()
        refs.current[index + 1]?.focus()
      }
    }

  const handlePaste =
    (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
      const text = event.clipboardData.getData("text").replace(/\D/g, "")
      if (!text) return
      event.preventDefault()
      const next = [...digits]
      let cursor = index
      for (const char of text) {
        if (cursor >= OTP_LENGTH) break
        next[cursor] = char
        cursor += 1
      }
      apply(next)
      const focusTarget = Math.min(cursor, OTP_LENGTH - 1)
      refs.current[focusTarget]?.focus()
    }

  const handleResend = () => {
    if (secondsLeft > 0) return
    setSecondsLeft(resendSeconds)
    onResend?.()
  }

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-labelledby={`${groupId}-title`}
      data-invalid={hasError || undefined}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 id={`${groupId}-title`} className={styles.title}>
          {title}
        </h3>
        <p className={styles.target}>
          Sent to{" "}
          <span className={styles.prefix}>{countryCode}</span>
          <span className={styles.phone}>{phoneNumber}</span>
        </p>
      </header>

      <div
        className={styles.pad}
        role="group"
        aria-label="One-time SMS verification code"
        data-invalid={hasError || undefined}
      >
        {digits.map((digit, index) => {
          const cellId = `${groupId}-cell-${index}`
          return (
            <span key={cellId} className={styles.cellWrap}>
              <input
                ref={(el) => {
                  refs.current[index] = el
                }}
                id={cellId}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                className={styles.cell}
                value={digit}
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
                onPaste={handlePaste(index)}
                onFocus={(event) => event.target.select()}
                aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                aria-invalid={hasError || undefined}
                data-filled={digit !== ""}
              />
              <span className={styles.underline} aria-hidden="true" />
            </span>
          )
        })}
      </div>

      <footer className={styles.foot}>
        {secondsLeft > 0 ? (
          <span className={styles.timer}>
            Resend in <strong>{formatTime(secondsLeft)}</strong>
          </span>
        ) : (
          <button
            type="button"
            className={styles.resendCta}
            onClick={handleResend}
          >
            Resend code
          </button>
        )}
        {hasError ? (
          <span className={styles.error} role="alert">
            That code didn’t match — try again.
          </span>
        ) : null}
      </footer>
    </section>
  )
}

export default PhoneOtpEntry
