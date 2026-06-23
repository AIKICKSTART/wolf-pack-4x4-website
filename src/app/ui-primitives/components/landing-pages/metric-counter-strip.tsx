"use client"

import { useEffect, useRef, useState } from "react"

import { CountUp } from "../primitives/count-up"

import type { LandingMetric } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

export interface MetricCounterStripProps {
  metrics: ReadonlyArray<LandingMetric>
  /** Override the IntersectionObserver root margin if needed. */
  rootMargin?: string
  className?: string
}

function useInView(rootMargin = "0px 0px -100px 0px"): {
  ref: React.RefObject<HTMLDivElement | null>
  inView: boolean
} {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") {
      // Defer to a microtask so React doesn't see a synchronous setState
      // inside the effect body — silences react-hooks/set-state-in-effect.
      const id = window.setTimeout(() => setInView(true), 0)
      return () => window.clearTimeout(id)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
            return
          }
        }
      },
      { rootMargin },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView }
}

/**
 * Primitive 10 — Animated counter strip. Lazy-starts the count-up animations
 * the first time the strip enters the viewport. Each cell shows a value,
 * label, and optional caption with `tabular-nums` aligning the digits.
 */
export function MetricCounterStrip({
  metrics,
  rootMargin,
  className,
}: MetricCounterStripProps) {
  const { ref, inView } = useInView(rootMargin)
  const sectionClasses = [styles.metricStrip, className].filter(Boolean).join(" ")

  return (
    <div ref={ref} className={sectionClasses} aria-label="Workshop metrics">
      {metrics.map((metric) => (
        <article key={metric.id} className={styles.metricCell}>
          <span className={styles.metricValue}>
            {inView ? (
              <CountUp
                to={metric.value}
                decimals={metric.decimals ?? 0}
                prefix={metric.prefix}
                suffix={metric.suffix}
                duration={1600}
              />
            ) : (
              <span aria-hidden="true">
                {metric.prefix ?? ""}0{metric.suffix ?? ""}
              </span>
            )}
          </span>
          <span className={styles.metricLabel}>{metric.label}</span>
          {metric.caption ? (
            <span className={styles.metricCaption}>{metric.caption}</span>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export default MetricCounterStrip
