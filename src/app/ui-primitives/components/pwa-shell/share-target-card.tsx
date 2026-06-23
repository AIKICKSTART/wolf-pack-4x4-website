"use client"

import { FileText, Image as ImageIcon, Send, Share2, Video } from "lucide-react"

import type { PwaShareChannel, PwaShareMedia } from "./pwa-shell-types"
import styles from "./share-target-card.module.css"

interface ShareTargetCardProps {
  caption: string
  source?: string
  receivedAt?: string
  media?: PwaShareMedia
  channels: ReadonlyArray<PwaShareChannel>
  selectedChannelIds: ReadonlyArray<string>
  onToggleChannel?: (channelId: string) => void
  onShare?: () => void
  onCancel?: () => void
  className?: string
}

const MEDIA_ICON = {
  image: ImageIcon,
  video: Video,
  file: FileText,
} as const

export function ShareTargetCard({
  caption,
  source = "Camera",
  receivedAt = "Just now",
  media,
  channels,
  selectedChannelIds,
  onToggleChannel,
  onShare,
  onCancel,
  className,
}: ShareTargetCardProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ")
  const captionWordCount = caption.trim().split(/\s+/).filter(Boolean).length
  const selectedSet = new Set(selectedChannelIds)
  const MediaGlyph = media ? MEDIA_ICON[media.kind] : null

  return (
    <section className={classes} aria-label="Share target receiver">
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Share2 size={18} strokeWidth={2.2} />
        </span>
        <div className={styles.titles}>
          <h2 className={styles.title}>Send to crew</h2>
          <span className={styles.subtitle}>From {source} · {receivedAt}</span>
        </div>
      </header>
      <p className={styles.caption}>{caption}</p>
      <div className={styles.captionMeta}>
        <span>{captionWordCount} words</span>
        <span>{caption.length} chars</span>
      </div>
      {media && MediaGlyph && (
        <div className={styles.media}>
          <span
            className={styles.mediaThumb}
            aria-hidden="true"
            style={
              media.thumbnail
                ? {
                    backgroundImage: `url(${media.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            {!media.thumbnail && <MediaGlyph size={24} strokeWidth={2} />}
          </span>
          <div className={styles.mediaInfo}>
            <span className={styles.mediaLabel}>{media.label}</span>
            <span className={styles.mediaKind}>{media.kind}</span>
          </div>
          {media.size && <span className={styles.mediaSize}>{media.size}</span>}
        </div>
      )}
      <span className={styles.channelsLabel}>Send to</span>
      <ul className={styles.channels} role="group" aria-label="Share channels">
        {channels.map((channel) => {
          const selected = selectedSet.has(channel.id)
          const classList = [
            styles.channel,
            selected ? styles.channelSelected : "",
          ]
            .filter(Boolean)
            .join(" ")
          const aria = channel.recipient
            ? `${channel.label} · ${channel.recipient}`
            : channel.label
          return (
            <li key={channel.id}>
              <button
                type="button"
                className={classList}
                aria-pressed={selected}
                aria-label={aria}
                onClick={() => onToggleChannel?.(channel.id)}
              >
                {channel.icon}
                {channel.label}
              </button>
            </li>
          )
        })}
      </ul>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.shareBtn}
          onClick={onShare}
          disabled={selectedChannelIds.length === 0}
          aria-label={`Share to ${selectedChannelIds.length} channels`}
        >
          <Send size={13} strokeWidth={2.4} aria-hidden="true" />
          Share now
        </button>
        {onCancel && (
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </section>
  )
}

export default ShareTargetCard
