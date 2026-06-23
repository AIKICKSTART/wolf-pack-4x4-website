"use client"

import Link from "next/link"
import type { ReactNode } from "react"

import styles from "./help-center-landing.module.css"

export interface HelpCategory {
  icon: ReactNode
  title: string
  description: string
  articleCount: number
  href: string
}

export interface HelpPopularArticle {
  title: string
  href: string
  readTime: string
}

interface HelpCenterLandingProps {
  searchPlaceholder?: string
  categories: ReadonlyArray<HelpCategory>
  popular: ReadonlyArray<HelpPopularArticle>
  contactHref: string
  onSearch?: (query: string) => void
}

export function HelpCenterLanding({
  searchPlaceholder = "Search the workshop knowledge base…",
  categories,
  popular,
  contactHref,
  onSearch,
}: HelpCenterLandingProps) {
  return (
    <article className={styles.landing} aria-labelledby="help-center-heading">
      <header className={styles.hero}>
        <span className={styles.kicker}>Help center</span>
        <h2 id="help-center-heading" className={styles.heroTitle}>
          How can we help?
        </h2>
        <p className={styles.heroBody}>
          Workshop manuals, quoting playbooks, hardware setup, and customer comms — searchable.
        </p>
        <form
          role="search"
          className={styles.searchForm}
          onSubmit={(event) => {
            event.preventDefault()
            const value = new FormData(event.currentTarget).get("q")
            if (typeof value === "string" && onSearch) {
              onSearch(value)
            }
          }}
        >
          <input
            type="search"
            name="q"
            className={styles.searchInput}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </header>

      <section className={styles.categories} aria-label="Topic categories">
        {categories.map((category) => (
          <Link key={category.href} href={category.href} className={styles.category}>
            <span className={styles.categoryIcon} aria-hidden="true">
              {category.icon}
            </span>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <p className={styles.categoryBody}>{category.description}</p>
            <span className={styles.categoryCount}>{category.articleCount} articles</span>
          </Link>
        ))}
      </section>

      <section className={styles.popularSection} aria-labelledby="help-popular-heading">
        <header className={styles.popularHead}>
          <span className={styles.kicker}>Popular this week</span>
          <h3 id="help-popular-heading" className={styles.popularTitle}>
            Most-read articles
          </h3>
        </header>
        <ol className={styles.popularList}>
          {popular.map((article, index) => (
            <li key={article.href} className={styles.popularItem}>
              <span className={styles.popularIndex}>{String(index + 1).padStart(2, "0")}</span>
              <Link href={article.href} className={styles.popularLink}>
                {article.title}
              </Link>
              <span className={styles.popularReadTime}>{article.readTime}</span>
            </li>
          ))}
        </ol>
      </section>

      <aside className={styles.contact} aria-label="Contact support">
        <div>
          <span className={styles.kicker}>Still stuck?</span>
          <h3 className={styles.contactTitle}>Talk to a real person at Oak Flats</h3>
          <p className={styles.contactBody}>
            Workshop floor staff respond within one business hour on weekdays.
          </p>
        </div>
        <Link className={styles.contactBtn} href={contactHref}>
          Contact support
        </Link>
      </aside>
    </article>
  )
}

export default HelpCenterLanding
