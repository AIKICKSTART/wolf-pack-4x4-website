"use client"

import { useId } from "react"
import Link from "next/link"

import styles from "./dual-exposure-hero.module.css"

export interface DualExposureHeroAction {
  label: string
  href: string
}

export interface DualExposureHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: DualExposureHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/**
 * Splits the headline into up to two display lines so the silhouette word(s)
 * stay legible and balanced inside the SVG type mask. Long single words are
 * kept on one line; multi-word headlines break near the middle.
 */
function splitHeadline(headline: string): readonly string[] {
  const words = headline.trim().split(/\s+/).filter(Boolean)
  if (words.length <= 1) {
    return words
  }
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
}

export function DualExposureHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "EXPOSURE · A/B · DUOTONE",
}: DualExposureHeroProps) {
  const rawId = useId()
  const maskId = `dual-exposure-mask-${rawId}`.replace(/:/g, "")
  const headingId = `dual-exposure-headline-${rawId}`.replace(/:/g, "")
  const lines = splitHeadline(headline)
  const lineCount = lines.length || 1

  return (
    <section className={styles.hero} aria-labelledby={headingId}>
      {/* ---- Base exposure: toned, desaturated footage (full bleed) ---- */}
      <div className={styles.baseLayer} aria-hidden="true">
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
        <div className={styles.baseTone} />
      </div>

      {/* ---- Second exposure read through the type silhouette ----
          The same footage, brighter + amber-toned, composited with a
          screen/lighten blend and clipped to the headline letterforms via an
          SVG text mask. This is the distinctive double-exposure shape. */}
      <div className={styles.silhouetteStage} aria-hidden="true">
        <svg
          className={styles.maskSvg}
          viewBox="0 0 1000 560"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
          aria-hidden="true"
        >
          <defs>
            <mask
              id={maskId}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1000"
              height="560"
            >
              <rect x="0" y="0" width="1000" height="560" fill="black" />
              <text
                x="500"
                y="280"
                className={styles.maskText}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                data-lines={lineCount}
              >
                {lines.length <= 1 ? (
                  <tspan x="500" dy="0">
                    {lines[0] ?? headline}
                  </tspan>
                ) : (
                  lines.map((line, index) => (
                    <tspan
                      key={`${line}-${index}`}
                      x="500"
                      dy={index === 0 ? "-0.52em" : "1.04em"}
                    >
                      {line}
                    </tspan>
                  ))
                )}
              </text>
            </mask>
          </defs>

          {/* Group that carries the screen-blended bright exposure inside the
              letterforms. The image is a foreignObject so we can blend live
              video through the mask. */}
          <g mask={`url(#${maskId})`}>
            <foreignObject x="0" y="0" width="1000" height="560">
              <div className={styles.maskedFill}>
                <video
                  className={styles.videoBright}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={posterSrc}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
                <div className={styles.maskedTone} />
              </div>
            </foreignObject>
          </g>
        </svg>

        {/* Outline echo of the silhouette for premium definition */}
        <div className={styles.silhouetteGlow} />
      </div>

      {/* ---- Atmosphere ---- */}
      <div className={styles.scan} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      {/* ---- Copy ---- */}
      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>

        {/* Accessible headline. Visually we let the typographic silhouette read
            as the dominant form, while this heading carries the semantic text
            and a refined supporting treatment for non-mask viewports. */}
        <h1 id={headingId} className={styles.headline}>
          {lines.length <= 1 ? (
            headline
          ) : (
            lines.map((line, index) => (
              <span key={`${line}-${index}`} className={styles.headlineLine}>
                {line}
              </span>
            ))
          )}
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
        <span>BLEND · SCREEN</span>
        <span>DOUBLE EXPOSURE · 2.39:1</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
