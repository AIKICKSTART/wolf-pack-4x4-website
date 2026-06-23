"use client"

import { useState } from "react"
import { LayoutGrid, Rows3 } from "lucide-react"

import { NewsCard } from "./news-card"
import type { NewsItem } from "./news-types"

import styles from "./news-index.module.css"

export type NewsIndexLayout = "grid" | "list"

export interface NewsIndexProps {
  items: ReadonlyArray<NewsItem>
  title?: string
  defaultLayout?: NewsIndexLayout
  className?: string
}

export function NewsIndex({
  items,
  title = "Latest news",
  defaultLayout = "grid",
  className,
}: NewsIndexProps) {
  const [layout, setLayout] = useState<NewsIndexLayout>(defaultLayout)
  const classes = [styles.wrap, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <div className={styles.heading}>
          <span className={styles.kicker}>Newsroom</span>
          <h2 className={styles.title}>{title}</h2>
        </div>

        <div className={styles.toggle} role="group" aria-label="Layout">
          <button
            type="button"
            className={styles.toggleBtn}
            data-active={layout === "grid"}
            aria-pressed={layout === "grid"}
            onClick={() => setLayout("grid")}
          >
            <LayoutGrid size={16} strokeWidth={2} aria-hidden="true" />
            <span>Grid</span>
          </button>
          <button
            type="button"
            className={styles.toggleBtn}
            data-active={layout === "list"}
            aria-pressed={layout === "list"}
            onClick={() => setLayout("list")}
          >
            <Rows3 size={16} strokeWidth={2} aria-hidden="true" />
            <span>List</span>
          </button>
        </div>
      </header>

      <div
        className={[styles.collection, layout === "grid" ? styles.gridLayout : styles.listLayout].join(
          " ",
        )}
      >
        {items.map((item) => (
          <NewsCard key={item.id} item={item} layout={layout} />
        ))}
      </div>
    </section>
  )
}

export default NewsIndex
