"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import Link from "next/link"

import styles from "./triptych-hero.module.css"

export interface TriptychHeroAction {
  label: string
  href: string
}

export interface TriptychHeroProps {
  videoSrc?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: TriptychHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"

interface TriptychPanel {
  position: string
  label: string
  emphasis: boolean
}

/**
 * Three vertical slices of the same footage. Each panel reveals a different
 * horizontal third via object-position so the eye reads a single continuous
 * frame split by thin red dividers — the centre panel is the focal slice.
 */
const PANELS: readonly TriptychPanel[] = [
  { position: "18% 50%", label: "L · INTAKE", emphasis: false },
  { position: "50% 50%", label: "C · CHAMBER", emphasis: true },
  { position: "82% 50%", label: "R · OUTLET", emphasis: false },
]

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

/** Subscribes to the reduced-motion preference via an external store. */
function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

interface PanelMediaProps {
  panel: TriptychPanel
  index: number
  videoSrc: string
  posterSrc?: string
  reduceMotion: boolean
}

function PanelMedia({ panel, index, videoSrc, posterSrc, reduceMotion }: PanelMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Stagger playback so the offset slices feel parallactic, not mirrored.
  useEffect(() => {
    const node = videoRef.current
    if (!node || reduceMotion) {
      return
    }
    const offset = index * 0.9
    const seek = (): void => {
      if (Number.isFinite(node.duration) && node.duration > offset) {
        node.currentTime = offset
      }
    }
    if (node.readyState >= 1) {
      seek()
    } else {
      node.addEventListener("loadedmetadata", seek, { once: true })
    }
    return () => node.removeEventListener("loadedmetadata", seek)
  }, [index, reduceMotion])

  return (
    <video
      ref={videoRef}
      className={styles.video}
      style={{ objectPosition: panel.position }}
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
  )
}

export function TriptychHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "TRIPTYCH · 03:00:00:00",
}: TriptychHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <section className={styles.hero} aria-labelledby="triptych-headline">
      <div className={styles.atmosphere} aria-hidden="true" />

      <div
        className={`${styles.panels} ${reduceMotion ? styles.panelsStatic : ""}`}
        aria-hidden="true"
      >
        {PANELS.map((panel, index) => (
          <div
            key={panel.label}
            className={`${styles.panel} ${panel.emphasis ? styles.panelCenter : styles.panelSide}`}
            data-panel={index === 0 ? "left" : index === 1 ? "center" : "right"}
          >
            <div className={styles.panelMedia}>
              <PanelMedia
                panel={panel}
                index={index}
                videoSrc={videoSrc}
                posterSrc={posterSrc}
                reduceMotion={reduceMotion}
              />
              <span className={styles.panelTint} />
            </div>
            <span className={styles.panelLabel}>
              <i className={styles.panelDot} />
              {panel.label}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.dividers} aria-hidden="true">
        <span />
        <span />
      </div>

      <div className={styles.overlay}>
        <span className={styles.kicker}>
          <i className={styles.kickerDot} aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="triptych-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead}>{subhead}</p>
        <Link href={cta.href} className={styles.cta}>
          <span>{cta.label}</span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </Link>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>3 PANEL · OFFSET PARALLAX</span>
        <span>OAK FLATS · NSW</span>
      </footer>
    </section>
  )
}
