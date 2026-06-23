"use client"

import Link from "next/link"

import styles from "./diagonal-split-hero.module.css"

export interface DiagonalSplitHeroAction {
  label: string
  href: string
}

export interface DiagonalSplitHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: DiagonalSplitHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

export function DiagonalSplitHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "SPLIT · 32.5° SEAM",
}: DiagonalSplitHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="diagonal-split-headline">
      {/* Media plane — clipped to the lower-right wedge by the diagonal seam */}
      <div className={styles.mediaPlane} aria-hidden="true">
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
        <div className={styles.mediaWash} />
        <span className={styles.mediaTag}>
          <i />
          EXHAUST · 04:00 LOOP
        </span>
      </div>

      {/* Copy plane — solid wedge on the upper-left */}
      <div className={styles.copyPlane} aria-hidden="true" />

      {/* The angled seam + its red edge-light */}
      <div className={styles.seam} aria-hidden="true">
        <span className={styles.seamGlow} />
        <span className={styles.seamLine} />
        <span className={styles.seamSpark} />
      </div>

      {/* Corner registration marks */}
      <div className={styles.marks} aria-hidden="true">
        <span />
        <span />
      </div>

      {/* Foreground copy */}
      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="diagonal-split-headline" className={styles.headline}>
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
        <span>FORGE FLOOR · MM-26</span>
      </footer>
    </section>
  )
}
