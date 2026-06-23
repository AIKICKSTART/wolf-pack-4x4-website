import { Fragment } from "react"
import Link from "next/link"

import { Marquee } from "../primitives/marquee"

import styles from "./full-bleed-marquee-hero.module.css"

export interface FullBleedMarqueeHeroAction {
  label: string
  href: string
}

export interface FullBleedMarqueeHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: FullBleedMarqueeHeroAction
  marqueePhrases?: string[]
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

const DEFAULT_PHRASES = [
  "TWIN LOOP REZ",
  "OAK FLATS WORKSHOP",
  "MIG · TIG · WELD",
  "PUSH ROD HEROES",
  "AUSSIE STEEL",
]

export function FullBleedMarqueeHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  cta,
  marqueePhrases = DEFAULT_PHRASES,
}: FullBleedMarqueeHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="full-bleed-headline">
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

      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.darken} aria-hidden="true" />
      <div className={styles.dashedRing} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.kicker}>Active build · NSW</span>
        <h1 id="full-bleed-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead}>{subhead}</p>
        <Link href={cta.href} className={styles.cta}>
          <span className={styles.ctaDot} aria-hidden="true" />
          {cta.label}
        </Link>
      </div>

      <div className={styles.marqueeStrip}>
        <Marquee speed={28} gap={48} fadeEdges={false} ariaLabel="Mufflermen tagline ticker">
          {marqueePhrases.map((phrase, index) => (
            <Fragment key={`${phrase}-${index}`}>
              <span className={styles.marqueeItem}>{phrase}</span>
              <span className={styles.marqueeSeparator} aria-hidden="true">★</span>
            </Fragment>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

