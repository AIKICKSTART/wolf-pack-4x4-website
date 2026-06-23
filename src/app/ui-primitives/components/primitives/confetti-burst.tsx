"use client"

import confetti from "canvas-confetti"
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from "react"

import styles from "./confetti-burst.module.css"

export interface ConfettiBurstOptions {
  particleCount?: number
  spread?: number
  startVelocity?: number
  ticks?: number
  colors?: string[]
  scalar?: number
}

export interface ConfettiBurstHandle {
  fire: (options?: ConfettiBurstOptions) => void
  cannon: (options?: ConfettiBurstOptions) => void
}

interface ConfettiBurstProps {
  defaults?: ConfettiBurstOptions
  className?: string
  ariaLabel?: string
}

/**
 * Brand palette literals mirroring the central primitive tokens
 * (--primitive-red / -amber / -teal / -green / -text-strong). canvas-confetti
 * renders to a raw <canvas> and cannot resolve CSS custom properties, so the
 * hex values are kept here as documented brand-data literals (per the
 * tokenization-sweep allowlist) rather than token references.
 */
const PALETTE = ["#e62028", "#ffc14f", "#40bcff", "#37d67a", "#ffffff"]

export const ConfettiBurst = forwardRef<ConfettiBurstHandle, ConfettiBurstProps>(
  function ConfettiBurst({ defaults, className, ariaLabel = "Celebration animation surface" }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const instanceRef = useRef<confetti.CreateTypes | null>(null)
    const [reduceMotion, setReduceMotion] = useState(false)

    useEffect(() => {
      if (typeof window === "undefined") {
        return
      }
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
      const update = () => setReduceMotion(mql.matches)
      update()
      mql.addEventListener("change", update)
      return () => mql.removeEventListener("change", update)
    }, [])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }
      instanceRef.current = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      })
      return () => {
        instanceRef.current?.reset()
        instanceRef.current = null
      }
    }, [])

    const baseOptions = useCallback<() => ConfettiBurstOptions>(
      () => ({
        particleCount: 90,
        spread: 70,
        startVelocity: 38,
        ticks: 220,
        scalar: 1,
        colors: PALETTE,
        ...defaults,
      }),
      [defaults],
    )

    const fire = useCallback(
      (options?: ConfettiBurstOptions) => {
        if (reduceMotion) {
          return
        }
        const instance = instanceRef.current
        if (!instance) {
          return
        }
        instance({
          ...baseOptions(),
          ...options,
          origin: { x: 0.5, y: 0.6 },
        })
      },
      [baseOptions, reduceMotion],
    )

    const cannon = useCallback(
      (options?: ConfettiBurstOptions) => {
        if (reduceMotion) {
          return
        }
        const instance = instanceRef.current
        if (!instance) {
          return
        }
        const merged = { ...baseOptions(), ...options }
        instance({
          ...merged,
          angle: 60,
          origin: { x: 0, y: 0.7 },
        })
        instance({
          ...merged,
          angle: 120,
          origin: { x: 1, y: 0.7 },
        })
      },
      [baseOptions, reduceMotion],
    )

    useImperativeHandle(ref, () => ({ fire, cannon }), [fire, cannon])

    const classes = [styles.surface, className].filter(Boolean).join(" ")

    return (
      <span className={classes} aria-label={ariaLabel} role="presentation">
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          aria-hidden="true"
          style={{ "--confetti-zindex": 30 } as CSSProperties}
        />
      </span>
    )
  },
)

export default ConfettiBurst
