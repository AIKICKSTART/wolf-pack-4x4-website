import Link from "next/link"

import { AuthorByline } from "./author-byline"
import type { BlogAccent, BlogPostSummary } from "./types"
import styles from "./featured-post-hero.module.css"

export interface FeaturedPostHeroProps {
  post: BlogPostSummary
  /** Eyebrow above the headline. */
  kicker?: string
  /** Link label. */
  ctaLabel?: string
  className?: string
}

const ACCENT_CLASS: Record<BlogAccent, string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export function FeaturedPostHero({
  post,
  kicker = "Featured story",
  ctaLabel = "Read the full story",
  className,
}: FeaturedPostHeroProps) {
  const accent = post.accent ?? "red"
  const classes = [styles.hero, ACCENT_CLASS[accent], className]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-label={post.title}>
      <div className={styles.media} aria-hidden="true">
        {post.imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.image} src={post.imageSrc} alt="" />
        ) : (
          <span className={styles.placeholder} />
        )}
        <span className={styles.scrim} />
        <span className={styles.weave} />
      </div>

      <div className={styles.content}>
        <div className={styles.tags}>
          <span className={styles.kicker}>{kicker}</span>
          <span className={styles.chip}>{post.categoryLabel}</span>
        </div>

        <h2 className={styles.title}>
          <Link href={post.href} className={styles.titleLink}>
            {post.title}
          </Link>
        </h2>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.footer}>
          <AuthorByline
            author={post.author}
            date={post.date}
            readingMinutes={post.readingMinutes}
            size="expanded"
          />
          <Link href={post.href} className={styles.cta}>
            <span>{ctaLabel}</span>
            <span className={styles.arrow} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPostHero
