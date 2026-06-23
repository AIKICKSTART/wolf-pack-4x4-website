"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Gift, Sparkles } from "lucide-react"
import { useRef, useState, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react"

import { CountUp } from "../primitives/count-up"

import styles from "./gift-card-redeem.module.css"

const SEGMENTS = 4 as const
const SEGMENT_LENGTH = 4 as const

export interface GiftCardRedeemResult {
  balance: number
  currency: string
}

interface GiftCardRedeemProps {
  onRedeem?: (code: string) => void
  redeemed?: GiftCardRedeemResult | null
  busy?: boolean
  error?: string
}

function sanitize(value: string): string {
  return value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, SEGMENT_LENGTH)
}

export function GiftCardRedeem({ onRedeem, redeemed, busy = false, error }: GiftCardRedeemProps) {
  const [segments, setSegments] = useState<string[]>(() => Array(SEGMENTS).fill(""))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const reducedMotion = useReducedMotion()

  const fullCode = segments.join("")
  const isComplete = segments.every((seg) => seg.length === SEGMENT_LENGTH)

  const focusIndex = (index: number) => {
    const target = inputsRef.current[index]
    target?.focus()
    target?.select()
  }

  const handleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const next = sanitize(event.target.value)
    const updated = [...segments]
    updated[index] = next
    setSegments(updated)
    if (next.length === SEGMENT_LENGTH && index < SEGMENTS - 1) {
      focusIndex(index + 1)
    }
  }

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && segments[index].length === 0 && index > 0) {
      event.preventDefault()
      focusIndex(index - 1)
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault()
      focusIndex(index - 1)
    }
    if (event.key === "ArrowRight" && index < SEGMENTS - 1) {
      event.preventDefault()
      focusIndex(index + 1)
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text")
    const cleaned = pasted.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
    if (cleaned.length === 0) {
      return
    }
    event.preventDefault()
    const updated = [...segments]
    for (let i = 0; i < SEGMENTS; i += 1) {
      updated[i] = cleaned.slice(i * SEGMENT_LENGTH, (i + 1) * SEGMENT_LENGTH)
    }
    setSegments(updated)
    const lastFilled = updated.findIndex((seg) => seg.length < SEGMENT_LENGTH)
    focusIndex(lastFilled === -1 ? SEGMENTS - 1 : lastFilled)
  }

  const handleSubmit = () => {
    if (!isComplete || busy) {
      return
    }
    onRedeem?.(fullCode)
  }

  return (
    <section className={styles.surface} aria-labelledby="gift-card-title">
      <header className={styles.head}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Gift size={24} strokeWidth={1.6} />
        </span>
        <div>
          <span className={styles.kicker}>Workshop credit</span>
          <h2 id="gift-card-title" className={styles.title}>Redeem a gift card</h2>
          <p className={styles.copy}>
            Enter the 16-character code from the back of your gift card. Spaces are added automatically.
          </p>
        </div>
      </header>

      <div className={styles.segments} aria-live="polite">
        {segments.map((segment, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            maxLength={SEGMENT_LENGTH}
            value={segment}
            placeholder="XXXX"
            aria-label={`Gift card segment ${index + 1} of ${SEGMENTS}`}
            aria-invalid={Boolean(error)}
            className={styles.segment}
            onChange={handleChange(index)}
            onKeyDown={handleKeyDown(index)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      {error && (
        <p className={styles.error} role="alert">{error}</p>
      )}

      <button
        type="button"
        className={styles.cta}
        onClick={handleSubmit}
        disabled={!isComplete || busy}
      >
        <Sparkles size={16} aria-hidden="true" />
        <span>{busy ? "Checking…" : "Redeem credit"}</span>
      </button>

      <AnimatePresence>
        {redeemed && (
          <motion.output
            className={styles.balance}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.balanceLabel}>Balance added</span>
            <strong className={styles.balanceValue}>
              <CountUp
                to={redeemed.balance}
                decimals={2}
                prefix="$"
              />
              <span className={styles.balanceCurrency}>{redeemed.currency}</span>
            </strong>
            <span className={styles.balanceFineprint}>
              Credit appears in your wallet within a minute. No expiry.
            </span>
          </motion.output>
        )}
      </AnimatePresence>
    </section>
  )
}

export default GiftCardRedeem
