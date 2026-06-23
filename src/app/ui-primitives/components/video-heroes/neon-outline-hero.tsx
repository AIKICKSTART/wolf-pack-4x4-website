"use client"

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import Link from "next/link"

import styles from "./neon-outline-hero.module.css"

export interface NeonOutlineHeroAction {
  label: string
  href: string
}

export interface NeonOutlineHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: NeonOutlineHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

const HEADLINE_ID = "neon-outline-headline"

/**
 * Geometry for the traced neon badge outline. The path is authored in a
 * generous viewBox and scaled to the copy plate; `vector-effect:
 * non-scaling-stroke` (set in CSS) keeps the line crisp at every size, while
 * `preserveAspectRatio="none"` lets the frame stretch with the responsive
 * plate without ever clipping. The trailing tick on the right edge reads as a
 * neon "starter" so the line has a clear beginning/end.
 */
const OUTLINE_VIEWBOX = "0 0 600 360"
const OUTLINE_PATH = [
  "M 40 26",
  "L 524 26",
  "Q 560 26 574 60",
  "L 588 96",
  "Q 596 116 588 136",
  "L 574 172",
  "L 588 208",
  "Q 596 228 588 248",
  "L 574 300",
  "Q 560 334 524 334",
  "L 76 334",
  "Q 40 334 26 300",
  "L 12 248",
  "Q 4 228 12 208",
  "L 26 172",
  "L 12 136",
  "Q 4 116 12 96",
  "L 26 60",
  "Q 40 26 40 26",
  "Z",
].join(" ")

/**
 * Path length used to seed `stroke-dasharray`/`stroke-dashoffset` so the line
 * starts fully retracted and "draws on". We measure the real length on mount
 * (font/scale agnostic) and fall back to a generous estimate for SSR.
 */
const OUTLINE_LENGTH_FALLBACK = 2400

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function usePrefersReducedMotion(): boolean {
  // useSyncExternalStore keeps us in sync with the OS setting (incl. live
  // changes) without a setState-in-effect cascade, and returns the SSR-safe
  // default of `false` on the server.
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

export function NeonOutlineHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "NEON · BAY 07 · 60Hz",
}: NeonOutlineHeroProps) {
  const reduceMotion = usePrefersReducedMotion()
  const pathRef = useRef<SVGPathElement | null>(null)
  const [pathLength, setPathLength] = useState<number>(OUTLINE_LENGTH_FALLBACK)
  const [drawn, setDrawn] = useState<boolean>(false)

  useEffect(() => {
    const node = pathRef.current
    if (node) {
      const measured = node.getTotalLength()
      if (Number.isFinite(measured) && measured > 0) {
        setPathLength(measured)
      }
    }
    // Defer the draw-on so the dash offset transition has a frame to apply.
    const raf = window.requestAnimationFrame(() => setDrawn(true))
    return () => window.cancelAnimationFrame(raf)
  }, [])

  const drawStyle = useMemo(() => {
    if (reduceMotion) {
      // Static, fully-traced outline — no motion to neutralise.
      return { strokeDasharray: "none", strokeDashoffset: 0 }
    }
    return {
      strokeDasharray: pathLength,
      strokeDashoffset: drawn ? 0 : pathLength,
    }
  }, [reduceMotion, pathLength, drawn])

  return (
    <section className={styles.hero} aria-labelledby={HEADLINE_ID}>
      {/* Dimmed loop video sits furthest back; purely decorative. */}
      <video
        className={styles.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterSrc}
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className={styles.dim} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.bloom} aria-hidden="true" />

      <div className={styles.stage}>
        {/* The neon motif: a traced outline that draws around the copy plate.
            Two stacked strokes (wide blurred halo + crisp core) sell the tube. */}
        <svg
          className={styles.outline}
          viewBox={OUTLINE_VIEWBOX}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className={styles.outlineGlow}
            d={OUTLINE_PATH}
            style={drawStyle}
          />
          <path
            ref={pathRef}
            className={styles.outlineCore}
            d={OUTLINE_PATH}
            style={drawStyle}
          />
        </svg>

        <div className={styles.copy}>
          <span className={styles.kicker}>
            <i aria-hidden="true" />
            {timestampLabel}
          </span>
          <h1 id={HEADLINE_ID} className={styles.headline}>
            {headline}
          </h1>
          {/* Neon underline accent — a short hand-traced tube under the H1. */}
          <svg
            className={styles.rule}
            viewBox="0 0 320 12"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className={styles.ruleGlow}
              d="M 4 8 L 240 8 L 268 4 L 316 4"
              style={drawStyle}
            />
            <path
              className={styles.ruleCore}
              d="M 4 8 L 240 8 L 268 4 L 316 4"
              style={drawStyle}
            />
          </svg>
          <p className={styles.subhead}>{subhead}</p>
          <Link href={cta.href} className={styles.cta}>
            <span>{cta.label}</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>NEON · TRACED OUTLINE</span>
        <span>GLOW · RED + AMBER</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
