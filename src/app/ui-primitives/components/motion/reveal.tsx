"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef, type ReactNode } from "react"

import { durations, easings } from "./motion-tokens"
import styles from "./reveal.module.css"

export type RevealDirection = "below" | "above" | "left" | "right" | "fade"

export type RevealTag = "div" | "section" | "article" | "li" | "span"

export interface RevealProps {
  children: ReactNode
  /** Where the element travels from before entering view. */
  from?: RevealDirection
  /** Optional delay (ms) before the reveal kicks off. */
  delay?: number
  /** Override the default offset distance (px). */
  distance?: number
  /** Render the wrapper as a specific HTML tag (default: `div`). */
  as?: RevealTag
  className?: string
}

const OFFSET: Record<RevealDirection, { x: number; y: number }> = {
  below: { x: 0, y: 1 },
  above: { x: 0, y: -1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  fade: { x: 0, y: 0 },
}

/**
 * Generic in-view reveal wrapper. Animates a single transform + opacity
 * step when the element scrolls into view; under reduced-motion the final
 * state is shown immediately.
 */
export function Reveal({
  children,
  from = "below",
  delay = 0,
  distance = 24,
  as = "div",
  className,
}: RevealProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  const offset = OFFSET[from]
  const hiddenState = reduceMotion
    ? { opacity: 1, x: 0, y: 0 }
    : { opacity: 0, x: offset.x * distance, y: offset.y * distance }

  const visibleState = { opacity: 1, x: 0, y: 0 }
  const animate = reduceMotion || inView ? visibleState : hiddenState

  const transition = {
    duration: durations.slow / 1000,
    ease: [...easings.decel] as [number, number, number, number],
    delay: delay / 1000,
  }

  const classes = [styles.root, className].filter(Boolean).join(" ")

  const sharedProps = {
    className: classes,
    initial: hiddenState,
    animate,
    transition,
  } as const

  // react accepts a ref of any element shape at runtime; the cross-tag union
  // forces us to widen at the call site. Each branch narrows the ref locally.
  switch (as) {
    case "section":
      return (
        <motion.section
          ref={ref as unknown as React.RefObject<HTMLElement | null>}
          {...sharedProps}
        >
          {children}
        </motion.section>
      )
    case "article":
      return (
        <motion.article
          ref={ref as unknown as React.RefObject<HTMLElement | null>}
          {...sharedProps}
        >
          {children}
        </motion.article>
      )
    case "li":
      return (
        <motion.li
          ref={ref as unknown as React.RefObject<HTMLLIElement | null>}
          {...sharedProps}
        >
          {children}
        </motion.li>
      )
    case "span":
      return (
        <motion.span
          ref={ref as unknown as React.RefObject<HTMLSpanElement | null>}
          {...sharedProps}
        >
          {children}
        </motion.span>
      )
    default:
      return (
        <motion.div ref={ref} {...sharedProps}>
          {children}
        </motion.div>
      )
  }
}

export default Reveal
