"use client"

import { Activity, Pause, Play, RotateCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"

import type { MotionDurationToken, MotionEasingToken } from "./brand-control-types"
import styles from "./brand-control.module.css"

interface MotionSystemPanelProps {
  durations: ReadonlyArray<MotionDurationToken>
  easings: ReadonlyArray<MotionEasingToken>
  defaultDurationId?: string
  defaultEasingId?: string
  className?: string
}

function formatBezier(bezier: readonly [number, number, number, number]): string {
  return `cubic-bezier(${bezier.map((n) => n.toFixed(2)).join(", ")})`
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Motion duration + easing token panel. The right rail is a scrubber: the
 * dot animates across the track using the active easing/duration so the
 * brand team can "feel" the rhythm before adopting it.
 *
 * Honours `prefers-reduced-motion` — when active, the dot is parked.
 */
export function MotionSystemPanel({
  durations,
  easings,
  defaultDurationId,
  defaultEasingId,
  className,
}: MotionSystemPanelProps) {
  const initialDuration =
    durations.find((d) => d.id === defaultDurationId) ?? durations[1] ?? durations[0]
  const initialEasing =
    easings.find((e) => e.id === defaultEasingId) ?? easings[0]

  const [durationId, setDurationId] = useState<string>(initialDuration.id)
  const [easingId, setEasingId] = useState<string>(initialEasing.id)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  const duration = durations.find((d) => d.id === durationId) ?? initialDuration
  const easing = easings.find((e) => e.id === easingId) ?? initialEasing

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!playing || reducedMotion) {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      return
    }

    startRef.current = null
    const ms = duration.ms
    const tick = (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp
      }
      const elapsed = timestamp - startRef.current
      const cycle = ms * 2 // out and back
      const norm = (elapsed % cycle) / cycle
      // Triangle wave 0→1→0 — keeps the dot returning to the left.
      const triangular = norm < 0.5 ? norm * 2 : 2 - norm * 2
      setProgress(clamp(triangular, 0, 1))
      rafRef.current = window.requestAnimationFrame(tick)
    }
    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [playing, reducedMotion, duration.ms])

  const dotStyle: CSSProperties = {
    left: `${progress * 100}%`,
    transitionTimingFunction: formatBezier(easing.bezier),
  }

  return (
    <article
      className={[styles.card, styles.cardWide, className].filter(Boolean).join(" ")}
      aria-label="Motion system panel"
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Activity size={12} aria-hidden="true" /> Umbrella · Motion
          </span>
          <h3 className={styles.title}>Motion system</h3>
          <p className={styles.subtitle}>
            Duration × easing tokens with a live scrubber. Respects reduced motion.
          </p>
        </div>
        <span className={`${styles.tag} ${styles.tagTeal}`}>{duration.ms}ms</span>
      </header>

      <div>
        <span className={styles.tinyLabel}>Duration tokens</span>
        <div className={styles.metaRow} role="radiogroup" aria-label="Duration token">
          {durations.map((token) => (
            <Chip
              key={token.id}
              label={`${token.label} · ${token.ms}ms`}
              tone="amber"
              selected={token.id === duration.id}
              onSelect={() => setDurationId(token.id)}
            />
          ))}
        </div>
      </div>

      <div>
        <span className={styles.tinyLabel}>Easing tokens</span>
        <div className={styles.metaRow} role="radiogroup" aria-label="Easing token">
          {easings.map((token) => (
            <Chip
              key={token.id}
              label={token.label}
              tone="teal"
              selected={token.id === easing.id}
              onSelect={() => setEasingId(token.id)}
            />
          ))}
        </div>
      </div>

      <div
        className={styles.scrubberTrack}
        role="region"
        aria-label={`Scrubber preview — ${duration.label} ${easing.label}`}
      >
        <span className={styles.scrubberDot} style={dotStyle} aria-hidden="true" />
      </div>

      <footer className={styles.foot}>
        <div className={styles.metaRow}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => setPlaying((value) => !value)}
            aria-pressed={playing}
            aria-label={playing ? "Pause scrubber" : "Play scrubber"}
          >
            {playing ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => {
              startRef.current = null
              setProgress(0)
            }}
          >
            <RotateCcw size={12} aria-hidden="true" />
            Reset
          </button>
        </div>
        <span className={styles.tinyLabel}>{formatBezier(easing.bezier)}</span>
      </footer>
    </article>
  )
}

export default MotionSystemPanel
