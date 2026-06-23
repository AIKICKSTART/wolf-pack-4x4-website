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

import styles from "./two-factor-pad.module.css"

export interface TwoFactorPadProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  hasError?: boolean
  autoFocus?: boolean
  disabled?: boolean
  ariaLabel?: string
  className?: string
}

const DIGIT_REGEX = /^\d$/

export function TwoFactorPad({
  length = 6,
  value: controlledValue,
  onChange,
  onComplete,
  hasError = false,
  autoFocus = true,
  disabled = false,
  ariaLabel = "One-time verification code",
  className,
}: TwoFactorPadProps) {
  const groupId = useId()
  const [internalValue, setInternalValue] = useState<string[]>(() =>
    Array.from({ length }, () => ""),
  )
  const refs = useRef<Array<HTMLInputElement | null>>([])

  const value = controlledValue ?? internalValue.join("")
  const digits = Array.from({ length }, (_, i) => value[i] ?? "")

  const apply = useCallback(
    (next: string[]) => {
      const joined = next.join("")
      if (controlledValue === undefined) {
        setInternalValue(next)
      }
      onChange?.(joined)
      if (joined.length === length && next.every((d) => DIGIT_REGEX.test(d))) {
        onComplete?.(joined)
      }
    },
    [controlledValue, length, onChange, onComplete],
  )

  useEffect(() => {
    if (autoFocus && !disabled) {
      const firstEmpty = digits.findIndex((d) => d === "")
      const target = firstEmpty === -1 ? length - 1 : firstEmpty
      refs.current[target]?.focus()
    }
    // intentionally only at mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value.replace(/\D/g, "")
    const next = [...digits]
    if (raw.length === 0) {
      next[index] = ""
      apply(next)
      return
    }
    // take the latest typed character (handles single char or replaces existing)
    const char = raw[raw.length - 1]
    next[index] = char
    apply(next)
    if (index < length - 1) {
      refs.current[index + 1]?.focus()
      refs.current[index + 1]?.select()
    }
  }

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      if (digits[index]) {
        return
      }
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

    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault()
      refs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (index: number) => (event: ClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData.getData("text").replace(/\D/g, "")
    if (!text) return
    event.preventDefault()
    const next = [...digits]
    let cursor = index
    for (const char of text) {
      if (cursor >= length) break
      next[cursor] = char
      cursor += 1
    }
    apply(next)
    const focusTarget = Math.min(cursor, length - 1)
    refs.current[focusTarget]?.focus()
  }

  const handleFocus = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.select()
  }

  const classes = [styles.pad, className].filter(Boolean).join(" ")
  const midpoint = Math.floor(length / 2)

  return (
    <div
      className={classes}
      role="group"
      aria-label={ariaLabel}
      data-invalid={hasError || undefined}
    >
      {digits.map((digit, index) => {
        const cellId = `${groupId}-cell-${index}`
        const filled = digit !== ""
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
              onFocus={handleFocus}
              aria-label={`Digit ${index + 1} of ${length}`}
              aria-invalid={hasError || undefined}
              disabled={disabled}
              data-filled={filled}
              data-error={hasError}
            />
            <span className={styles.underline} aria-hidden="true" />
            {index === midpoint - 1 && length === 6 ? (
              <span className={styles.divider} aria-hidden="true">
                –
              </span>
            ) : null}
          </span>
        )
      })}
    </div>
  )
}

export default TwoFactorPad
