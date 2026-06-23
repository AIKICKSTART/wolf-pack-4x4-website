import Link from "next/link"

import styles from "./masked-pipe-hero.module.css"

export interface MaskedPipeHeroAction {
  label: string
  href: string
}

export interface MaskedPipeHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: MaskedPipeHeroAction
  meta?: string
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

const MASK_ID = "muffler-pipe-mask"
const CLIP_ID = "muffler-pipe-clip"

export function MaskedPipeHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  cta,
  meta = "2.5\" PRESS-BENT · MIRROR POLISH",
}: MaskedPipeHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="masked-pipe-headline">
      <svg
        className={styles.hidden}
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 800 400"
      >
        <defs>
          <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d="
              M 0.04 0.38
              L 0.04 0.62
              Q 0.04 0.66 0.08 0.66
              L 0.22 0.66
              L 0.22 0.74
              Q 0.22 0.82 0.30 0.82
              L 0.62 0.82
              Q 0.70 0.82 0.70 0.74
              L 0.70 0.66
              L 0.86 0.66
              Q 0.92 0.66 0.94 0.60
              L 0.98 0.50
              L 0.94 0.40
              Q 0.92 0.34 0.86 0.34
              L 0.70 0.34
              L 0.70 0.26
              Q 0.70 0.18 0.62 0.18
              L 0.30 0.18
              Q 0.22 0.18 0.22 0.26
              L 0.22 0.34
              L 0.08 0.34
              Q 0.04 0.34 0.04 0.38
              Z
            " />
          </clipPath>
          <mask id={MASK_ID}>
            <rect width="100%" height="100%" fill="black" />
            <use href={`#${CLIP_ID}-shape`} fill="white" />
          </mask>
        </defs>
      </svg>

      <div className={styles.layout}>
        <header className={styles.copy}>
          <span className={styles.serial}>SKU MM-EX-009 ·</span>
          <h1 id="masked-pipe-headline" className={styles.headline}>
            {headline}
          </h1>
          <p className={styles.subhead}>{subhead}</p>
          <div className={styles.metaRow}>
            <span>{meta}</span>
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
            {cta.label}
          </Link>
        </header>

        <div className={styles.pipeStage}>
          <div className={styles.pipeMask}>
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
            <div className={styles.shineOverlay} aria-hidden="true" />
          </div>
          <svg
            className={styles.pipeStroke}
            viewBox="0 0 800 400"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="
                M 32 152
                L 32 248
                Q 32 264 64 264
                L 176 264
                L 176 296
                Q 176 328 240 328
                L 496 328
                Q 560 328 560 296
                L 560 264
                L 688 264
                Q 736 264 752 240
                L 784 200
                L 752 160
                Q 736 136 688 136
                L 560 136
                L 560 104
                Q 560 72 496 72
                L 240 72
                Q 176 72 176 104
                L 176 136
                L 64 136
                Q 32 136 32 152
                Z
              "
              fill="none"
              stroke="var(--primitive-amber)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
          </svg>
          <span className={styles.tagPipe} aria-hidden="true">
            <i />EXHAUST · BORE FEED
          </span>
        </div>
      </div>
    </section>
  )
}

