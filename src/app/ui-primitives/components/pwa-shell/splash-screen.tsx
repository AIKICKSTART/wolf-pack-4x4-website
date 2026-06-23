import type { CSSProperties } from "react"

import { MufflermenMonogramIcon } from "../icons/mufflermen-monogram"
import styles from "./splash-screen.module.css"

interface SplashScreenProps {
  appName?: string
  tagline?: string
  version?: string
  progress?: number
  bootStep?: string
  copyrightYear?: number
  region?: string
  className?: string
}

export function SplashScreen({
  appName = "Mufflermen Crew",
  tagline = "Oak Flats Workshop",
  version = "v3.4.1",
  progress = 0,
  bootStep = "Warming bays…",
  copyrightYear = 2026,
  region = "Oak Flats · NSW",
  className,
}: SplashScreenProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(progress)))
  const style: CSSProperties = {
    ["--boot-progress" as string]: `${clamped}%`,
  }
  const classes = [styles.root, className].filter(Boolean).join(" ")
  return (
    <section
      className={classes}
      aria-label={`${appName} splash screen`}
      style={style}
    >
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          <MufflermenMonogramIcon size={56} />
        </span>
        <h1 className={styles.title}>{appName}</h1>
        <p className={styles.tagline}>{tagline}</p>
      </div>
      <div className={styles.bootRow}>
        <span
          className={styles.bootTrack}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Boot progress ${clamped}%`}
        >
          <span className={styles.bootFill} />
        </span>
        <span className={styles.bootMeta}>
          <span className={styles.bootStep}>{bootStep}</span>
          <span>{clamped}%</span>
        </span>
      </div>
      <footer className={styles.footer}>
        <span>{region}</span>
        <span className={styles.version}>
          {version} · © {copyrightYear}
        </span>
      </footer>
    </section>
  )
}

export default SplashScreen
