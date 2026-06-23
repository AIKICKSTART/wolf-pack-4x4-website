import type { BlogAuthor } from "./types"
import styles from "./author-byline.module.css"

export interface AuthorBylineProps {
  author: BlogAuthor
  /** ISO date string. */
  date?: string
  /** Whole-minute reading time. */
  readingMinutes?: number
  /** Visual density. `compact` is for cards; `expanded` shows the bio. */
  size?: "compact" | "expanded"
  className?: string
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function formatDate(iso: string): string {
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) {
    return iso
  }
  return parsed.toLocaleDateString("en-AU", DATE_FORMAT)
}

export function AuthorByline({
  author,
  date,
  readingMinutes,
  size = "compact",
  className,
}: AuthorBylineProps) {
  const classes = [styles.byline, styles[size], className].filter(Boolean).join(" ")

  const avatar = author.avatarSrc ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={styles.avatarImg} src={author.avatarSrc} alt="" loading="lazy" />
  ) : (
    <span className={styles.monogram} aria-hidden="true">
      {initialsOf(author.name)}
    </span>
  )

  return (
    <div className={classes}>
      <span className={styles.avatar}>{avatar}</span>

      <div className={styles.meta}>
        <span className={styles.name}>{author.name}</span>

        {size === "expanded" && author.role ? (
          <span className={styles.role}>{author.role}</span>
        ) : null}

        <span className={styles.dateline}>
          {date ? (
            <time className={styles.date} dateTime={date}>
              {formatDate(date)}
            </time>
          ) : null}
          {date && typeof readingMinutes === "number" ? (
            <span className={styles.dot} aria-hidden="true" />
          ) : null}
          {typeof readingMinutes === "number" ? (
            <span className={styles.reading}>{readingMinutes} min read</span>
          ) : null}
        </span>

        {size === "expanded" && author.bio ? (
          <p className={styles.bio}>{author.bio}</p>
        ) : null}
      </div>
    </div>
  )
}

export default AuthorByline
