import styles from "./social-scheduler.module.css"
import type {
  MediaBinderItem,
  PlatformDescriptor,
  SocialPlatform,
} from "./social-scheduler-types"

interface MediaBinderProps {
  title?: string
  items: ReadonlyArray<MediaBinderItem>
  platforms: ReadonlyArray<PlatformDescriptor>
}

const FIT_CLASS: Record<"ok" | "warn" | "fail", string> = {
  ok: styles.mediaBinderFitOk,
  warn: styles.mediaBinderFitWarn,
  fail: styles.mediaBinderFitFail,
}

const FIT_LABEL: Record<"ok" | "warn" | "fail", string> = {
  ok: "ok",
  warn: "crop",
  fail: "fail",
}

function formatDuration(seconds: number | undefined): string {
  if (!seconds) return "—"
  const mm = Math.floor(seconds / 60)
  const ss = Math.floor(seconds % 60)
  return `${mm}:${String(ss).padStart(2, "0")}`
}

export function MediaBinder({
  title = "Media binder",
  items,
  platforms,
}: MediaBinderProps) {
  return (
    <section
      className={`${styles.frame} ${styles.mediaBinder}`}
      aria-label={title}
    >
      <header className={styles.mediaBinderHead}>
        <h2 className={styles.mediaBinderTitle}>{title}</h2>
        <span className={styles.composerEyebrow}>
          {items.length} asset{items.length === 1 ? "" : "s"} attached
        </span>
      </header>

      <div className={styles.mediaBinderList} role="list">
        {items.map((item) => (
          <article
            key={item.id}
            className={styles.mediaBinderItem}
            role="listitem"
            aria-label={`${item.fileName}, ${item.kind}, ${item.aspectRatio} aspect`}
          >
            <div className={styles.mediaBinderThumb} aria-hidden="true">
              <span className={styles.mediaBinderThumbTag}>
                {item.kind.toUpperCase()}
              </span>
              <span>{item.placeholder}</span>
            </div>
            <span className={styles.mediaBinderName}>{item.fileName}</span>
            <span className={styles.mediaBinderMeta}>
              {item.aspectRatio} · {item.sizeMB.toFixed(1)} MB
              {item.durationSeconds ? ` · ${formatDuration(item.durationSeconds)}` : ""}
            </span>
            <div
              className={styles.mediaBinderFit}
              aria-label="Per-platform aspect ratio fit"
            >
              {platforms.map((platform) => {
                const fit = item.fit[platform.key as SocialPlatform]
                if (!fit) return null
                return (
                  <span
                    key={platform.key}
                    className={`${styles.mediaBinderFitChip} ${FIT_CLASS[fit]}`}
                    title={`${platform.label}: ${FIT_LABEL[fit]}`}
                  >
                    {platform.mark} {FIT_LABEL[fit]}
                  </span>
                )
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MediaBinder
