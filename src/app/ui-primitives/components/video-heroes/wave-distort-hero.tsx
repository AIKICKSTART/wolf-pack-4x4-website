"use client"

import Link from "next/link"

import styles from "./wave-distort-hero.module.css"

export interface WaveDistortHeroAction {
  label: string
  href: string
}

export interface WaveDistortHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: WaveDistortHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

const CLIP_ID = "wave-distort-clip"

/**
 * Top and bottom wavy edges expressed in objectBoundingBox units (0..1).
 * Using objectBoundingBox lets the clip scale with the stage at any viewport
 * width with no overflow or re-tuning. The middle band (~0.30..0.70) is left
 * full-height so the headline always sits over a calm, uncropped zone.
 */
const WAVE_CLIP_PATH = [
  "M 0 0.16",
  "C 0.08 0.04, 0.17 0.04, 0.25 0.12",
  "C 0.33 0.20, 0.42 0.20, 0.5 0.12",
  "C 0.58 0.04, 0.67 0.04, 0.75 0.12",
  "C 0.83 0.20, 0.92 0.20, 1 0.10",
  "L 1 0.90",
  "C 0.92 0.80, 0.83 0.80, 0.75 0.88",
  "C 0.67 0.96, 0.58 0.96, 0.5 0.88",
  "C 0.42 0.80, 0.33 0.80, 0.25 0.88",
  "C 0.17 0.96, 0.08 0.96, 0 0.84",
  "Z",
].join(" ")

export function WaveDistortHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "FLOW · 00:00:21:04",
}: WaveDistortHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="wave-distort-headline">
      {/* Off-screen def holding the wavy clip used by the video stage. */}
      <svg
        className={styles.defs}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d={WAVE_CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* Aquatic backdrop bloom behind the framed video. */}
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.stage}>
        {/* The video, clipped to the wavy silhouette. */}
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

          {/* Tonal grade so the headline always stays legible. */}
          <div className={styles.grade} aria-hidden="true" />

          {/* Layered ripple sheen drifting across the surface. */}
          <div className={styles.ripple} aria-hidden="true" />
          <div className={styles.rippleAlt} aria-hidden="true" />
        </div>

        {/* Crawling wave crests echoing the clipped edges. */}
        <div className={styles.crestTop} aria-hidden="true" />
        <div className={styles.crestBottom} aria-hidden="true" />

        {/* Copy lives in the calm middle band. */}
        <div className={styles.copy}>
          <span className={styles.kicker}>
            <i aria-hidden="true" />
            {timestampLabel}
          </span>
          <h1 id="wave-distort-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <Link href={cta.href} className={styles.cta}>
            <span>{cta.label}</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <footer className={styles.meta} aria-hidden="true">
          <span>AQUA · SURFACE FLOW</span>
          <span>RIPPLE · 06:00 LOOP</span>
          <span>NSW · OAK FLATS</span>
        </footer>
      </div>
    </section>
  )
}
