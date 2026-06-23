import { ArrowRight, Newspaper } from "lucide-react"

import { NewsMetaRow } from "./news-meta-row"
import { CATEGORY_TONE, type NewsItem, type NewsTone } from "./news-types"

import styles from "./featured-news-hero.module.css"

export interface FeaturedNewsHeroProps {
  item: NewsItem
  /** Secondary stories listed alongside the lead. */
  secondary?: ReadonlyArray<NewsItem>
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

export function FeaturedNewsHero({
  item,
  secondary = [],
  href = "#",
  className,
}: FeaturedNewsHeroProps) {
  const tone = item.tone ?? CATEGORY_TONE[item.category]
  const classes = [styles.hero, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`Featured: ${item.headline}`}>
      <article className={styles.lead}>
        <span className={styles.glow} aria-hidden="true" />

        <div className={styles.leadHead}>
          {item.kicker && <span className={styles.kicker}>{item.kicker}</span>}
          <span className={styles.featuredTag}>
            <Newspaper size={12} strokeWidth={2.2} aria-hidden="true" />
            Featured story
          </span>
        </div>

        <h2 className={styles.headline}>
          <a href={href} className={styles.headlineLink}>
            {item.headline}
          </a>
        </h2>

        <p className={styles.summary}>{item.summary}</p>

        <NewsMetaRow
          source={item.source}
          publishedAt={item.publishedAt}
          readMinutes={item.readMinutes}
          category={item.category}
          className={styles.meta}
        />

        <a href={href} className={styles.cta}>
          Read the full story
          <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
        </a>
      </article>

      {secondary.length > 0 && (
        <aside className={styles.side} aria-label="More stories">
          <span className={styles.sideTitle}>More from the newsroom</span>
          <ul className={styles.sideList}>
            {secondary.map((story) => (
              <li key={story.id} className={styles.sideItem}>
                <a href={href} className={styles.sideLink}>
                  <span className={styles.sideHeadline}>{story.headline}</span>
                  <NewsMetaRow
                    source={story.source}
                    publishedAt={story.publishedAt}
                    category={story.category}
                    size="compact"
                  />
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  )
}

export default FeaturedNewsHero
