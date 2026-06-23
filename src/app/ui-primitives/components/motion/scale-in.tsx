"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, type ReactNode } from "react"

import { durations, easings } from "./motion-tokens"

export interface ScaleInProps {
  children: ReactNode
  /** Starting scale factor. Defaults to 0.95. */
  from?: number
  /** Optional delay (ms) before the scale begins. */
  delay?: number
  /** Transform-origin for the scale (CSS string). */
  origin?: string
  className?: string
}

/**
 * Scale-from-N-to-1 wrapper. Useful for tiles, badges, and pictogram
 * micro-entrances — pairs the scale with opacity to avoid a jumpy land.
 */
export function ScaleIn({
  children,
  from = 0.95,
  delay = 0,
  origin = "center",
  className,
}: ScaleInProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const hidden = reduceMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: from }
  const visible = { opacity: 1, scale: 1 }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformOrigin: origin }}
      initial={hidden}
      animate={reduceMotion || inView ? visible : hidden}
      transition={{
        duration: durations.normal / 1000,
        ease: [...easings.decel] as [number, number, number, number],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}

export default ScaleIn
