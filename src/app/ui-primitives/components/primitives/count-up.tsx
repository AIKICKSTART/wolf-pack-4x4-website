"use client"

import { animated, useSpring } from "@react-spring/web"
import { useSyncExternalStore } from "react"

import styles from "./count-up.module.css"

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => undefined
  }
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function getReducedMotionServerSnapshot(): boolean {
  return false
}

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  ariaLabel?: string
  separator?: string
}

function formatValue(value: number, decimals: number, separator: string): string {
  const fixed = value.toFixed(decimals)
  if (!separator) {
    return fixed
  }
  const [whole, fraction] = fixed.split(".")
  const groupedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  return fraction ? `${groupedWhole}.${fraction}` : groupedWhole
}

export function CountUp({
  to,
  from = 0,
  duration = 1400,
  decimals = 0,
  prefix,
  suffix,
  className,
  ariaLabel,
  separator = ",",
}: CountUpProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )

  const spring = useSpring({
    from: { value: reduceMotion ? to : from },
    to: { value: to },
    config: { duration: Math.max(60, duration) },
    immediate: reduceMotion,
    reset: false,
  })

  const classes = [styles.countUp, className].filter(Boolean).join(" ")
  const label = ariaLabel ?? `${prefix ?? ""}${formatValue(to, decimals, separator)}${suffix ?? ""}`

  return (
    <span
      className={classes}
      role="text"
      aria-label={label}
    >
      {prefix && (
        <span className={styles.affix} aria-hidden="true">
          {prefix}
        </span>
      )}
      <animated.span aria-hidden="true" className={styles.value}>
        {spring.value.to((current) => formatValue(current, decimals, separator))}
      </animated.span>
      {suffix && (
        <span className={styles.affix} aria-hidden="true">
          {suffix}
        </span>
      )}
    </span>
  )
}

export default CountUp
