"use client"

import { GitBranch } from "lucide-react"
import { useState } from "react"

import type {
  ChannelInfo,
  ReleaseChannel,
} from "./brand-control-types"
import styles from "./brand-control.module.css"

interface ReleaseChannelPillProps {
  channels: ReadonlyArray<ChannelInfo>
  defaultChannelId?: ReleaseChannel
  onChange?: (next: ReleaseChannel) => void
  className?: string
}

/**
 * Release-channel pill — segmented selector for alpha / beta / production
 * with the version, a count of pending diffs against production, and a
 * blurb describing who sees this channel.
 */
export function ReleaseChannelPill({
  channels,
  defaultChannelId = "alpha",
  onChange,
  className,
}: ReleaseChannelPillProps) {
  const [active, setActive] = useState<ReleaseChannel>(
    channels.find((c) => c.id === defaultChannelId)?.id ?? channels[0]?.id ?? "alpha"
  )
  const current = channels.find((c) => c.id === active) ?? channels[0]

  const handleSelect = (next: ReleaseChannel) => {
    setActive(next)
    onChange?.(next)
  }

  return (
    <article
      className={[styles.card, styles.cardCompact, className].filter(Boolean).join(" ")}
      aria-label="Release channel"
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <GitBranch size={12} aria-hidden="true" /> Umbrella · Channels
          </span>
          <h3 className={styles.title} style={{ fontSize: 18 }}>
            Release channel
          </h3>
        </div>
        {current && current.diffCount > 0 && (
          <span className={`${styles.tag} ${styles.tagAmber}`}>
            +{current.diffCount} ahead
          </span>
        )}
      </header>

      <div
        className={styles.channelGroup}
        role="radiogroup"
        aria-label="Release channel"
      >
        {channels.map((channel) => {
          const isActive = channel.id === active
          return (
            <button
              key={channel.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={[
                styles.channelButton,
                isActive && styles.channelActive,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handleSelect(channel.id)}
            >
              {channel.label}
            </button>
          )
        })}
      </div>

      {current && (
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            Version <strong>{current.version}</strong>
          </span>
          <span className={styles.tinyLabel}>{current.description}</span>
        </div>
      )}
    </article>
  )
}

export default ReleaseChannelPill
