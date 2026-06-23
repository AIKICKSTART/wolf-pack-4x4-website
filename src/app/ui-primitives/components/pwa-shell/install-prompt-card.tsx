"use client"

import { Download, Share2, X } from "lucide-react"
import type { ReactNode } from "react"

import { MufflermenMonogramIcon } from "../icons/mufflermen-monogram"
import type { PwaPlatform } from "./pwa-shell-types"
import styles from "./install-prompt-card.module.css"

interface InstallPromptCardProps {
  platform: PwaPlatform
  appName?: string
  subtitle?: string
  description?: string
  onInstall?: () => void
  onDismiss?: () => void
  className?: string
}

interface StepEntry {
  copy: ReactNode
}

const IOS_STEPS: ReadonlyArray<StepEntry> = [
  {
    copy: (
      <>
        Tap the <span className={styles.stepGlyph}><Share2 size={11} strokeWidth={2.4} aria-hidden="true" /> Share</span> icon in Safari&apos;s bottom bar.
      </>
    ),
  },
  {
    copy: (
      <>
        Scroll down and choose <span className={styles.stepGlyph}>Add to Home Screen</span>.
      </>
    ),
  },
  {
    copy: <>Confirm with <span className={styles.stepGlyph}>Add</span> in the top-right corner.</>,
  },
]

const ANDROID_STEPS: ReadonlyArray<StepEntry> = [
  {
    copy: (
      <>
        Open Chrome&apos;s overflow <span className={styles.stepGlyph}>⋮ menu</span> in the top-right.
      </>
    ),
  },
  {
    copy: (
      <>
        Choose <span className={styles.stepGlyph}>Install app</span> or <span className={styles.stepGlyph}>Add to Home screen</span>.
      </>
    ),
  },
  {
    copy: <>Confirm with <span className={styles.stepGlyph}>Install</span>.</>,
  },
]

export function InstallPromptCard({
  platform,
  appName = "Mufflermen Crew",
  subtitle = "Workshop tablet · v3.4",
  description,
  onInstall,
  onDismiss,
  className,
}: InstallPromptCardProps) {
  const steps = platform === "ios" ? IOS_STEPS : ANDROID_STEPS
  const platformLabel = platform === "ios" ? "iOS · Safari" : "Android · Chrome"
  const installLabel = platform === "ios" ? "Show me how" : "Install app"
  const helpCopy =
    description ??
    (platform === "ios"
      ? "Pop Mufflermen Crew on the home screen so the tablet boots straight into the bay queue."
      : "Install Mufflermen Crew for fullscreen mode, offline jobs and push alerts when parts land at reception.")

  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Install ${appName} on ${platformLabel}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <MufflermenMonogramIcon size={28} />
        </span>
        <div className={styles.titles}>
          <h2 className={styles.title}>{appName}</h2>
          <span className={styles.subtitle}>{subtitle}</span>
        </div>
        <span className={styles.platform}>{platformLabel}</span>
      </header>
      <p className={styles.copy}>{helpCopy}</p>
      <ol className={styles.steps}>
        {steps.map((entry, index) => (
          <li key={index} className={styles.step}>
            <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
            <span>{entry.copy}</span>
          </li>
        ))}
      </ol>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={onInstall}
          aria-label={`${installLabel} for ${appName}`}
        >
          <Download size={14} strokeWidth={2.4} aria-hidden="true" />
          {installLabel}
        </button>
        {onDismiss && (
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={onDismiss}
            aria-label="Dismiss install prompt"
          >
            <X size={14} strokeWidth={2.4} aria-hidden="true" />
            Not now
          </button>
        )}
      </div>
    </section>
  )
}

export default InstallPromptCard
