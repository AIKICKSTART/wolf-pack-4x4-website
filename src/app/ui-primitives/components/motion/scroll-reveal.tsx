"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef, type ReactNode } from "react"

export interface ScrollRevealProps {
  children: ReactNode
  /**
   * Optional `from` scroll progress (0..1). Element opacity starts ramping
   * from 0 at this point.
   */
  startProgress?: number
  /**
   * Optional `to` scroll progress (0..1). Element reaches full opacity at
   * this point.
   */
  endProgress?: number
  /** Y-axis drift in pixels across the scroll window. */
  yDrift?: number
  className?: string
}

/**
 * Generic scroll-driven reveal. Unlike `Reveal` (which is a single-step
 * in-view trigger), this primitive ramps opacity + drift continuously as
 * the element progresses through the viewport.
 */
export function ScrollReveal({
  children,
  startProgress = 0,
  endProgress = 0.6,
  yDrift = 40,
  className,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    [0, 1],
  )
  const y = useTransform(
    scrollYProgress,
    [startProgress, endProgress],
    [yDrift, 0],
  )

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { opacity, y }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
