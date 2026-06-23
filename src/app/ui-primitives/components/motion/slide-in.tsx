"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, type ReactNode } from "react"

import { durations, easings } from "./motion-tokens"

export type SlideDirection = "left" | "right" | "up" | "down"

export interface SlideInProps {
  children: ReactNode
  /** Where the element slides in from. Defaults to `left`. */
  from?: SlideDirection
  /** Distance travelled (px). Defaults to 60. */
  distance?: number
  /** Optional delay (ms) before the slide kicks off. */
  delay?: number
  className?: string
}

const DIRECTION_VECTOR: Record<SlideDirection, { x: number; y: number }> = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
}

/**
 * Directional slide-in wrapper with the umbrella `emphasized` easing.
 * Pairs a transform with opacity so the element does not appear to fly
 * in from off-screen with full visibility.
 */
export function SlideIn({
  children,
  from = "left",
  distance = 60,
  delay = 0,
  className,
}: SlideInProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const vector = DIRECTION_VECTOR[from]
  const hidden = reduceMotion
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, x: vector.x * distance, y: vector.y * distance }
  const visible = { opacity: 1, x: 0, y: 0 }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={reduceMotion || inView ? visible : hidden}
      transition={{
        duration: durations.slow / 1000,
        ease: [...easings.emphasized] as [number, number, number, number],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}

export default SlideIn
