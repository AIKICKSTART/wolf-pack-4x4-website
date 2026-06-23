import Link from "next/link"

import { AuthorByline } from "./author-byline"
import type { BlogAccent, BlogPostSummary } from "./types"
import styles from "./blog-card.module.css"

export interface BlogCardProps {
  post: BlogPostSummary
  /** `horizontal` puts the image beside the copy (list rows / featured spots). */
  orientation?: "vertical" | "horizontal"
  className?: string
}

const ACCENT_CLASS: Record<BlogAccent, string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export function BlogCard({ post, orientation = "vertical", className }: BlogCardProps) {
  const accent = post.accent ?? "red"
  const classes = [
    styles.card,
    orientation === "horizontal" ? styles.horizontal : styles.vertical,
    ACCENT_CLASS[accent],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes}>
      <Link href={post.href} className={styles.media} tabIndex={-1} aria-hidden="true">
        {post.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.image}
            src={post.imageSrc}
            alt={post.imageAlt ?? ""}
            loading="lazy"
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true">
            <span className={styles.placeholderMark} />
          </span>
        )}
        <span className={styles.scrim} aria-hidden="true" />
        <span className={styles.chip}>{post.categoryLabel}</span>
      </Link>

      <div className={styles.body}>
        <h3 className={styles.title}>
          <Link href={post.href} className={styles.titleLink}>
            <span className={styles.titleClamp}>{post.title}</span>
          </Link>
        </h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <AuthorByline
          author={post.author}
          date={post.date}
          readingMinutes={post.readingMinutes}
          className={styles.byline}
        />
      </div>
    </article>
  )
}

export default BlogCard
