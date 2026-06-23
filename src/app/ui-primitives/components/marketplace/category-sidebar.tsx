"use client"

import { PLUGIN_CATEGORY_LABEL, type PluginCategory } from "./marketplace-types"
import styles from "./category-sidebar.module.css"

export interface CategorySidebarItem {
  category: PluginCategory
  count: number
  href?: string
}

export interface CategorySidebarProps {
  title?: string
  items: ReadonlyArray<CategorySidebarItem>
  activeCategory?: PluginCategory
  onSelect?: (category: PluginCategory) => void
  ariaLabel?: string
  className?: string
}

export function CategorySidebar({
  title = "Categories",
  items,
  activeCategory,
  onSelect,
  ariaLabel = "Plugin categories",
  className,
}: CategorySidebarProps) {
  const classes = [styles.sidebar, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label={ariaLabel} role="navigation">
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item) => {
          const isActive = activeCategory === item.category
          const label = PLUGIN_CATEGORY_LABEL[item.category]
          const ariaCurrent = isActive ? ("page" as const) : undefined

          if (onSelect) {
            return (
              <li key={item.category} className={styles.item}>
                <button
                  type="button"
                  className={styles.link}
                  aria-current={ariaCurrent}
                  onClick={() => onSelect(item.category)}
                >
                  <span className={styles.label}>{label}</span>
                  <span className={styles.count}>{item.count.toLocaleString("en-AU")}</span>
                </button>
              </li>
            )
          }

          return (
            <li key={item.category} className={styles.item}>
              <a
                className={styles.link}
                href={item.href ?? `#${item.category}`}
                aria-current={ariaCurrent}
              >
                <span className={styles.label}>{label}</span>
                <span className={styles.count}>{item.count.toLocaleString("en-AU")}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategorySidebar
