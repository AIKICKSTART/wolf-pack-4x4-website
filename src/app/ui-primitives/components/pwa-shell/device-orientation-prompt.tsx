"use client"

import { RotateCcw } from "lucide-react"

import styles from "./device-orientation-prompt.module.css"

type OrientationTarget = "landscape" | "portrait"

interface DeviceOrientationPromptProps {
  target?: OrientationTarget
  title?: string
  subtitle?: string
  hint?: string
  onDismiss?: () => void
  className?: string
}

const TARGET_TITLE: Record<OrientationTarget, string> = {
  landscape: "Rotate to landscape",
  portrait: "Rotate to portrait",
}

const TARGET_HINT: Record<OrientationTarget, string> = {
  landscape: "Hold sideways",
  portrait: "Hold upright",
}

const TARGET_COPY: Record<OrientationTarget, string> = {
  landscape:
    "Dyno graphs and exhaust schematics need a wider canvas — give the screen a quarter turn to keep the trace honest.",
  portrait:
    "Job sheet works best held upright — pop the tablet vertical so the parts list stays in one column.",
}

export function DeviceOrientationPrompt({
  target = "landscape",
  title,
  subtitle,
  hint,
  onDismiss,
  className,
}: DeviceOrientationPromptProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ")
  const heading = title ?? TARGET_TITLE[target]
  const copy = subtitle ?? TARGET_COPY[target]
  const pill = hint ?? TARGET_HINT[target]

  return (
    <section
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={heading}
    >
      <div className={styles.glyph} aria-hidden="true">
        <span className={styles.arc} />
        <span className={styles.phone} />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>{heading}</h2>
        <p className={styles.subtitle}>{copy}</p>
      </div>
      <span className={styles.hint}>
        <RotateCcw size={11} strokeWidth={2.4} aria-hidden="true" />
        {pill}
      </span>
      {onDismiss && (
        <button type="button" className={styles.dismissBtn} onClick={onDismiss}>
          Stay in this orientation
        </button>
      )}
    </section>
  )
}

export default DeviceOrientationPrompt
