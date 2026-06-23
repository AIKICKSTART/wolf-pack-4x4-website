"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useTransform } from "framer-motion"

import { useElementScrollProgress } from "./scroll-progress"
import styles from "./parallax-scroll-hero.module.css"

export interface ParallaxHeroAction {
  label: string
  href: string
}

export interface ParallaxScrollHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: ParallaxHeroAction
  reelTag?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

export function ParallaxScrollHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  cta,
  reelTag = "Field reel 003 · Twin loop",
}: ParallaxScrollHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const scrollYProgress = useElementScrollProgress(ref)

  const videoY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-18%", "18%"])
  const videoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.18, 1.05])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.2, 0.42, 0.78])
  const stripeY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-32%"])

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="parallax-headline">
      <div className={styles.gridLayout}>
        <header className={styles.headBlock}>
          <span className={styles.numeral} aria-hidden="true">02</span>
          <span className={styles.tag}>{reelTag}</span>
          <h1 id="parallax-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <Link href={cta.href} className={styles.cta}>
            {cta.label}
            <em aria-hidden="true">↗</em>
          </Link>
        </header>

        <div className={styles.viewport}>
          <div className={styles.viewportInner}>
            <motion.video
              className={styles.video}
              style={{ y: videoY, scale: videoScale }}
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
            </motion.video>
            <motion.div
              className={styles.tintOverlay}
              style={{ opacity: overlayOpacity }}
              aria-hidden="true"
            />
            <div className={styles.scanlines} aria-hidden="true" />
            <div className={styles.viewportLabel} aria-hidden="true">
              <span>LIVE FEED</span>
              <strong>F-003</strong>
            </div>
          </div>
          <motion.aside
            className={styles.numeralStripe}
            style={{ y: stripeY }}
            aria-hidden="true"
          >
            <span>2026</span>
            <span>2026</span>
            <span>2026</span>
            <span>2026</span>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

