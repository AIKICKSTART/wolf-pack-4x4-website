import Link from "next/link"

import styles from "./pulse-react-hero.module.css"

export type PulseHeroTone = "red" | "teal" | "green" | "amber"

export interface PulseHeroAction {
  label: string
  href: string
}

export interface PulseGaugeTick {
  label: string
  value: string
}

export interface PulseReactHeroProps {
  videoSrc?: string
  videoSrcWebm?: string
  posterSrc?: string
  headline: string
  subhead: string
  cta: PulseHeroAction
  tone?: PulseHeroTone
  gauge?: PulseGaugeTick[]
  pulseOrigin?: { x: number; y: number }
}

const DEFAULT_VIDEO_MP4 = "/media/cinematic/home-hero.mp4"
const DEFAULT_VIDEO_WEBM = undefined

const DEFAULT_GAUGE: PulseGaugeTick[] = [
  { label: "RPM", value: "6,400" },
  { label: "dB(A)", value: "82.4" },
  { label: "EGT", value: "748°C" },
]

const TONE_CLASS: Record<PulseHeroTone, string> = {
  red: "toneRed",
  teal: "toneTeal",
  green: "toneGreen",
  amber: "toneAmber",
}

export function PulseReactHero({
  videoSrc = DEFAULT_VIDEO_MP4,
  videoSrcWebm = DEFAULT_VIDEO_WEBM,
  posterSrc,
  headline,
  subhead,
  cta,
  tone = "red",
  gauge = DEFAULT_GAUGE,
  pulseOrigin = { x: 64, y: 52 },
}: PulseReactHeroProps) {
  return (
    <section
      className={[styles.hero, styles[TONE_CLASS[tone]]].join(" ")}
      aria-labelledby="pulse-react-headline"
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
      <div className={styles.darken} aria-hidden="true" />

      <div
        className={styles.pulseAnchor}
        style={{ top: `${pulseOrigin.y}%`, left: `${pulseOrigin.x}%` }}
        aria-hidden="true"
      >
        <span className={styles.pulseDot} />
        <span className={styles.pulseRing} style={{ animationDelay: "0s" }} />
        <span className={styles.pulseRing} style={{ animationDelay: "0.7s" }} />
        <span className={styles.pulseRing} style={{ animationDelay: "1.4s" }} />
      </div>

      <div className={styles.copy}>
        <span className={styles.kicker}>
          <i aria-hidden="true" />
          Live · Bench dyno
        </span>
        <h1 id="pulse-react-headline" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.subhead}>{subhead}</p>
        <Link href={cta.href} className={styles.cta}>
          {cta.label}
        </Link>
      </div>

      <aside className={styles.gauge} aria-label="Bench dyno readings">
        <header>
          <span>DYNO</span>
          <strong>BENCH 03</strong>
        </header>
        <ul>
          {gauge.map((tick) => (
            <li key={tick.label}>
              <span>{tick.label}</span>
              <strong>{tick.value}</strong>
            </li>
          ))}
        </ul>
        <div className={styles.gaugeBar} aria-hidden="true">
          <span />
        </div>
      </aside>
    </section>
  )
}

