"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

import { durations, easings } from "./motion-tokens"
import styles from "./morph-text.module.css"

export type MorphTrigger = "hover" | "interval"

export interface MorphTextProps {
  /** First string — the resting state. */
  from: string
  /** Second string — the morphed state. */
  to: string
  /** What flips the text. */
  trigger?: MorphTrigger
  /** When `trigger === "interval"`, how long each state lasts (ms). */
  intervalMs?: number
  className?: string
}

/**
 * Animates between two strings using a stacked cross-fade. The wider of
 * the two strings is rendered invisibly inside the layout so the text
 * does not jump in width as it flips.
 */
export function MorphText({
  from,
  to,
  trigger = "hover",
  intervalMs = 2400,
  className,
}: MorphTextProps) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (trigger !== "interval" || reduceMotion) {
      return
    }
    const id = window.setInterval(() => {
      setActive((current) => !current)
    }, Math.max(400, intervalMs))
    return () => window.clearInterval(id)
  }, [trigger, intervalMs, reduceMotion])

  const handleEnter = useCallback(() => {
    if (trigger === "hover" && !reduceMotion) {
      setActive(true)
    }
  }, [trigger, reduceMotion])

  const handleLeave = useCallback(() => {
    if (trigger === "hover") {
      setActive(false)
    }
  }, [trigger])

  const widest = from.length >= to.length ? from : to
  const current = active ? to : from
  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <span
      className={classes}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      aria-live="polite"
    >
      {/* Invisible sizer that holds the larger of the two strings open. */}
      <span className={styles.sizer} aria-hidden="true">{widest}</span>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={current}
          className={styles.layer}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{
            duration: durations.normal / 1000,
            ease: [...easings.standard] as [number, number, number, number],
          }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default MorphText
