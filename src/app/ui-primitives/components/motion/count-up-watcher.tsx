"use client"

import { useInView } from "framer-motion"
import { useRef } from "react"

import { CountUp } from "../primitives/count-up"

export interface CountUpWatcherProps {
  /** Target value to count to. */
  to: number
  /** Starting value. Defaults to 0. */
  from?: number
  /** Tween duration (ms). */
  duration?: number
  /** Decimal places. */
  decimals?: number
  /** Optional prefix string (e.g. `$`). */
  prefix?: string
  /** Optional suffix string (e.g. `kw`). */
  suffix?: string
  /** Thousands separator. */
  separator?: string
  /** Override the spoken label. */
  ariaLabel?: string
  /** Fraction of the element that must be visible to trigger. */
  amount?: number
  className?: string
}

/**
 * Wraps the existing `CountUp` primitive with an in-view gate so the
 * count only begins once the element enters the viewport. Before that,
 * a placeholder occupies the same space at the resting value.
 */
export function CountUpWatcher({
  to,
  from = 0,
  duration,
  decimals,
  prefix,
  suffix,
  separator,
  ariaLabel,
  amount = 0.4,
  className,
}: CountUpWatcherProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount })

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          to={to}
          from={from}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          ariaLabel={ariaLabel}
        />
      ) : (
        <CountUp
          to={from}
          from={from}
          duration={0}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          ariaLabel={ariaLabel}
        />
      )}
    </span>
  )
}

export default CountUpWatcher
