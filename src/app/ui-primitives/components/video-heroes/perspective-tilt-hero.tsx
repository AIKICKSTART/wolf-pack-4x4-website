"use client"

import Link from "next/link"

import styles from "./perspective-tilt-hero.module.css"

export interface PerspectiveTiltHeroAction {
  label: string
  href: string
}

export interface PerspectiveTiltHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: PerspectiveTiltHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

export function PerspectiveTiltHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "PLANE · 36° RAKE",
}: PerspectiveTiltHeroProps) {
  return (
    <section
      className={styles.hero}
      aria-labelledby="perspective-tilt-headline"
    >
      {/* Perspective scene: the screen plane + its floor reflection both
          live inside one shared 3D context so the rake reads consistently. */}
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.stack}>
          {/* The floating screen — a chrome-edged plane raked into space */}
          <div className={styles.plane}>
            <div className={styles.bezel}>
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
              <span className={styles.screenWash} />
              <span className={styles.scanline} />
              <span className={styles.chromeGlint} />
            </div>
            <span className={styles.cornerTag}>
              <i />
              {timestampLabel}
            </span>
          </div>

          {/* Floor reflection — same plane, flipped + faded under a floor sheen */}
          <div className={styles.reflection}>
            <div className={styles.bezel}>
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
          </div>
        </div>

        {/* Atmosphere: grid floor + ambient glow receding to the horizon */}
        <span className={styles.floorGrid} />
        <span className={styles.horizonGlow} />
      </div>

      {/* Foreground copy — upright, in front of the receding plane */}
      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="perspective-tilt-headline" className={styles.headline}>
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
        <span>OAK FLATS · NSW</span>
        <span>RAKE 36° · YAW 14°</span>
        <span>EXHAUST · 04:00 LOOP</span>
      </footer>
    </section>
  )
}
