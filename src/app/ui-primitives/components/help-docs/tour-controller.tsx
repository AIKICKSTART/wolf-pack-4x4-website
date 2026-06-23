"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { CoachMark, type CoachMarkPlacement } from "./coach-mark"
import { SpotlightCutout, type SpotlightCutoutTarget } from "./spotlight-cutout"
import styles from "./tour-controller.module.css"

export interface TourStep {
  targetSelector: string
  title: string
  body: string
  placement?: CoachMarkPlacement
}

interface TourControllerProps {
  steps: ReadonlyArray<TourStep>
  open: boolean
  onClose: () => void
  onComplete?: () => void
  initialIndex?: number
}

const FALLBACK_TARGET: SpotlightCutoutTarget = {
  top: 24,
  left: 24,
  width: 240,
  height: 120,
}

function readTarget(selector: string): SpotlightCutoutTarget | null {
  if (typeof window === "undefined") {
    return null
  }
  const element = document.querySelector(selector)
  if (!element) {
    return null
  }
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  }
}

function coachPosition(
  target: SpotlightCutoutTarget,
  placement: CoachMarkPlacement,
): { top: number; left: number } {
  const offset = 14
  const coachWidth = 320
  const coachHeight = 180
  switch (placement) {
    case "top":
      return {
        top: target.top - coachHeight - offset,
        left: target.left + target.width / 2 - coachWidth / 2,
      }
    case "left":
      return {
        top: target.top + target.height / 2 - coachHeight / 2,
        left: target.left - coachWidth - offset,
      }
    case "right":
      return {
        top: target.top + target.height / 2 - coachHeight / 2,
        left: target.left + target.width + offset,
      }
    case "bottom":
    default:
      return {
        top: target.top + target.height + offset,
        left: target.left + target.width / 2 - coachWidth / 2,
      }
  }
}

export function TourController({
  steps,
  open,
  onClose,
  onComplete,
  initialIndex = 0,
}: TourControllerProps) {
  // Derived state: re-key the internal step state on every open transition
  // by using `open` as part of useState's lazy initializer arg through a
  // composite key. The "Adjusting State Based on Props" pattern uses a
  // separate piece of state for the previous value.
  const [index, setIndex] = useState<number>(initialIndex)
  const [lastOpen, setLastOpen] = useState<boolean>(open)
  if (lastOpen !== open) {
    setLastOpen(open)
    if (!open) {
      setIndex(initialIndex)
    }
  }

  const [target, setTarget] = useState<SpotlightCutoutTarget | null>(null)
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  const total = steps.length
  const current = steps[index]

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = (event: MediaQueryListEvent) => setReducedMotion(event.matches)
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    if (!open || !current) {
      return
    }
    const measure = () => {
      const next = readTarget(current.targetSelector)
      if (next) {
        setTarget(next)
      }
    }
    measure()
    const delay = reducedMotion ? 0 : 220
    const timer = window.setTimeout(measure, delay)
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, true)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure, true)
    }
  }, [open, current, reducedMotion])

  const handleNext = useCallback(() => {
    if (index + 1 >= total) {
      onComplete?.()
      onClose()
      return
    }
    setIndex(index + 1)
  }, [index, total, onClose, onComplete])

  const handleSkip = useCallback(() => {
    onClose()
  }, [onClose])

  const placement: CoachMarkPlacement = current?.placement ?? "bottom"
  const safeTarget = target ?? FALLBACK_TARGET
  const coordinates = useMemo(() => coachPosition(safeTarget, placement), [safeTarget, placement])

  if (!open || !current) {
    return null
  }

  return (
    <div className={styles.controller} role="status" aria-live="polite">
      <SpotlightCutout target={safeTarget} />
      <CoachMark
        title={current.title}
        body={current.body}
        placement={placement}
        step={index + 1}
        totalSteps={total}
        primaryLabel={index + 1 === total ? "Finish" : "Next"}
        secondaryLabel="Skip tour"
        onPrimary={handleNext}
        onSecondary={handleSkip}
        style={{
          position: "fixed",
          top: Math.max(16, coordinates.top),
          left: Math.max(16, coordinates.left),
        }}
      />
    </div>
  )
}

export default TourController
