"use client"

import Link from "next/link"

import styles from "./curtain-wipe-hero.module.css"

export interface CurtainWipeHeroAction {
  label: string
  href: string
}

export interface CurtainWipeHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: CurtainWipeHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/** Vertical pleats rendered per curtain panel — drives the fabric sheen rhythm. */
const PLEAT_COUNT = 7

const PLEATS = Array.from({ length: PLEAT_COUNT }, (_, index) => index)

export function CurtainWipeHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "CURTAIN · 00:00:07:14",
}: CurtainWipeHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="curtain-wipe-headline">
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

        {/* Readability wash over the revealed media. */}
        <div className={styles.tint} aria-hidden="true" />

        {/* Top valance / swag — the pelmet the curtains hang from. */}
        <div className={styles.valance} aria-hidden="true">
          <span className={styles.valanceTrim} />
        </div>

        {/* Two curtain panels that slide outward on the X axis to reveal the video. */}
        <div className={styles.curtains} aria-hidden="true">
          <div className={`${styles.panel} ${styles.panelLeft}`}>
            <div className={styles.pleats}>
              {PLEATS.map((index) => (
                <span
                  key={index}
                  className={styles.pleat}
                  style={{ "--pleat-index": index } as React.CSSProperties}
                />
              ))}
            </div>
            <span className={styles.edgeBraid} />
          </div>

          <div className={`${styles.panel} ${styles.panelRight}`}>
            <div className={styles.pleats}>
              {PLEATS.map((index) => (
                <span
                  key={index}
                  className={styles.pleat}
                  style={{ "--pleat-index": index } as React.CSSProperties}
                />
              ))}
            </div>
            <span className={styles.edgeBraid} />
          </div>
        </div>

        {/* Centre-stage spotlight that warms the revealed copy. */}
        <div className={styles.spotlight} aria-hidden="true" />

        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.vignette} aria-hidden="true" />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="curtain-wipe-headline" className={styles.headline}>
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
        <span>CURTAIN WIPE · TWO PANEL</span>
        <span>EXHAUST · 04:00 LOOP</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
