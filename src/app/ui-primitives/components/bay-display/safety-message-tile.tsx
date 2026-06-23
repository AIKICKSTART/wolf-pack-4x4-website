"use client"

import { useEffect, useMemo, useState } from "react"
import { AlertTriangle, HardHat, Info, ShieldAlert } from "lucide-react"

import {
  SAFETY_TONE_LABEL,
  type SafetyTone,
} from "./bay-display-types"
import styles from "./safety-message-tile.module.css"

export interface SafetyMessage {
  id: string
  tone: SafetyTone
  /** Headline copy, short — "PPE inside the workshop". */
  headline: string
  /** Body copy, one sentence — "Closed shoes, safety glasses past the yellow line.". */
  body: string
}

export interface SafetyMessageTileProps {
  messages: ReadonlyArray<SafetyMessage>
  /** Rotation interval ms; 0 disables rotation. */
  intervalMs?: number
  className?: string
}

function ToneIcon({ tone }: { tone: SafetyTone }) {
  if (tone === "danger") return <ShieldAlert size={24} strokeWidth={2.4} aria-hidden="true" />
  if (tone === "caution") return <AlertTriangle size={24} strokeWidth={2.4} aria-hidden="true" />
  return <Info size={24} strokeWidth={2.4} aria-hidden="true" />
}

export function SafetyMessageTile({
  messages,
  intervalMs = 7000,
  className,
}: SafetyMessageTileProps) {
  const safe = useMemo(() => (messages.length > 0 ? messages : []), [messages])
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    if (intervalMs <= 0) return
    if (safe.length <= 1) return
    if (typeof window === "undefined") return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const cadence = media.matches ? intervalMs * 2 : intervalMs
    const t = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safe.length)
    }, cadence)
    return () => window.clearInterval(t)
  }, [safe.length, intervalMs])

  if (safe.length === 0) return null
  const active = safe[index]

  const classes = [styles.tile, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      data-tone={active.tone}
      role="region"
      aria-live="polite"
      aria-label={`Safety message — ${SAFETY_TONE_LABEL[active.tone]}: ${active.headline}`}
    >
      <header className={styles.head}>
        <span className={styles.iconWrap}>
          <ToneIcon tone={active.tone} />
        </span>
        <div className={styles.headCopy}>
          <span className={styles.toneLabel}>
            {SAFETY_TONE_LABEL[active.tone]}
          </span>
          <strong className={styles.headline}>{active.headline}</strong>
        </div>
        <span className={styles.hatBadge} aria-hidden="true">
          <HardHat size={22} strokeWidth={2.4} />
        </span>
      </header>
      <p className={styles.body}>{active.body}</p>
      <ol className={styles.dots} aria-hidden="true">
        {safe.map((m, i) => (
          <li key={m.id} data-active={i === index ? "on" : "off"} />
        ))}
      </ol>
    </article>
  )
}

export default SafetyMessageTile
