"use client"

import { useMemo, useState } from "react"
import type { ChangeEvent } from "react"
import { Send, Image as ImageIcon, Sparkles, Clock } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type { PlatformDescriptor, SocialPlatform } from "./social-scheduler-types"

interface CrossPlatformComposerProps {
  eyebrow?: string
  title?: string
  platforms: ReadonlyArray<PlatformDescriptor>
  initialBody?: string
  initialHashtags?: ReadonlyArray<string>
  initialSelected?: ReadonlyArray<SocialPlatform>
  onSchedule?: (variants: ReadonlyArray<PreparedVariant>) => void
  onSaveDraft?: () => void
  onAiAssist?: () => void
}

export interface PreparedVariant {
  platform: SocialPlatform
  body: string
  hashtags: ReadonlyArray<string>
}

const PLATFORM_CLASS: Record<SocialPlatform, string> = {
  instagram: styles.platformInstagram,
  facebook: styles.platformFacebook,
  tiktok: styles.platformTiktok,
  x: styles.platformX,
  linkedin: styles.platformLinkedin,
  youtube: styles.platformYoutube,
  threads: styles.platformThreads,
  bluesky: styles.platformBluesky,
}

function trimToLimit(body: string, hashtags: ReadonlyArray<string>, limit: number): string {
  const hashtagSuffix = hashtags.length > 0 ? `\n\n${hashtags.join(" ")}` : ""
  const combined = `${body}${hashtagSuffix}`
  if (combined.length <= limit) return combined
  const allowed = Math.max(0, limit - hashtagSuffix.length - 1)
  return `${body.slice(0, allowed)}…${hashtagSuffix}`
}

function counterClass(used: number, limit: number): string {
  const ratio = used / limit
  if (ratio >= 1) return styles.composerCounterBad
  if (ratio > 0.85) return styles.composerCounterWarn
  return ""
}

export function CrossPlatformComposer({
  eyebrow = "Composer / multi-platform",
  title = "Workshop drop",
  platforms,
  initialBody = "",
  initialHashtags = [],
  initialSelected,
  onSchedule,
  onSaveDraft,
  onAiAssist,
}: CrossPlatformComposerProps) {
  const [body, setBody] = useState(initialBody)
  const [selected, setSelected] = useState<ReadonlySet<SocialPlatform>>(
    () => new Set(initialSelected ?? platforms.map((p) => p.key)),
  )

  const togglePlatform = (key: SocialPlatform) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const variants = useMemo<ReadonlyArray<PreparedVariant>>(() => {
    return platforms
      .filter((p) => selected.has(p.key))
      .map((p) => ({
        platform: p.key,
        body: trimToLimit(body, initialHashtags, p.charLimit),
        hashtags: initialHashtags,
      }))
  }, [body, initialHashtags, platforms, selected])

  return (
    <section
      className={`${styles.frame} ${styles.composer}`}
      aria-label="Cross-platform composer"
    >
      <header className={styles.composerHeader}>
        <div className={styles.composerTitle}>
          <span className={styles.composerEyebrow}>{eyebrow}</span>
          <h2 className={styles.composerName}>{title}</h2>
        </div>
        <div
          className={styles.composerPlatforms}
          role="group"
          aria-label="Select platforms"
        >
          {platforms.map((platform) => {
            const isOn = selected.has(platform.key)
            return (
              <button
                key={platform.key}
                type="button"
                className={`${styles.composerPlatformBtn} ${
                  isOn ? styles.composerPlatformBtnOn : ""
                } ${PLATFORM_CLASS[platform.key]}`}
                aria-pressed={isOn}
                onClick={() => togglePlatform(platform.key)}
              >
                <span aria-hidden="true">{platform.mark}</span>
                {platform.label}
              </button>
            )
          })}
        </div>
      </header>

      <div className={styles.composerBody}>
        <div className={styles.composerEditor}>
          <label htmlFor="composer-body" className={styles.composerEyebrow}>
            Caption
          </label>
          <textarea
            id="composer-body"
            className={styles.composerTextarea}
            value={body}
            placeholder="What's spinning in the bay today?"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setBody(event.target.value)
            }
            aria-describedby="composer-counters"
          />
          <div id="composer-counters" className={styles.composerMeta}>
            <span>
              {selected.size} of {platforms.length} channels armed
            </span>
            <span className={styles.composerCounter}>
              {body.length} char base
            </span>
          </div>
          <div className={styles.composerActions}>
            <button
              type="button"
              className={`${styles.composerBtn} ${styles.composerBtnPrimary}`}
              onClick={() => onSchedule?.(variants)}
            >
              <Send size={13} aria-hidden="true" /> Schedule
            </button>
            <button
              type="button"
              className={styles.composerBtn}
              onClick={() => onSaveDraft?.()}
            >
              <Clock size={13} aria-hidden="true" /> Save draft
            </button>
            <button
              type="button"
              className={styles.composerBtn}
              onClick={() => onAiAssist?.()}
            >
              <Sparkles size={13} aria-hidden="true" /> AI assist
            </button>
            <button type="button" className={styles.composerBtn}>
              <ImageIcon size={13} aria-hidden="true" /> Attach
            </button>
          </div>
        </div>

        <div
          className={styles.composerPreviews}
          aria-label="Per-platform preview"
        >
          {variants.map((variant) => {
            const platform = platforms.find((p) => p.key === variant.platform)
            if (!platform) return null
            const used = variant.body.length
            return (
              <article
                key={variant.platform}
                className={`${styles.composerPreview} ${PLATFORM_CLASS[variant.platform]}`}
                aria-label={`${platform.label} preview`}
              >
                <header className={styles.composerPreviewHead}>
                  <span className={styles.platformPill}>
                    <span className={styles.platformPillMark} aria-hidden="true">
                      {platform.mark}
                    </span>
                    {platform.label}
                  </span>
                  <span
                    className={`${styles.composerCounter} ${counterClass(used, platform.charLimit)}`}
                  >
                    {used} / {platform.charLimit}
                  </span>
                </header>
                <p className={styles.composerPreviewBody}>
                  {variant.body || (
                    <span className={styles.composerEyebrow}>
                      Caption preview appears here
                    </span>
                  )}
                </p>
                {variant.hashtags.length > 0 && (
                  <div className={styles.composerPreviewHashtags}>
                    {variant.hashtags.join(" ")}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CrossPlatformComposer
