"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

import styles from "./overlay-narrative-hero.module.css"

export interface NarrativeHeroAction {
  label: string
  href: string
}

export interface NarrativeBeat {
  id: string
  text: string
  position: { top?: string; bottom?: string; left?: string; right?: string }
  tone?: "amber" | "teal" | "red" | "fog"
  delay?: number
}

export interface OverlayNarrativeHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  cta: NarrativeHeroAction
  beats?: NarrativeBeat[]
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

const DEFAULT_BEATS: NarrativeBeat[] = [
  {
    id: "beat-1",
    text: "→ 04:00 idle. Engine cold. The shop wakes up.",
    position: { top: "16%", left: "8%" },
    tone: "amber",
    delay: 0.4,
  },
  {
    id: "beat-2",
    text: "Twin loops. Stainless. Aussie hands.",
    position: { top: "44%", right: "6%" },
    tone: "teal",
    delay: 1.2,
  },
  {
    id: "beat-3",
    text: "Bore: 2.5″ → 3.0″ stepped",
    position: { top: "60%", left: "14%" },
    tone: "fog",
    delay: 2.0,
  },
  {
    id: "beat-4",
    text: "Built in Oak Flats. Driven everywhere.",
    position: { bottom: "18%", right: "10%" },
    tone: "red",
    delay: 2.8,
  },
]

export function OverlayNarrativeHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  cta,
  beats = DEFAULT_BEATS,
}: OverlayNarrativeHeroProps) {
  const reduce = useReducedMotion()

  return (
    <section className={styles.hero} aria-labelledby="narrative-headline">
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

      <div className={styles.fog} aria-hidden="true" />
      <div className={styles.gridLines} aria-hidden="true" />

      <div className={styles.beats} aria-hidden="true">
        {beats.map((beat) => (
          <motion.span
            key={beat.id}
            className={`${styles.beat} ${styles[`tone_${beat.tone ?? "fog"}`]}`}
            style={beat.position}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: reduce ? 0 : beat.delay ?? 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {beat.text}
          </motion.span>
        ))}
      </div>

      <div className={styles.headlineWrap}>
        <motion.h1
          id="narrative-headline"
          className={styles.headline}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {headline}
        </motion.h1>
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 3.2 }}
        >
          <Link href={cta.href} className={styles.cta}>
            {cta.label}
            <em aria-hidden="true">→</em>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

