"use client"

import { useEffect, useMemo, useRef } from "react"
import Link from "next/link"

import styles from "./shatter-glass-hero.module.css"

export interface ShatterGlassHeroAction {
  label: string
  href: string
}

export interface ShatterGlassHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: ShatterGlassHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/**
 * Angular glass shards expressed as clip-path polygons (objectBoundingBox-style
 * percentages) that tessellate the full hero frame. Each shard renders the same
 * video and settles in with a micro-staggered transform. The fragment seams are
 * traced separately as crack lines so the silhouette reads as cracked glass.
 */
interface Shard {
  /** polygon() points string, in % of the stage box */
  clip: string
  /** settle offset in px applied before the shards lock together */
  dx: number
  dy: number
  /** rotation seed (deg) for the settle-in */
  rot: number
  /** stagger order — drives animation-delay */
  order: number
}

const SHARDS: readonly Shard[] = [
  { clip: "0% 0%, 38% 0%, 30% 34%, 0% 46%", dx: -26, dy: -20, rot: -2.4, order: 0 },
  { clip: "38% 0%, 70% 0%, 58% 28%, 30% 34%", dx: 14, dy: -28, rot: 1.8, order: 2 },
  { clip: "70% 0%, 100% 0%, 100% 30%, 58% 28%", dx: 30, dy: -18, rot: 2.6, order: 1 },
  { clip: "0% 46%, 30% 34%, 36% 64%, 0% 78%", dx: -30, dy: 10, rot: -1.6, order: 3 },
  { clip: "30% 34%, 58% 28%, 64% 56%, 36% 64%", dx: 0, dy: 6, rot: 0.6, order: 6 },
  { clip: "58% 28%, 100% 30%, 100% 58%, 64% 56%", dx: 26, dy: 8, rot: -2, order: 4 },
  { clip: "64% 56%, 100% 58%, 100% 100%, 70% 100%", dx: 24, dy: 26, rot: 2.2, order: 5 },
  { clip: "36% 64%, 64% 56%, 70% 100%, 42% 100%", dx: 4, dy: 30, rot: -0.8, order: 8 },
  { clip: "0% 78%, 36% 64%, 42% 100%, 0% 100%", dx: -22, dy: 28, rot: 1.4, order: 7 },
]

/**
 * Seam segments traced over the shard boundaries (in % of the stage box).
 * Drawn as thin strokes to read as fracture lines + branching hairline cracks.
 */
const SEAMS: readonly string[] = [
  "M0,46 L30,34 L38,0",
  "M30,34 L58,28 L70,0",
  "M58,28 L100,30",
  "M30,34 L36,64 L0,78",
  "M58,28 L64,56 L36,64",
  "M64,56 L100,58",
  "M64,56 L70,100",
  "M36,64 L42,100",
  "M36,64 L64,56",
]

/** Branching hairline cracks that fan off the main seams (decorative detail). */
const HAIRLINES: readonly string[] = [
  "M30,34 L22,52 L26,70",
  "M58,28 L72,40 L68,58",
  "M64,56 L80,66 L78,84",
  "M36,64 L28,80",
]

const GLINT_ORDERS: ReadonlySet<number> = new Set([1, 4, 6])

export function ShatterGlassHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "FRACTURE · 00:00:09:21",
}: ShatterGlassHeroProps) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  // Keep every shard's video in sync so the fragments read as one image.
  useEffect(() => {
    const videos = videoRefs.current.filter(
      (node): node is HTMLVideoElement => node !== null,
    )
    if (videos.length < 2) return

    const master = videos[0]
    const resync = () => {
      for (let i = 1; i < videos.length; i += 1) {
        const follower = videos[i]
        if (Math.abs(follower.currentTime - master.currentTime) > 0.12) {
          follower.currentTime = master.currentTime
        }
      }
    }

    master.addEventListener("timeupdate", resync)
    return () => master.removeEventListener("timeupdate", resync)
  }, [])

  return (
    <section className={styles.hero} aria-labelledby="shatter-glass-headline">
      <div className={styles.atmosphere} aria-hidden="true" />

      <div
        className={styles.stage}
        data-static={reduceMotion ? "" : undefined}
        aria-hidden="true"
      >
        {SHARDS.map((shard, index) => (
          <div
            key={shard.clip}
            className={styles.shard}
            style={
              {
                clipPath: `polygon(${shard.clip})`,
                "--shard-dx": `${shard.dx}px`,
                "--shard-dy": `${shard.dy}px`,
                "--shard-rot": `${shard.rot}deg`,
                "--shard-delay": `${shard.order * 90}ms`,
              } as React.CSSProperties
            }
          >
            <video
              ref={(node) => {
                videoRefs.current[index] = node
              }}
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
            {GLINT_ORDERS.has(shard.order) ? (
              <span
                className={styles.glint}
                style={{ "--shard-delay": `${shard.order * 90}ms` } as React.CSSProperties}
              />
            ) : null}
          </div>
        ))}

        <svg
          className={styles.cracks}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <g className={styles.hairlineGroup}>
            {HAIRLINES.map((d) => (
              <path key={d} d={d} className={styles.hairline} />
            ))}
          </g>
          <g className={styles.seamGroup}>
            {SEAMS.map((d) => (
              <path key={d} d={d} className={styles.seam} />
            ))}
          </g>
        </svg>

        <div className={styles.frostEdge} aria-hidden="true" />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="shatter-glass-headline" className={styles.headline}>
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
        <span>TEMPERED · 9-SHARD MASK</span>
        <span>IMPACT · CENTRE FRACTURE</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
