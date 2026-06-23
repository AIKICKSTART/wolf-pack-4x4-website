"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import styles from "./radial-segments-hero.module.css"

export interface RadialSegmentsHeroAction {
  label: string
  href: string
}

export interface RadialSegmentsHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: RadialSegmentsHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const SEGMENT_COUNT = 12
const ARC_TEXT = "RADIAL SEGMENTS · APERTURE FAN · OAK FLATS NSW · "

interface Wedge {
  index: number
  /** Centre angle of the wedge, in degrees, measured from 12 o'clock. */
  midAngle: number
  /** clip-path polygon string carving this wedge out from the centre. */
  clip: string
  /** Staggered animation delay so wedges fan in one after another. */
  delay: string
}

/**
 * Convert a polar angle (deg from 12 o'clock, clockwise) on the unit circle
 * to an `x% y%` coordinate pair inside a square box. The radius is pushed past
 * the box edge so the triangle fully covers its slice with no seams.
 */
function polarPoint(angleDeg: number): string {
  const radians = ((angleDeg - 90) * Math.PI) / 180
  const radius = 75 // > 50 so the wedge over-shoots the square's corners
  const x = 50 + radius * Math.cos(radians)
  const y = 50 + radius * Math.sin(radians)
  return `${x.toFixed(3)}% ${y.toFixed(3)}%`
}

function buildWedges(count: number): Wedge[] {
  const step = 360 / count
  return Array.from({ length: count }, (_, index) => {
    const start = index * step
    const end = start + step
    const mid = start + step / 2
    // Add a midpoint along the outer arc so wide wedges stay convex.
    const clip = `polygon(50% 50%, ${polarPoint(start)}, ${polarPoint(mid)}, ${polarPoint(end)})`
    // Alternate the fan direction left/right outward from the seam for a
    // shutter-petal feel, with an increasing stagger toward the edges.
    const fromCentre = Math.abs(index - (count - 1) / 2)
    const delay = `${(fromCentre * 70).toFixed(0)}ms`
    return { index, midAngle: mid, clip, delay }
  })
}

function usePrefersReducedMotion(): boolean {
  const initial = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])
  const [reduce, setReduce] = useState<boolean>(initial)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduce
}

export function RadialSegmentsHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "FAN · 00:00:09:24",
}: RadialSegmentsHeroProps) {
  const reduceMotion = usePrefersReducedMotion()

  const wedges = useMemo<Wedge[]>(() => buildWedges(SEGMENT_COUNT), [])
  const spokes = useMemo<number[]>(
    () => Array.from({ length: SEGMENT_COUNT }, (_, index) => index),
    [],
  )

  return (
    <section
      className={styles.hero}
      data-reduced={reduceMotion ? "true" : undefined}
      aria-labelledby="radial-segments-headline"
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {/* The radial dial: pie-wedge shutters fan open to reveal the video. */}
      <div className={styles.stage}>
        <div className={styles.dial} aria-hidden="true">
          {/* Underlying video disc — exposed as the wedges swing away. */}
          <div className={styles.disc}>
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
            <div className={styles.discSheen} />
          </div>

          {/* Opaque wedge shutters layered over the disc; each rotates +
              fades out of its slice to perform the radial reveal. */}
          <div className={styles.wedges}>
            {wedges.map((wedge) => (
              <span
                key={wedge.index}
                className={styles.wedge}
                style={
                  {
                    clipPath: wedge.clip,
                    WebkitClipPath: wedge.clip,
                    "--wedge-mid": `${wedge.midAngle}deg`,
                    "--wedge-delay": wedge.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* Thin radial spoke dividers between segments. */}
          <div className={styles.spokes}>
            {spokes.map((spoke) => (
              <span
                key={spoke}
                className={styles.spoke}
                style={{
                  transform: `rotate(${(360 / SEGMENT_COUNT) * spoke}deg)`,
                }}
              />
            ))}
          </div>

          {/* Outer chrome rim that frames the whole dial. */}
          <div className={styles.rim} />
          <div className={styles.rimGlow} />

          {/* Arcing mono label running the inner rim. */}
          <svg
            className={styles.arc}
            viewBox="0 0 200 200"
            focusable="false"
            aria-hidden="true"
          >
            <defs>
              <path
                id="radial-segments-arc-path"
                d="M 100 100 m -82 0 a 82 82 0 1 1 164 0 a 82 82 0 1 1 -164 0"
                fill="none"
              />
            </defs>
            <text className={styles.arcText}>
              <textPath href="#radial-segments-arc-path" startOffset="0">
                {ARC_TEXT.repeat(2)}
              </textPath>
            </text>
          </svg>

          {/* Chrome hub at dead centre — the pivot of the fan. */}
          <div className={styles.hub}>
            <span className={styles.hubFace} />
            <span className={styles.hubBolt} />
          </div>
        </div>
      </div>

      {/* Centred editorial copy sitting in front of the dial. */}
      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="radial-segments-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead}>{subhead}</p>
        <Link href={cta.href} className={styles.cta}>
          <span className={styles.ctaDot} aria-hidden="true" />
          <span>{cta.label}</span>
          <span className={styles.ctaArrow} aria-hidden="true">
            →
          </span>
        </Link>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>{SEGMENT_COUNT} SEGMENTS · 30° STEP</span>
        <span>EXHAUST · RADIAL FAN</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
