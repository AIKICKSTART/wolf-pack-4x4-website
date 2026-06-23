"use client"

import { Reply, Smile, MessageSquare } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type {
  MentionInboxItem,
  PlatformDescriptor,
  SocialPlatform,
} from "./social-scheduler-types"

interface MentionInboxRowProps {
  mention: MentionInboxItem
  platform: PlatformDescriptor
  onReply?: (mentionId: string) => void
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

const KIND_LABEL: Record<MentionInboxItem["kind"], string> = {
  mention: "@ mention",
  comment: "comment",
  dm: "direct msg",
  reply: "reply",
}

const SENTIMENT_LABEL: Record<MentionInboxItem["sentiment"], string> = {
  positive: "positive",
  neutral: "neutral",
  negative: "negative",
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const diffMs = Date.now() - date.getTime()
  const diffMin = Math.round(diffMs / 60000)
  if (diffMin < 1) return "now"
  if (diffMin < 60) return `${diffMin}m`
  const diffHr = Math.round(diffMin / 60)
  if (diffHr < 24) return `${diffHr}h`
  return date.toLocaleDateString("en-AU", { day: "2-digit", month: "short" })
}

function sentimentClass(sentiment: MentionInboxItem["sentiment"]): string {
  if (sentiment === "positive") return styles.mentionSentimentPos
  if (sentiment === "negative") return styles.mentionSentimentNeg
  return styles.mentionSentimentNeu
}

export function MentionInboxRow({
  mention,
  platform,
  onReply,
}: MentionInboxRowProps) {
  return (
    <article
      className={`${styles.frame} ${styles.mentionRow} ${
        mention.unread ? styles.mentionRowUnread : ""
      } ${PLATFORM_CLASS[mention.platform]}`}
      aria-label={`${KIND_LABEL[mention.kind]} from ${mention.authorName} on ${platform.label}, sentiment ${SENTIMENT_LABEL[mention.sentiment]}`}
    >
      <span className={styles.mentionAvatar} aria-hidden="true">
        {initials(mention.authorName)}
      </span>

      <div className={styles.mentionBody}>
        <div className={styles.mentionHeadRow}>
          <span className={styles.mentionAuthor}>{mention.authorName}</span>
          <span className={styles.mentionHandle}>{mention.authorHandle}</span>
          <span className={styles.mentionKind}>{KIND_LABEL[mention.kind]}</span>
        </div>
        {mention.context && (
          <p className={styles.mentionContext}>{mention.context}</p>
        )}
        <p className={styles.mentionText}>{mention.body}</p>
        <span className={styles.mentionMeta}>
          <span>{platform.label} · {formatTime(mention.receivedAt)}</span>
          <span className={`${styles.mentionSentiment} ${sentimentClass(mention.sentiment)}`}>
            <Smile size={11} aria-hidden="true" /> {SENTIMENT_LABEL[mention.sentiment]}
          </span>
        </span>
      </div>

      <div className={styles.mentionActions}>
        <button
          type="button"
          className={`${styles.mentionReplyBtn} ${styles.mentionReplyBtnPrimary}`}
          onClick={() => onReply?.(mention.id)}
          aria-label={`Reply to ${mention.authorName}`}
        >
          <Reply size={11} aria-hidden="true" /> Reply
        </button>
        <button
          type="button"
          className={styles.mentionReplyBtn}
          aria-label="Open thread"
        >
          <MessageSquare size={11} aria-hidden="true" /> Thread
        </button>
      </div>
    </article>
  )
}

export default MentionInboxRow
