import { ArrowUpRight } from "lucide-react"

import { NewsMetaRow } from "./news-meta-row"
import { CATEGORY_TONE, type NewsItem, type NewsTone } from "./news-types"

import styles from "./news-card.module.css"

export interface NewsCardProps {
  item: NewsItem
  /** "grid" = vertical card, "list" = horizontal row with rail. */
  layout?: "grid" | "list"
  href?: string
  className?: string
}

const TONE_CLASS: Record<NewsTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function NewsCard({ item, layout = "grid", href = "#", className }: NewsCardProps) {
  const tone = item.tone ?? CATEGORY_TONE[item.category]
  const classes = [
    styles.card,
    layout === "list" ? styles.list : styles.grid,
    TONE_CLASS[tone],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes}>
      <span className={styles.rail} aria-hidden="true" />

      <div className={styles.body}>
        <NewsMetaRow
          source={item.source}
          publishedAt={item.publishedAt}
          readMinutes={item.readMinutes}
          category={item.category}
        />

        <h3 className={styles.headline}>
          <a href={href} className={styles.link}>
            <span className={styles.linkText}>{item.headline}</span>
            <ArrowUpRight
              className={styles.linkIcon}
              size={16}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </a>
        </h3>

        <p className={styles.summary}>{item.summary}</p>

        {item.author && (
          <footer className={styles.foot}>
            <span className={styles.byline}>
              <span className={styles.bylineName}>{item.author.name}</span>
              <span className={styles.bylineRole}>{item.author.role}</span>
            </span>
          </footer>
        )}
      </div>
    </article>
  )
}

export default NewsCard
