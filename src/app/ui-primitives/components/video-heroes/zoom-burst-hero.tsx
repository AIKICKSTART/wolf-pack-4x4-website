"use client"

import type { CSSProperties } from "react"
import Link from "next/link"

import styles from "./zoom-burst-hero.module.css"

export interface ZoomBurstHeroAction {
  label: string
  href: string
}

export interface ZoomBurstHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: ZoomBurstHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/** Number of long radial speed spokes drawn around the focal point. */
const SPOKE_COUNT = 24

export function ZoomBurstHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "BURST · 00:00:08:24",
}: ZoomBurstHeroProps) {
  const spokes = Array.from({ length: SPOKE_COUNT }, (_value, index) => {
    const angle = (360 / SPOKE_COUNT) * index
    // Stagger the streak animation so spokes pulse outward in a rolling sweep.
    const delay = (index % 6) * 0.18
    return { angle, delay }
  })

  return (
    <section className={styles.hero} aria-labelledby="zoom-burst-headline">
      {/* The kinetic media — subtle scale pulse pushes the burst feel. */}
      <div className={styles.stage} aria-hidden="true">
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Radial wash that grounds the focal point. */}
      <div className={styles.focusWash} aria-hidden="true" />

      {/* Repeating conic spokes — the core "zoom-burst" geometry. */}
      <div className={styles.burst} aria-hidden="true" />

      {/* Discrete speed streaks layered over the conic burst for grit + motion. */}
      <div className={styles.streaks} aria-hidden="true">
        {spokes.map((spoke) => (
          <span
            key={spoke.angle}
            className={styles.streak}
            style={
              {
                "--streak-angle": `${spoke.angle}deg`,
                "--streak-delay": `${spoke.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* Concentric pulse rings emanating from the focal point. */}
      <div className={styles.rings} aria-hidden="true">
        <span className={styles.ring} />
        <span className={styles.ring} />
        <span className={styles.ring} />
      </div>

      {/* Atmosphere + legibility scrim for the lower-left copy. */}
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      {/* Crosshair marking the burst focal point. */}
      <div className={styles.reticle} aria-hidden="true">
        <span className={styles.reticleDot} />
        <span className={styles.reticleRing} />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="zoom-burst-headline" className={styles.headline}>
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
        <span>RADIAL ZOOM · {SPOKE_COUNT} SPOKES</span>
        <span>HIGH-ENERGY PROMO</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
