import type { ReactNode } from "react"

import styles from "./material-surface.module.css"

export type MaterialElevation = 0 | 1 | 2 | 3 | 4 | 5
export type MaterialTone = "primary" | "secondary" | "tertiary" | "surface"

interface MaterialSurfaceProps {
  elevation?: MaterialElevation
  tone?: MaterialTone
  className?: string
  children: ReactNode
}

const TONE_CLASS: Record<MaterialTone, string> = {
  primary: styles.tonePrimary,
  secondary: styles.toneSecondary,
  tertiary: styles.toneTertiary,
  surface: styles.toneSurface,
}

const ELEVATION_CLASS: Record<MaterialElevation, string> = {
  0: styles.elevation0,
  1: styles.elevation1,
  2: styles.elevation2,
  3: styles.elevation3,
  4: styles.elevation4,
  5: styles.elevation5,
}

export function MaterialSurface({
  elevation = 1,
  tone = "surface",
  className,
  children,
}: MaterialSurfaceProps) {
  const classes = [
    styles.surface,
    TONE_CLASS[tone],
    ELEVATION_CLASS[elevation],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}
