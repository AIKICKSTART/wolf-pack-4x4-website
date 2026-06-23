"use client"

import { useMemo, useState } from "react"

import { BlogCard } from "./blog-card"
import { CategoryFilterBar } from "./category-filter-bar"
import type { BlogCategory, BlogPostSummary } from "./types"
import styles from "./blog-index-grid.module.css"

export interface BlogIndexGridProps {
  posts: ReadonlyArray<BlogPostSummary>
  categories: ReadonlyArray<BlogCategory>
  /** Eyebrow above the heading. */
  kicker?: string
  /** Section heading. */
  heading?: string
  /** Show the category filter bar. */
  filterable?: boolean
  className?: string
}

export function BlogIndexGrid({
  posts,
  categories,
  kicker = "From the workshop",
  heading = "Latest from the bench",
  filterable = true,
  className,
}: BlogIndexGridProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const visible = useMemo(() => {
    if (activeId === null) {
      return posts
    }
    return posts.filter((post) => post.categoryId === activeId)
  }, [posts, activeId])

  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <header className={styles.header}>
        <div className={styles.intro}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          <h2 className={styles.heading}>{heading}</h2>
        </div>
        {filterable ? (
          <CategoryFilterBar
            categories={categories}
            activeId={activeId}
            onChange={setActiveId}
            className={styles.filter}
          />
        ) : null}
      </header>

      {visible.length > 0 ? (
        <div className={styles.grid} aria-live="polite">
          {visible.map((post) => (
            <BlogCard key={post.id} post={post} className={styles.card} />
          ))}
        </div>
      ) : (
        <p className={styles.empty} role="status">
          Nothing filed under that section yet — check back after the next teardown.
        </p>
      )}
    </section>
  )
}

export default BlogIndexGrid
