"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import type {
  DocsArticleSummary,
  DocsCategoryFilter,
  DocsDifficulty,
} from "./docs-suite-types"

import styles from "./article-browser-grid.module.css"

interface ArticleBrowserGridProps {
  articles: ReadonlyArray<DocsArticleSummary>
  categories: ReadonlyArray<DocsCategoryFilter>
  defaultCategoryId?: string | null
  ariaLabel?: string
}

const DIFFICULTY_LABEL: Record<DocsDifficulty, string> = {
  starter: "Starter",
  intermediate: "Intermediate",
  advanced: "Advanced",
}

const DIFFICULTY_CLASS: Record<DocsDifficulty, string> = {
  starter: styles.difficultyStarter,
  intermediate: styles.difficultyIntermediate,
  advanced: styles.difficultyAdvanced,
}

export function ArticleBrowserGrid({
  articles,
  categories,
  defaultCategoryId = null,
  ariaLabel = "Docs article browser",
}: ArticleBrowserGridProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultCategoryId)

  const filtered = useMemo(() => {
    if (activeId === null) {
      return articles
    }
    return articles.filter((a) => a.category === activeId)
  }, [articles, activeId])

  const totalCount = articles.length

  return (
    <section className={styles.wrapper} aria-label={ariaLabel}>
      <div
        className={styles.filters}
        role="toolbar"
        aria-label="Filter articles by category"
      >
        <button
          type="button"
          className={[styles.filter, activeId === null ? styles.filterActive : ""]
            .filter(Boolean)
            .join(" ")}
          aria-pressed={activeId === null}
          onClick={() => setActiveId(null)}
        >
          All <span className={styles.filterCount}>{totalCount}</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={[
              styles.filter,
              activeId === category.id ? styles.filterActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-pressed={activeId === category.id}
            onClick={() => setActiveId(category.id)}
          >
            {category.label}
            <span className={styles.filterCount}>{category.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty} role="status">
          No articles in this category yet
        </div>
      ) : (
        <div className={styles.grid} role="list">
          {filtered.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className={styles.card}
              role="listitem"
              aria-label={`${article.title} — ${article.surfaceLabel}, ${article.readMinutes} minute read, ${DIFFICULTY_LABEL[article.difficulty]}`}
            >
              <div className={styles.head}>
                <span className={styles.surface}>{article.surfaceLabel}</span>
                <span
                  className={[styles.difficulty, DIFFICULTY_CLASS[article.difficulty]]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {DIFFICULTY_LABEL[article.difficulty]}
                </span>
              </div>
              <h3 className={styles.title}>{article.title}</h3>
              <p className={styles.excerpt}>{article.excerpt}</p>
              <div className={styles.foot}>
                <span className={styles.footMeta} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {article.readMinutes} min read
                </span>
                <time dateTime={article.updatedIso}>{article.updatedAt}</time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default ArticleBrowserGrid
