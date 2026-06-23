"use client"

import type { RefObject } from "react"
import { useEffect } from "react"
import { useMotionValue } from "framer-motion"

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

export function useElementScrollProgress(ref: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0)

  useEffect(() => {
    const update = () => {
      const element = ref.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const travel = window.innerHeight + rect.height
      progress.set(clamp01((window.innerHeight - rect.top) / travel))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [progress, ref])

  return progress
}
