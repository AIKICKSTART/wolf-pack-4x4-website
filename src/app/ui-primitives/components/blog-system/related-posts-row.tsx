import { BlogCard } from "./blog-card"
import type { BlogPostSummary } from "./types"
import styles from "./related-posts-row.module.css"

export interface RelatedPostsRowProps {
  posts: ReadonlyArray<BlogPostSummary>
  /** Eyebrow above the heading. */
  kicker?: string
  /** Section heading. */
  heading?: string
  className?: string
}

export function RelatedPostsRow({
  posts,
  kicker = "Keep reading",
  heading = "More from the workshop",
  className,
}: RelatedPostsRowProps) {
  if (posts.length === 0) {
    return null
  }

  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <header className={styles.header}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 className={styles.heading}>{heading}</h2>
      </header>

      <ul className={styles.row}>
        {posts.map((post) => (
          <li key={post.id} className={styles.item}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RelatedPostsRow
