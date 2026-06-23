import Link from "next/link"

import type { DocsRelatedArticle } from "./docs-suite-types"

import styles from "./related-articles-grid.module.css"

interface RelatedArticlesGridProps {
  articles: ReadonlyArray<DocsRelatedArticle>
  title?: string
  ariaLabel?: string
}

export function RelatedArticlesGrid({
  articles,
  title = "Related articles",
  ariaLabel = "Related articles",
}: RelatedArticlesGridProps) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section className={styles.section} aria-label={ariaLabel}>
      <header className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.count}>{articles.length} picks</span>
      </header>
      <div className={styles.grid} role="list">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={article.href}
            className={styles.card}
            role="listitem"
            aria-label={`${article.title} — ${article.surfaceLabel}, ${article.readMinutes} minute read`}
          >
            <span className={styles.surface}>{article.surfaceLabel}</span>
            <h4 className={styles.heading}>{article.title}</h4>
            <p className={styles.excerpt}>{article.excerpt}</p>
            <span className={styles.foot}>
              <span>{article.readMinutes} min read</span>
              <span className={styles.arrow}>
                Read
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedArticlesGrid
