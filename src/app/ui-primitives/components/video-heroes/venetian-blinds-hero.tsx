"use client"

import Link from "next/link"

import styles from "./venetian-blinds-hero.module.css"

export interface VenetianBlindsHeroAction {
  label: string
  href: string
}

export interface VenetianBlindsHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: VenetianBlindsHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/** Number of horizontal louvre slats that sweep open to reveal the media. */
const SLAT_COUNT = 9

const SLATS = Array.from({ length: SLAT_COUNT }, (_, index) => index)

export function VenetianBlindsHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "LOUVRE · 00:00:09:21",
}: VenetianBlindsHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="venetian-blinds-headline">
      <div className={styles.stage}>
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

        <div className={styles.tint} aria-hidden="true" />

        {/* Louvre slats: opaque bars that pivot open to reveal the video. */}
        <div className={styles.blinds} aria-hidden="true">
          {SLATS.map((index) => (
            <div
              key={index}
              className={styles.slat}
              style={{ "--slat-index": index } as React.CSSProperties}
            >
              <span className={styles.slatFace} />
              <span className={styles.slatLip} />
            </div>
          ))}
        </div>

        {/* Hairline rules that trace the gap between each open louvre. */}
        <div className={styles.kerfs} aria-hidden="true">
          {SLATS.slice(1).map((index) => (
            <span
              key={index}
              className={styles.kerf}
              style={{ "--kerf-index": index } as React.CSSProperties}
            />
          ))}
        </div>

        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.vignette} aria-hidden="true" />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="venetian-blinds-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead}>{subhead}</p>
        <Link href={cta.href} className={styles.cta}>
          <span>{cta.label}</span>
          <span className={styles.ctaArrow} aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>LOUVRE REVEAL · 9 SLATS</span>
        <span>EXHAUST · 04:00 LOOP</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
