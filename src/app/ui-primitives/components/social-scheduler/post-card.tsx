import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"

import styles from "./social-scheduler.module.css"
import type {
  PlatformDescriptor,
  ScheduledPost,
  SocialPlatform,
} from "./social-scheduler-types"

interface PostCardProps {
  post: ScheduledPost
  platforms: ReadonlyArray<PlatformDescriptor>
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

const STATUS_LABEL: Record<ScheduledPost["status"], string> = {
  draft: "Draft",
  "in-review": "In review",
  scheduled: "Scheduled",
  publishing: "Publishing",
  published: "Published",
  failed: "Failed",
}

function formatWhen(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function formatCount(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(value)
}

export function PostCard({ post, platforms }: PostCardProps) {
  return (
    <article
      className={`${styles.frame} ${styles.postCard}`}
      aria-label={`Scheduled post: ${post.title}`}
    >
      <header className={styles.postCardHead}>
        <h3 className={styles.postCardTitle}>{post.title}</h3>
        <span className={styles.postCardWhen}>{formatWhen(post.scheduledFor)}</span>
      </header>

      <div className={styles.postCardPills} aria-label="Target platforms">
        {post.platforms.map((key) => {
          const platform = platforms.find((p) => p.key === key)
          if (!platform) return null
          return (
            <span
              key={key}
              className={`${styles.platformPill} ${PLATFORM_CLASS[key]}`}
            >
              <span
                className={styles.platformPillMark}
                aria-hidden="true"
              >
                {platform.mark}
              </span>
              {platform.label}
            </span>
          )
        })}
      </div>

      <p className={styles.postCardPreview}>{post.preview}</p>

      <footer className={styles.postCardFooter}>
        <div
          className={styles.postCardEngagement}
          aria-label={
            post.engagement
              ? `Engagement preview: ${post.engagement.likes} likes, ${post.engagement.comments} comments, ${post.engagement.shares} shares, ${post.engagement.saves} saves`
              : "No engagement yet"
          }
        >
          {post.engagement ? (
            <>
              <span className={styles.postCardEngagementCell}>
                <Heart size={11} aria-hidden="true" />
                {formatCount(post.engagement.likes)}
              </span>
              <span className={styles.postCardEngagementCell}>
                <MessageCircle size={11} aria-hidden="true" />
                {formatCount(post.engagement.comments)}
              </span>
              <span className={styles.postCardEngagementCell}>
                <Share2 size={11} aria-hidden="true" />
                {formatCount(post.engagement.shares)}
              </span>
              <span className={styles.postCardEngagementCell}>
                <Bookmark size={11} aria-hidden="true" />
                {formatCount(post.engagement.saves)}
              </span>
            </>
          ) : (
            <span>No engagement yet</span>
          )}
        </div>
        <span
          className={styles.postCardStatusBadge}
          data-status={post.status}
        >
          {STATUS_LABEL[post.status]}
        </span>
      </footer>
    </article>
  )
}

export default PostCard
