"use client"

import { useState } from "react"

import styles from "./push-notification-preview.module.css"

export type PushPreviewTone = "ios" | "android" | "lock"

export interface PushNotificationContent {
  appName: string
  appIcon?: string
  title: string
  body: string
  timestamp: string
}

interface PushNotificationPreviewProps {
  content: PushNotificationContent
  defaultTone?: PushPreviewTone
  showToneSelector?: boolean
  className?: string
}

const TONE_CLASS: Record<PushPreviewTone, string> = {
  ios: styles["preview-ios"],
  android: styles["preview-android"],
  lock: styles["preview-lock"],
}

const TONE_LABEL: Record<PushPreviewTone, string> = {
  ios: "iOS dark",
  android: "Android",
  lock: "Lock screen",
}

const TONE_ORDER: ReadonlyArray<PushPreviewTone> = ["ios", "android", "lock"]

export function PushNotificationPreview({
  content,
  defaultTone = "ios",
  showToneSelector = true,
  className,
}: PushNotificationPreviewProps) {
  const [tone, setTone] = useState<PushPreviewTone>(defaultTone)
  const initials = content.appName.slice(0, 2).toUpperCase()
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {showToneSelector && (
        <div className={styles.toneSelector} role="group" aria-label="Push preview tone">
          {TONE_ORDER.map((id) => (
            <button
              key={id}
              type="button"
              className={styles.toneBtn}
              aria-pressed={tone === id}
              onClick={() => setTone(id)}
            >
              {TONE_LABEL[id]}
            </button>
          ))}
        </div>
      )}

      <article
        className={`${styles.preview} ${TONE_CLASS[tone]}`}
        aria-label={`Push notification preview — ${TONE_LABEL[tone]}`}
      >
        <span className={styles.appIcon} aria-hidden="true">
          {initials}
        </span>
        <div className={styles.body}>
          <div className={styles.headRow}>
            <span className={styles.appName}>{content.appName}</span>
            <span className={styles.timestamp}>{content.timestamp}</span>
          </div>
          <h4 className={styles.title}>{content.title}</h4>
          <p className={styles.bodyText}>{content.body}</p>
        </div>
        <span className={styles.dismissHint} aria-hidden="true">
          Swipe ↓
        </span>
      </article>
    </div>
  )
}

export default PushNotificationPreview
