import Link from "next/link"

import { NeuoSurface } from "../surfaces/neuo-surface"

import styles from "./side-by-side-hero.module.css"

export interface SideBySideHeroAction {
  label: string
  href: string
  emphasis?: "primary" | "ghost"
}

export interface SideBySideHeroSpec {
  label: string
  value: string
}

export interface SideBySideHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  primaryCta: SideBySideHeroAction
  secondaryCta?: SideBySideHeroAction
  specs?: SideBySideHeroSpec[]
  serial?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

const DEFAULT_SPECS: SideBySideHeroSpec[] = [
  { label: "BORE", value: "2.5\"" },
  { label: "TONE", value: "DEEP" },
  { label: "BUILD", value: "MIG · TIG" },
]

export function SideBySideHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  specs = DEFAULT_SPECS,
  serial = "BUILD · 002 / 24",
}: SideBySideHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="sbs-headline">
      <div className={styles.videoColumn}>
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
          {videoSrcWebm ? <source src={videoSrcWebm} type="video/webm" /> : null}
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} aria-hidden="true" />
        <div className={styles.videoLabel} aria-hidden="true">
          <span>{serial}</span>
          <strong>FORGE FLOOR</strong>
        </div>
        <div className={styles.cornerTL} aria-hidden="true" />
        <div className={styles.cornerBR} aria-hidden="true" />
      </div>

      <div className={styles.stripe} aria-hidden="true">
        <span>MM</span>
        <i />
        <span>NSW</span>
        <i />
        <span>26</span>
      </div>

      <div className={styles.copyColumn}>
        <NeuoSurface className={styles.copyInner}>
          <span className={styles.kicker}>Forge — Oak Flats</span>
          <h1 id="sbs-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>

          <dl className={styles.specs}>
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.actions}>
            <Link
              href={primaryCta.href}
              className={`${styles.cta} ${primaryCta.emphasis === "ghost" ? styles.ctaGhost : styles.ctaPrimary}`}
            >
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className={`${styles.cta} ${secondaryCta.emphasis === "primary" ? styles.ctaPrimary : styles.ctaGhost}`}
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </NeuoSurface>
      </div>
    </section>
  )
}

