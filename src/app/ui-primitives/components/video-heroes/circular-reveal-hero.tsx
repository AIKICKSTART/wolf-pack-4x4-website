"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import styles from "./circular-reveal-hero.module.css"

export interface CircularRevealHeroAction {
  label: string
  href: string
}

export interface CircularRevealHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: CircularRevealHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const ARC_TEXT = "CIRCULAR REVEAL · IRIS OPEN · OAK FLATS NSW · "
const RADIAL_TICKS = 48

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

export function CircularRevealHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "IRIS · 00:00:11:02",
}: CircularRevealHeroProps) {
  const reduceMotion = usePrefersReducedMotion()

  const ticks = useMemo<number[]>(
    () => Array.from({ length: RADIAL_TICKS }, (_, index) => index),
    [],
  )

  return (
    <section
      className={styles.hero}
      data-reduced={reduceMotion ? "true" : undefined}
      aria-labelledby="circular-reveal-headline"
    >
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {/* The iris stage: video clipped through an expanding circle with a chrome ring. */}
      <div className={styles.stage}>
        <div className={styles.iris} aria-hidden="true">
          <div className={styles.clip}>
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
            <div className={styles.sheen} />
            <div className={styles.crosshair} />
          </div>

          {/* Chrome ring border with bevel highlight + radial aperture ticks. */}
          <div className={styles.ring} />
          <div className={styles.ringInner} />
          <div className={styles.aperture}>
            {ticks.map((tick) => (
              <span
                key={tick}
                className={styles.tick}
                style={{ transform: `rotate(${(360 / RADIAL_TICKS) * tick}deg)` }}
              />
            ))}
          </div>

          {/* Curved label arcing along the upper rim of the ring. */}
          <svg
            className={styles.arc}
            viewBox="0 0 200 200"
            focusable="false"
            aria-hidden="true"
          >
            <defs>
              <path
                id="circular-reveal-arc-path"
                d="M 100 100 m -84 0 a 84 84 0 1 1 168 0 a 84 84 0 1 1 -168 0"
                fill="none"
              />
            </defs>
            <text className={styles.arcText}>
              <textPath href="#circular-reveal-arc-path" startOffset="0">
                {ARC_TEXT.repeat(2)}
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Centred editorial copy sitting in front of the iris. */}
      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="circular-reveal-headline" className={styles.headline}>
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
        <span>F/1.4 · APERTURE OPEN</span>
        <span>EXHAUST · CIRCULAR REVEAL</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
