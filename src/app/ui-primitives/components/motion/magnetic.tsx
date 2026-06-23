"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import {
  useCallback,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react"

import styles from "./magnetic.module.css"

export interface MagneticProps {
  children: ReactNode
  /** Max pixel offset the child can be pulled. Defaults to 14. */
  strength?: number
  /** Spring stiffness for the pull. Higher = snappier. */
  stiffness?: number
  /** Spring damping. Higher = less wobble. */
  damping?: number
  className?: string
}

/**
 * Magnetic hover wrapper. The wrapped child is attracted toward the
 * pointer when the pointer is over the wrapper's bounding box. Under
 * reduced-motion the wrapper is inert.
 */
export function Magnetic({
  children,
  strength = 14,
  stiffness = 220,
  damping = 18,
  className,
}: MagneticProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness, damping })
  const springY = useSpring(y, { stiffness, damping })

  const handleMove = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (reduceMotion) {
        return
      }
      const node = ref.current
      if (!node) {
        return
      }
      const rect = node.getBoundingClientRect()
      const relX = event.clientX - (rect.left + rect.width / 2)
      const relY = event.clientY - (rect.top + rect.height / 2)
      const clampedX = Math.max(-strength, Math.min(strength, (relX / rect.width) * strength * 2))
      const clampedY = Math.max(-strength, Math.min(strength, (relY / rect.height) * strength * 2))
      x.set(clampedX)
      y.set(clampedY)
    },
    [reduceMotion, strength, x, y],
  )

  const reset = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <span
      ref={ref}
      className={classes}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <motion.span
        style={{
          display: "inline-block",
          x: springX,
          y: springY,
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default Magnetic
