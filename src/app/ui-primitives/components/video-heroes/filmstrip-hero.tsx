"use client"

import { useMemo, useSyncExternalStore } from "react"
import Link from "next/link"

import styles from "./filmstrip-hero.module.css"

export interface FilmstripHeroAction {
  label: string
  href: string
}

export interface FilmstripHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: FilmstripHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/** Number of video cells repeated along the scrolling strip. */
const FRAME_COUNT = 6
/** Sprocket perforations per rail — kept in sync with the visual cell rhythm. */
const PERF_COUNT = 24

const FRAME_INDICES: readonly number[] = Array.from(
  { length: FRAME_COUNT },
  (_, index) => index,
)
const PERF_INDICES: readonly number[] = Array.from(
  { length: PERF_COUNT },
  (_, index) => index,
)

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** Subscribes to the reduced-motion preference via an external store. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

interface FilmFrameProps {
  index: number
  videoSrc: string
  posterSrc?: string
  staticOnly: boolean
}

/**
 * A single 35mm film cell. The first cell carries the live <video> so the
 * browser only decodes one stream; the rest are tinted poster stand-ins that
 * keep the strip reading as a continuous reel without N video elements.
 */
function FilmFrame({ index, videoSrc, posterSrc, staticOnly }: FilmFrameProps) {
  const showVideo = index === 0 && !staticOnly

  return (
    <div className={styles.frame} aria-hidden="true">
      <span className={styles.frameNo}>{`F${String(index + 1).padStart(2, "0")}`}</span>
      <div className={styles.frameWindow}>
        {showVideo ? (
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
        ) : (
          <div
            className={styles.frameStill}
            style={
              posterSrc
                ? { backgroundImage: `url(${posterSrc})` }
                : undefined
            }
          />
        )}
        <div className={styles.frameGloss} />
      </div>
    </div>
  )
}

interface SprocketRailProps {
  position: "top" | "bottom"
}

/** Perforated edge rail — the defining sprocket-hole signature of 35mm stock. */
function SprocketRail({ position }: SprocketRailProps) {
  const railClass = position === "top" ? styles.railTop : styles.railBottom
  return (
    <div className={`${styles.rail} ${railClass}`} aria-hidden="true">
      <div className={styles.perfTrack}>
        {PERF_INDICES.map((perfIndex) => (
          <span key={perfIndex} className={styles.perf} />
        ))}
        {/* duplicate set so the seamless scroll never reveals an edge */}
        {PERF_INDICES.map((perfIndex) => (
          <span key={`dup-${perfIndex}`} className={styles.perf} />
        ))}
      </div>
    </div>
  )
}

export function FilmstripHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "REEL 01 · 35MM · 00:14:08",
}: FilmstripHeroProps) {
  const reduceMotion = usePrefersReducedMotion()

  // Two passes of frames keep the horizontal scroll seamless (loop = -50%).
  const stripCells = useMemo<readonly number[]>(
    () => [...FRAME_INDICES, ...FRAME_INDICES],
    [],
  )

  return (
    <section className={styles.hero} aria-labelledby="filmstrip-hero-headline">
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      {/* === THE FILM STRIP (decorative motion layer) === */}
      <div
        className={styles.strip}
        data-static={reduceMotion ? "true" : undefined}
        aria-hidden="true"
      >
        <SprocketRail position="top" />
        <div className={styles.track}>
          {stripCells.map((frameIndex, cellIndex) => (
            <FilmFrame
              key={`${frameIndex}-${cellIndex}`}
              index={frameIndex}
              videoSrc={videoSrc}
              posterSrc={posterSrc}
              staticOnly={reduceMotion || cellIndex >= FRAME_COUNT}
            />
          ))}
        </div>
        <SprocketRail position="bottom" />
      </div>

      <div className={styles.scrim} aria-hidden="true" />

      {/* === THE MARQUEE TITLE CARD === */}
      <div className={styles.card}>
        <span className={styles.kicker}>
          <i className={styles.kickerDot} aria-hidden="true" />
          {timestampLabel}
        </span>

        <div className={styles.titleCard}>
          <span className={styles.titleEdge} aria-hidden="true" />
          <h1 id="filmstrip-hero-headline" className={styles.headline}>
            {headline}
          </h1>
          <span className={styles.titleEdge} aria-hidden="true" />
        </div>

        <p className={styles.subhead}>{subhead}</p>

        <div className={styles.actions}>
          <Link href={cta.href} className={styles.cta}>
            <span>{cta.label}</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
          <span className={styles.gauge} aria-hidden="true">
            <i className={styles.gaugeFill} />
            24 FPS
          </span>
        </div>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>OAK FLATS MUFFLERMEN</span>
        <span>EXPOSURE · A/B</span>
        <span>SCAN · 4K · 2.39:1</span>
      </footer>
    </section>
  )
}
