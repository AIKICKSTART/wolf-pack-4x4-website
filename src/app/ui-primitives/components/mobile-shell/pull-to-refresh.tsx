"use client"

import { ArrowDown, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

import styles from "./pull-to-refresh.module.css"

interface PullToRefreshProps {
  progress: number
  state?: "idle" | "armed" | "loading"
  label?: string
  className?: string
}

function readReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function PullToRefresh({
  progress,
  state = "idle",
  label,
  className,
}: PullToRefreshProps) {
  const clamped = Math.max(0, Math.min(1, progress))
  const [reduceMotion, setReduceMotion] = useState<boolean>(readReducedMotion)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (event: MediaQueryListEvent) => setReduceMotion(event.matches)
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  const computedState = state
  const isLoading = computedState === "loading"
  const isArmed = computedState === "armed" || clamped >= 1
  const indicatorClasses = [
    styles.indicator,
    isLoading ? styles.loading : "",
    isArmed && !isLoading ? styles.armed : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <div
        className={indicatorClasses}
        style={{
          opacity: clamped,
          transform: `translateY(${Math.round(clamped * 8 - 8)}px) scale(${0.85 + clamped * 0.15})`,
        }}
        aria-live="polite"
      >
        <span className={styles.iconWrap} aria-hidden="true">
          {isLoading || reduceMotion ? (
            <RefreshCw size={16} strokeWidth={2.4} />
          ) : (
            <ArrowDown
              size={16}
              strokeWidth={2.4}
              style={{
                transform: `rotate(${isArmed ? 180 : 0}deg)`,
                transition: "transform 200ms ease",
              }}
            />
          )}
        </span>
        <span className={styles.label}>
          {label ?? (isLoading ? "Refreshing" : isArmed ? "Release to refresh" : "Pull down")}
        </span>
      </div>
    </div>
  )
}

export default PullToRefresh
