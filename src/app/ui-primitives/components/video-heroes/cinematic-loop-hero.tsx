"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import styles from "./cinematic-loop-hero.module.css"

export interface CinematicHeroAction {
  label: string
  href: string
}

export interface CinematicLoopHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: CinematicHeroAction
  timestampLabel?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

function useTypewriter(text: string, ready: boolean, speed = 26): string {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (!ready) {
      return
    }
    const id = window.setInterval(() => {
      setCount((current) => {
        const next = current + 1
        if (next >= text.length) {
          window.clearInterval(id)
        }
        return next
      })
    }, speed)
    return () => window.clearInterval(id)
  }, [text, ready, speed])

  if (!ready) {
    return text
  }
  return text.slice(0, count)
}

export function CinematicLoopHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  cta,
  timestampLabel = "REEL · 00:00:14:08",
}: CinematicLoopHeroProps) {
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])
  const animatedSubhead = useTypewriter(subhead, !reduceMotion)

  return (
    <section className={styles.hero} aria-labelledby="cinematic-loop-headline">
      <div className={styles.barTop} aria-hidden="true" />
      <div className={styles.barBottom} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.maskGradient} aria-hidden="true" />

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

      <div className={styles.frame} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          {timestampLabel}
        </span>
        <h1 id="cinematic-loop-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead} aria-live="polite">
          {animatedSubhead}
          <span className={styles.cursor} aria-hidden="true">|</span>
        </p>
        <Link href={cta.href} className={styles.cta}>
          <span>{cta.label}</span>
          <span className={styles.ctaArrow} aria-hidden="true">→</span>
        </Link>
      </div>

      <footer className={styles.meta} aria-hidden="true">
        <span>24 FPS · ANAMORPHIC 2.39:1</span>
        <span>EXHAUST · 04:00 LOOP</span>
        <span>NSW · OAK FLATS</span>
      </footer>
    </section>
  )
}

