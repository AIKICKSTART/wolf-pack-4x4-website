"use client"

import { useEffect, useRef, useState } from "react"

import styles from "./font-major-mono.module.css"

const DISPLAY_TEXT = "vin: 2hg-cg-1657"

const BODY_TEXT =
  "major mono display is reserved for vehicle identifiers, cipher reveals, and forensic markers. the lowercase cap height + decorative inline rule reads as machine output."

const CAPTION_TEXT = "cipher · vin · serial"

const SCALE_LABELS = [
  { label: "regular 400 — only cut" },
  { label: "tracked +0.06em" },
  { label: "lowercase only" },
]

const SCRAMBLE_GLYPHS = "█▓▒░01abcdefghjkmnpqrstuvwxyz23456789"

function makeScrambled(target: string, progress: number): string {
  const settled = Math.floor(progress * target.length)
  return Array.from(target)
    .map((char, index) => {
      if (char === " " || char === ":" || char === "-") return char
      if (index < settled) return char
      return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)]
    })
    .join("")
}

export function FontMajorMono() {
  const [overlay, setOverlay] = useState<string | null>(null)
  const frameRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (media.matches) return

    const settleMs = 1600
    const restMs = 2400
    const totalMs = settleMs + restMs

    function tick(now: number) {
      if (startRef.current === 0) startRef.current = now
      if (now - lastTickRef.current < 70) {
        frameRef.current = window.requestAnimationFrame(tick)
        return
      }
      lastTickRef.current = now
      const elapsed = (now - startRef.current) % totalMs
      if (elapsed >= settleMs) {
        setOverlay(null)
      } else {
        const progress = elapsed / settleMs
        setOverlay(makeScrambled(DISPLAY_TEXT, progress))
      }
      frameRef.current = window.requestAnimationFrame(tick)
    }

    frameRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      startRef.current = 0
      lastTickRef.current = 0
    }
  }, [])

  return (
    <article className={styles.tile} aria-labelledby="font-major-mono-name">
      <header className={styles.headRow}>
        <h3 id="font-major-mono-name" className={styles.name}>
          Major Mono Display
        </h3>
        <span className={styles.categoryBadge}>Mono display · cipher</span>
      </header>

      <p className={styles.display} aria-label={DISPLAY_TEXT}>
        <span aria-hidden="true">{overlay ?? DISPLAY_TEXT}</span>
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Major Mono Display weight scale">
        {SCALE_LABELS.map((item, index) => (
          <div key={`${item.label}-${index}`} className={styles.scaleItem}>
            <span className={styles.scaleSample} aria-hidden="true">
              aa
            </span>
            <span className={styles.scaleLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
