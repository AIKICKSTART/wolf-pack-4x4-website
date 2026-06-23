"use client"

import { useId, useSyncExternalStore } from "react"
import Link from "next/link"

import styles from "./liquid-blob-hero.module.css"

export interface LiquidBlobHeroAction {
  label: string
  href: string
}

export interface LiquidBlobHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: LiquidBlobHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

/**
 * Two blob silhouettes in objectBoundingBox space (0..1) that share the exact
 * same command structure (M + four cubic C segments + Z) so they morph cleanly.
 * Smooth bezier lobes, organic asymmetry, no self-intersection at either pole.
 */
const BLOB_A =
  "M0.52,0.06 C0.74,0.04 0.95,0.18 0.95,0.42 C0.95,0.66 0.86,0.93 0.58,0.95 C0.30,0.97 0.05,0.80 0.05,0.52 C0.05,0.24 0.30,0.08 0.52,0.06 Z"
const BLOB_B =
  "M0.50,0.05 C0.78,0.07 0.96,0.30 0.94,0.54 C0.92,0.78 0.74,0.94 0.48,0.96 C0.22,0.98 0.06,0.74 0.07,0.48 C0.08,0.22 0.22,0.03 0.50,0.05 Z"

const MORPH_VALUES = `${BLOB_A};${BLOB_B};${BLOB_A}`
const MORPH_DUR = "9s"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** Subscribes to the reduced-motion preference via an external store (SSR-safe). */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

/** Mirror of the SVG path in 0..400 user space for the chrome rim stroke. */
const RIM_A =
  "M208,24 C296,16 380,72 380,168 C380,264 344,372 232,380 C120,388 20,320 20,208 C20,96 120,32 208,24 Z"
const RIM_B =
  "M200,20 C312,28 384,120 376,216 C368,312 296,376 192,384 C88,392 24,296 28,192 C32,88 88,12 200,20 Z"
const RIM_VALUES = `${RIM_A};${RIM_B};${RIM_A}`

export function LiquidBlobHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "FLUID · 00:00:11:21",
}: LiquidBlobHeroProps) {
  const rawId = useId()
  const safeId = rawId.replace(/[:]/g, "")
  const clipId = `liquid-blob-clip-${safeId}`
  const rimGradId = `liquid-blob-chrome-${safeId}`

  const reduceMotion = usePrefersReducedMotion()
  const animate = !reduceMotion

  return (
    <section
      className={styles.hero}
      data-reduced={reduceMotion ? "true" : "false"}
      aria-labelledby="liquid-blob-headline"
    >
      <div className={styles.atmosphere} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      {/* objectBoundingBox clip path → fully responsive, scales to the stage box. */}
      <svg className={styles.defs} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={BLOB_A}>
              {animate ? (
                <animate
                  attributeName="d"
                  values={MORPH_VALUES}
                  dur={MORPH_DUR}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                />
              ) : null}
            </path>
          </clipPath>
        </defs>
      </svg>

      <div className={styles.layout}>
        <header className={styles.copy}>
          <span className={styles.kicker}>
            <i aria-hidden="true" />
            {timestampLabel}
          </span>
          <h1 id="liquid-blob-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <div className={styles.spec} aria-hidden="true">
            <span>VISCOSITY · MIRROR FLOW</span>
            <svg width="40" height="14" viewBox="0 0 40 14" aria-hidden="true">
              <path
                d="M0 7 L34 7 M30 3 L34 7 L30 11"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </div>
          <Link href={cta.href} className={styles.cta}>
            <span>{cta.label}</span>
            <span className={styles.ctaArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </header>

        <div className={styles.stage}>
          <div className={styles.blobWrap}>
            {/* Chrome rim-light: an SVG ring stroked with a chrome gradient that
                morphs in lockstep with the clip, so the edge reads metallic. */}
            <svg
              className={styles.rim}
              viewBox="0 0 400 400"
              aria-hidden="true"
              focusable="false"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={rimGradId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 97%, white)" />
                  <stop offset="22%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 68%, black)" />
                  <stop offset="46%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 22%, black)" />
                  <stop offset="60%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 80%, black)" />
                  <stop offset="82%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 46%, black)" />
                  <stop offset="100%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 92%, white)" />
                </linearGradient>
              </defs>
              <path
                className={styles.rimPath}
                d={RIM_A}
                fill="none"
                stroke={`url(#${rimGradId})`}
                strokeWidth="6"
              >
                {animate ? (
                  <animate
                    attributeName="d"
                    values={RIM_VALUES}
                    dur={MORPH_DUR}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                  />
                ) : null}
              </path>
            </svg>

            {/* The masked media. clip-path references the morphing SVG path. */}
            <div
              className={styles.clip}
              style={{ clipPath: `url(#${clipId})` }}
            >
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
              <div className={styles.gloss} aria-hidden="true" />
            </div>
          </div>

          <span className={styles.tag} aria-hidden="true">
            <i />
            LIQUID MASK · MORPH LOOP
          </span>
        </div>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>BEZIER LOBES · OBJECT-BOX CLIP</span>
        <span>CHROME RIM · {MORPH_DUR.toUpperCase()} CYCLE</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}
