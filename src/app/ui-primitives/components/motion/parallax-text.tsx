"use client"

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef, type ReactNode } from "react"

import styles from "./parallax-text.module.css"

export interface ParallaxTextProps {
  children: ReactNode
  /**
   * How much the text drifts in pixels across the scroll window.
   * Positive = downward translate as the user scrolls down.
   */
  range?: number
  className?: string
}

/**
 * Long-form text whose y-position drifts on scroll. Uses framer-motion's
 * `useScroll` against the wrapper element so the parallax decouples from
 * the page scroll position.
 */
export function ParallaxText({
  children,
  range = 60,
  className,
}: ParallaxTextProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-range, range])

  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <div ref={ref} className={classes}>
      <motion.div
        className={styles.layer}
        style={reduceMotion ? undefined : { y }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxText
