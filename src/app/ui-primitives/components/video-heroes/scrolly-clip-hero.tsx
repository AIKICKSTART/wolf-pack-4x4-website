"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useTransform } from "framer-motion"

import { useElementScrollProgress } from "./scroll-progress"
import styles from "./scrolly-clip-hero.module.css"

export interface ScrollyClipHeroAction {
  label: string
  href: string
}

export interface ScrollyClipHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: ScrollyClipHeroAction
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

export function ScrollyClipHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  cta,
}: ScrollyClipHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const scrollYProgress = useElementScrollProgress(ref)

  const clipLeft = useTransform(scrollYProgress, [0, 0.5], reduce ? [0, 0] : [35, 0])
  const clipRight = useTransform(scrollYProgress, [0, 0.5], reduce ? [100, 100] : [65, 100])
  const headingX = useTransform(scrollYProgress, [0, 0.5], reduce ? ["0%", "0%"] : ["-12%", "0%"])

  const clipPath = useTransform<number, string>(
    [clipLeft, clipRight],
    ([left, right]) => `inset(0% ${100 - right}% 0% ${left}%)`,
  )

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="scrolly-clip-headline">
      <div className={styles.bgGradient} aria-hidden="true" />
      <div className={styles.tickerTop} aria-hidden="true">
        <span>OAK FLATS</span>
        <span>·</span>
        <span>2026</span>
        <span>·</span>
        <span>FIELD CAPTURE</span>
        <span>·</span>
        <span>04:00 LOOP</span>
      </div>

      <div className={styles.layout}>
        <motion.h1
          id="scrolly-clip-headline"
          className={styles.headline}
          style={{ x: headingX }}
        >
          {headline}
        </motion.h1>

        <div className={styles.clipFrame}>
          <motion.div
            className={styles.clipInner}
            style={{ clipPath }}
            aria-hidden="true"
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
              {videoSrcWebm ? <source src={videoSrcWebm} type="video/webm" /> : null}
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className={styles.videoTint} />
          </motion.div>

          <div className={styles.frameLabel} aria-hidden="true">
            <span>SCROLL → REVEAL</span>
            <strong>CLIP-PATH 30→100</strong>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.subhead}>{subhead}</p>
          <Link href={cta.href} className={styles.cta}>
            {cta.label}
            <em aria-hidden="true">→</em>
          </Link>
        </div>
      </div>
    </section>
  )
}

