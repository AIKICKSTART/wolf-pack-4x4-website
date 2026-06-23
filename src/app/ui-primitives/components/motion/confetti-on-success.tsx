"use client"

import { useEffect, useRef } from "react"

import {
  ConfettiBurst,
  type ConfettiBurstHandle,
  type ConfettiBurstOptions,
} from "../primitives/confetti-burst"

export interface ConfettiOnSuccessProps {
  /** Flip this to true to fire the burst once. */
  active: boolean
  /** Burst options forwarded to ConfettiBurst. */
  options?: ConfettiBurstOptions
  /** Fire two angled cannons instead of a single centred burst. */
  mode?: "burst" | "cannon"
  className?: string
}

/**
 * Wraps `ConfettiBurst` and triggers a single burst when `active` flips
 * from false to true. Re-arms when `active` returns to false.
 */
export function ConfettiOnSuccess({
  active,
  options,
  mode = "burst",
  className,
}: ConfettiOnSuccessProps) {
  const ref = useRef<ConfettiBurstHandle | null>(null)
  const previousActive = useRef<boolean>(false)

  useEffect(() => {
    if (active && !previousActive.current) {
      const handle = ref.current
      if (handle) {
        if (mode === "cannon") {
          handle.cannon(options)
        } else {
          handle.fire(options)
        }
      }
    }
    previousActive.current = active
    // Intentionally only depending on `active`. Mid-flight changes to
    // `mode`/`options` are ignored — they take effect on the next rising edge.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return <ConfettiBurst ref={ref} className={className} />
}

export default ConfettiOnSuccess
