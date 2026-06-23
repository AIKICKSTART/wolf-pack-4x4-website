"use client"

import Link from "next/link"

import styles from "./puzzle-piece-hero.module.css"

export interface PuzzlePieceHeroAction {
  label: string
  href: string
}

export interface PuzzlePieceHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: PuzzlePieceHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/*
 * Classic interlocking puzzle-piece silhouette expressed in
 * objectBoundingBox (0..1) units so the same path drives both the
 * clip-path mask (the video) and the SVG stroke (the ghost outline)
 * while scaling fluidly from 320px to 1920px with no overflow.
 *
 * Edge layout: tab on TOP, blank on RIGHT, tab on BOTTOM, flat LEFT.
 */
const PUZZLE_PATH = [
  "M 0.06 0.10",
  "L 0.40 0.10",
  "C 0.38 0.04 0.42 0.00 0.50 0.00",
  "C 0.58 0.00 0.62 0.04 0.60 0.10",
  "L 0.94 0.10",
  "L 0.94 0.40",
  "C 1.00 0.38 1.04 0.42 1.04 0.50",
  "C 1.04 0.58 1.00 0.62 0.94 0.60",
  "L 0.94 0.90",
  "L 0.60 0.90",
  "C 0.62 0.96 0.58 1.00 0.50 1.00",
  "C 0.42 1.00 0.38 0.96 0.40 0.90",
  "L 0.06 0.90",
  "Z",
].join(" ")

const CLIP_ID = "puzzle-piece-hero-clip"

export function PuzzlePieceHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "MODULE · INTERLOCK 01",
}: PuzzlePieceHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="puzzle-piece-headline">
      {/* Zero-size SVG holding the reusable objectBoundingBox clip path */}
      <svg
        className={styles.defs}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d={PUZZLE_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.layout}>
        <header className={styles.copy}>
          <span className={styles.kicker}>
            <i aria-hidden="true" />
            {timestampLabel}
          </span>
          <h1 id="puzzle-piece-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <div className={styles.metaRow} aria-hidden="true">
            <span>FITMENT</span>
            <span className={styles.metaDot} />
            <span>EVERY PIECE LOCKS</span>
          </div>
          <Link href={cta.href} className={styles.cta}>
            <span>{cta.label}</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </header>

        <div className={styles.stage}>
          {/* Ghost piece behind — offset outline for depth */}
          <svg
            className={styles.ghost}
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d={PUZZLE_PATH}
              fill="none"
              stroke="var(--primitive-amber)"
              strokeWidth="0.006"
              strokeDasharray="0.018 0.022"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Live piece — video clipped to the puzzle silhouette */}
          <div className={styles.piece}>
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
              <div className={styles.sheen} aria-hidden="true" />
            </div>
            <svg
              className={styles.edge}
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d={PUZZLE_PATH}
                fill="none"
                stroke="var(--primitive-red)"
                strokeWidth="0.008"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <span className={styles.tag} aria-hidden="true">
            <i />
            BOLT-ON · NO CUTTING
          </span>
        </div>
      </div>
    </section>
  )
}
