import type { ReactNode } from "react"

import styles from "./mobile-viewport.module.css"

export type MobileViewportTone = "dark" | "light"

interface MobileViewportProps {
  children: ReactNode
  safeArea?: boolean
  tone?: MobileViewportTone
  label?: string
  className?: string
}

const TONE_CLASS: Record<MobileViewportTone, string> = {
  dark: styles.toneDark,
  light: styles.toneLight,
}

export function MobileViewport({
  children,
  safeArea = true,
  tone = "dark",
  label = "Mobile preview",
  className,
}: MobileViewportProps) {
  const classes = [styles.frame, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  return (
    <div className={styles.wrap}>
      <div className={classes} role="group" aria-label={label}>
        <span className={styles.notch} aria-hidden="true" />
        <span className={styles.speaker} aria-hidden="true" />
        <span className={styles.camera} aria-hidden="true" />
        <div className={[styles.screen, safeArea ? styles.screenSafe : ""].filter(Boolean).join(" ")}>
          {children}
        </div>
        <span className={styles.indicator} aria-hidden="true" />
      </div>
    </div>
  )
}

export default MobileViewport
