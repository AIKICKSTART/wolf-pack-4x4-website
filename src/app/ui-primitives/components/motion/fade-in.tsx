"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, type ReactNode } from "react"

import { durations, easings } from "./motion-tokens"

export interface FadeInProps {
  children: ReactNode
  /** Optional delay (ms) before the fade begins. */
  delay?: number
  /** Duration override (ms). Defaults to the `slow` token. */
  duration?: number
  className?: string
}

/**
 * Single-purpose fade-in wrapper. Animates only opacity — used when a
 * transform would feel busy (e.g. dense type, full-bleed media).
 */
export function FadeIn({
  children,
  delay = 0,
  duration,
  className,
}: FadeInProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  const visible = reduceMotion || inView
  const ms = duration ?? durations.slow

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{
        duration: ms / 1000,
        ease: [...easings.standard] as [number, number, number, number],
        delay: delay / 1000,
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
