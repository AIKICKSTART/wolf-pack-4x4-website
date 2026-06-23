"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion"
import {
  useCallback,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react"

import styles from "./tilt.module.css"

export interface TiltProps {
  children: ReactNode
  /** Max rotation in degrees on each axis. Defaults to 8. */
  maxRotate?: number
  /** Spring stiffness for the tilt easing. */
  stiffness?: number
  /** Spring damping for the tilt easing. */
  damping?: number
  className?: string
}

/**
 * 3D tilt wrapper. Pointer position drives rotateX/rotateY (clamped),
 * the child renders inside a perspective container. Reduced-motion
 * disables the tilt entirely.
 */
export function Tilt({
  children,
  maxRotate = 8,
  stiffness = 200,
  damping = 16,
  className,
}: TiltProps) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLSpanElement | null>(null)

  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const springX = useSpring(px, { stiffness, damping })
  const springY = useSpring(py, { stiffness, damping })

  // px/py are -1..1; transform to a rotation range.
  const rotateY = useTransform(springX, [-1, 1], [-maxRotate, maxRotate])
  const rotateX = useTransform(springY, [-1, 1], [maxRotate, -maxRotate])

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
      const relX = (event.clientX - rect.left) / rect.width - 0.5
      const relY = (event.clientY - rect.top) / rect.height - 0.5
      px.set(Math.max(-0.5, Math.min(0.5, relX)) * 2)
      py.set(Math.max(-0.5, Math.min(0.5, relY)) * 2)
    },
    [reduceMotion, px, py],
  )

  const reset = useCallback(() => {
    px.set(0)
    py.set(0)
  }, [px, py])

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
        className={styles.surface}
        style={reduceMotion ? undefined : { rotateX, rotateY }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default Tilt
