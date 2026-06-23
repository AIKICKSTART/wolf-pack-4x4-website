import type { ReactNode } from "react"

import { AuthorByline } from "./author-byline"
import { ShareRow } from "./share-row"
import type { BlogAccent, BlogAuthor, BlogBodyBlock, ShareTarget } from "./types"
import styles from "./blog-post-layout.module.css"

const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
}

export interface BlogPostLayoutProps {
  /** Category label for the eyebrow chip. */
  categoryLabel: string
  /** Accent for the chip + rules. */
  accent?: BlogAccent
  /** Headline. */
  title: string
  /** ISO date string. */
  date: string
  /** Whole-minute reading time. */
  readingMinutes: number
  /** Author. */
  author: BlogAuthor
  /** Hero image src. */
  imageSrc?: string
  /** Hero image alt. */
  imageAlt?: string
  /** Rich body blocks (lede, headings, paragraphs, quotes, media, lists). */
  body: ReadonlyArray<BlogBodyBlock>
  /** Tag labels. */
  tags?: ReadonlyArray<string>
  /** Share targets. */
  shareTargets?: ReadonlyArray<ShareTarget>
  /** Canonical URL for copy-link share. */
  shareUrl?: string
  /** Optional sidebar slot (e.g. TableOfContents). */
  aside?: ReactNode
  /** Heading level for embedded previews inside a route that already owns the h1. */
  headingLevel?: 1 | 2
  className?: string
}

const ACCENT_CLASS: Record<BlogAccent, string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

function formatDate(iso: string): string {
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) {
    return iso
  }
  return parsed.toLocaleDateString("en-AU", DATE_FORMAT)
}

function renderBlock(block: BlogBodyBlock, index: number): ReactNode {
  switch (block.kind) {
    case "lede":
      return (
        <p key={index} className={styles.lede}>
          {block.text}
        </p>
      )
    case "heading":
      return (
        <h2 key={index} id={block.id} className={styles.bodyHeading}>
          {block.text}
        </h2>
      )
    case "paragraph":
      return (
        <p key={index} className={styles.paragraph}>
          {block.text}
        </p>
      )
    case "pullQuote":
      return (
        <figure key={index} className={styles.pullQuote}>
          <blockquote className={styles.quoteText}>{block.text}</blockquote>
          {block.attribution ? (
            <figcaption className={styles.quoteAttribution}>— {block.attribution}</figcaption>
          ) : null}
        </figure>
      )
    case "media":
      return (
        <figure key={index} className={styles.media}>
          {block.src.trim().length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.mediaImage} src={block.src} alt={block.alt} loading="lazy" />
          ) : (
            <span className={styles.mediaPlaceholder} role="img" aria-label={block.alt}>
              <span>Media pending</span>
            </span>
          )}
          {block.caption ? (
            <figcaption className={styles.caption}>{block.caption}</figcaption>
          ) : null}
        </figure>
      )
    case "list": {
      const items = block.items.map((item, itemIndex) => (
        <li key={itemIndex} className={styles.listItem}>
          {item}
        </li>
      ))
      return block.ordered ? (
        <ol key={index} className={`${styles.list} ${styles.listOrdered}`}>
          {items}
        </ol>
      ) : (
        <ul key={index} className={styles.list}>
          {items}
        </ul>
      )
    }
    default:
      return null
  }
}

export function BlogPostLayout({
  categoryLabel,
  accent = "red",
  title,
  date,
  readingMinutes,
  author,
  imageSrc,
  imageAlt,
  body,
  tags,
  shareTargets,
  shareUrl,
  aside,
  headingLevel = 1,
  className,
}: BlogPostLayoutProps) {
  const classes = [styles.article, ACCENT_CLASS[accent], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes}>
      <header className={styles.header}>
        <div className={styles.headMeta}>
          <span className={styles.chip}>{categoryLabel}</span>
          <span className={styles.headDots}>
            <time className={styles.headDate} dateTime={date}>
              {formatDate(date)}
            </time>
            <span className={styles.dot} aria-hidden="true" />
            <span>{readingMinutes} min read</span>
          </span>
        </div>
        {headingLevel === 1 ? (
          <h1 className={styles.title}>{title}</h1>
        ) : (
          <h2 className={styles.title}>{title}</h2>
        )}
        <AuthorByline author={author} size="expanded" className={styles.byline} />
      </header>

      {imageSrc ? (
        <figure className={styles.hero}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.heroImage} src={imageSrc} alt={imageAlt ?? ""} />
          <span className={styles.heroSheen} aria-hidden="true" />
        </figure>
      ) : null}

      <div className={styles.grid}>
        <div className={styles.body}>{body.map(renderBlock)}</div>

        {aside ? <aside className={styles.aside}>{aside}</aside> : null}
      </div>

      <footer className={styles.footer}>
        {tags && tags.length > 0 ? (
          <ul className={styles.tags} aria-label="Tags">
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                #{tag}
              </li>
            ))}
          </ul>
        ) : null}

        {shareTargets && shareTargets.length > 0 ? (
          <ShareRow targets={shareTargets} url={shareUrl} className={styles.share} />
        ) : null}
      </footer>
    </article>
  )
}

export default BlogPostLayout
