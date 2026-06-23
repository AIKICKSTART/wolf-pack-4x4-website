"use client"

import Link from "next/link"

import styles from "./spotlight-mask-hero.module.css"

export interface SpotlightMaskHeroAction {
  label: string
  href: string
}

export interface SpotlightMaskHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: SpotlightMaskHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

export function SpotlightMaskHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "LIGHTING · BAY 03 · 1500K",
}: SpotlightMaskHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="spotlight-mask-headline">
      {/* Base layer: heavily darkened workshop video */}
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
          {videoSrcWebm ? <source src={videoSrcWebm} type="video/webm" /> : null}
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className={styles.dim} />
      </div>

      {/* Lit layer: the SAME video, brighter, revealed only through the
          drifting radial-gradient spotlight mask. This is the distinctive shape. */}
      <div className={styles.spotlight} aria-hidden="true">
        <video
          className={styles.videoLit}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
        >
          {videoSrcWebm ? <source src={videoSrcWebm} type="video/webm" /> : null}
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className={styles.beam} />
      </div>

      {/* Volumetric beam edge + dust to sell the light cone */}
      <div className={styles.halo} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="spotlight-mask-headline" className={styles.headline}>
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
        <span>SPOTLIGHT · RADIAL DRIFT</span>
        <span>EXPOSURE · −2.4 EV BASE</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
