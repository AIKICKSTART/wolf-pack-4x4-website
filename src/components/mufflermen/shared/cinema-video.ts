"use client"

import * as React from "react"

import type { SoundEvent } from "./types"

export const SOUND_EVENT = "mufflermen:sound"

// ── Shared: a video section that plays only while in view ──────
export function useCinemaVideo(
  threshold: number,
  onActiveChange?: (active: boolean) => void,
) {
  const ref = React.useRef<HTMLElement>(null)
  const vRef = React.useRef<HTMLVideoElement>(null)
  const activeRef = React.useRef(false)
  const [soundOn, setSoundOn] = React.useState(false)

  // Local toggle that drives the shared sound bus (window.__mufflermenSound +
  // SOUND_EVENT), so every cinema section + the top hero stay in sync.
  const toggleSound = React.useCallback(() => {
    const next = !window.__mufflermenSound
    window.__mufflermenSound = next
    window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: { soundOn: next } }))
    const v = vRef.current
    if (v) {
      v.muted = !next
      v.play().catch(() => {})
    }
  }, [])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    setSoundOn(!!window.__mufflermenSound)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = vRef.current
          if (!v) return
          if (e.isIntersecting && e.intersectionRatio > threshold) {
            v.muted = !window.__mufflermenSound
            v.play().catch(() => {
              v.muted = true
              v.play().catch(() => {})
            })
            activeRef.current = true
            onActiveChange?.(true)
          } else {
            v.pause()
            activeRef.current = false
            onActiveChange?.(false)
          }
        })
      },
      { threshold: [0, threshold, 0.6, 1] },
    )
    io.observe(el)

    const onSound = (e: Event) => {
      const on = (e as SoundEvent).detail.soundOn
      setSoundOn(on)
      const v = vRef.current
      if (!v) return
      v.muted = !on
      if (activeRef.current) v.play().catch(() => {})
    }
    window.addEventListener(SOUND_EVENT, onSound)
    return () => {
      io.disconnect()
      window.removeEventListener(SOUND_EVENT, onSound)
    }
  }, [threshold, onActiveChange])

  return { ref, vRef, soundOn, toggleSound }
}

export function useScrollCinemaProgress(ref: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduceMotion.matches) {
      el.style.setProperty("--cinema-progress", "0.5")
      el.style.setProperty("--cinema-scale", "1")
      el.style.setProperty("--cinema-copy-y", "0px")
      el.style.setProperty("--cinema-card-y", "0px")
      el.style.setProperty("--cinema-badge-y", "0px")
      el.style.setProperty("--cinema-card-opacity", "1")
      el.style.setProperty("--cinema-copy-opacity", "1")
      el.style.setProperty("--cinema-vignette-alpha", "1")
      return
    }

    let raf = 0
    let active = false

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value))

    const update = () => {
      raf = 0
      if (!active) return

      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = clamp(
        (viewport - rect.top) / (viewport + rect.height),
        0,
        1,
      )
      const centered = progress - 0.5

      el.style.setProperty("--cinema-progress", progress.toFixed(3))
      el.style.setProperty("--cinema-scale", "1")
      el.style.setProperty("--cinema-copy-y", `${(-centered * 34).toFixed(1)}px`)
      el.style.setProperty(
        "--cinema-card-y",
        `${((1 - progress) * 22).toFixed(1)}px`,
      )
      el.style.setProperty("--cinema-badge-y", `${(centered * -34).toFixed(1)}px`)
      el.style.setProperty(
        "--cinema-card-opacity",
        (0.68 + progress * 0.32).toFixed(3),
      )
      el.style.setProperty(
        "--cinema-copy-opacity",
        (0.76 + progress * 0.24).toFixed(3),
      )
      el.style.setProperty(
        "--cinema-vignette-alpha",
        (0.84 + progress * 0.18).toFixed(3),
      )
    }

    const requestUpdate = () => {
      if (raf === 0) raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) requestUpdate()
      },
      { rootMargin: "18% 0px 18% 0px" },
    )

    io.observe(el)
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)
    requestUpdate()

    return () => {
      io.disconnect()
      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}
