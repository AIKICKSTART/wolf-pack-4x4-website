"use client"

import { ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useId, useState, type ReactNode } from "react"

import styles from "./breadcrumb.module.css"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: ReactNode
  maxItems?: number
  homeIcon?: ReactNode
  className?: string
  ariaLabel?: string
}

export function Breadcrumb({
  items,
  separator,
  maxItems = 6,
  homeIcon,
  className,
  ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  const [expanded, setExpanded] = useState(false)
  const dialogId = useId()
  const safeMax = Math.max(3, maxItems)
  const shouldCollapse = items.length > safeMax && !expanded
  const visibleItems = shouldCollapse
    ? [items[0], ...items.slice(items.length - (safeMax - 1))]
    : items

  const classes = [styles.nav, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <ol className={styles.list}>
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1
          const showEllipsis = shouldCollapse && index === 1

          if (showEllipsis) {
            return (
              <li key="ellipsis" className={styles.item}>
                <button
                  type="button"
                  className={styles.ellipsis}
                  aria-label="Show hidden breadcrumb segments"
                  aria-expanded={false}
                  aria-controls={dialogId}
                  onClick={() => setExpanded(true)}
                >
                  <MoreHorizontal size={14} strokeWidth={2.2} aria-hidden="true" />
                </button>
                <span className={styles.separator} aria-hidden="true">
                  {separator ?? <ChevronRight size={13} strokeWidth={2.2} />}
                </span>
              </li>
            )
          }

          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {!isLast && item.href ? (
                <Link href={item.href} className={styles.link}>
                  {index === 0 && homeIcon && (
                    <span className={styles.homeIcon} aria-hidden="true">
                      {homeIcon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={isLast ? styles.current : styles.link}
                  aria-current={isLast ? "page" : undefined}
                >
                  {index === 0 && homeIcon && (
                    <span className={styles.homeIcon} aria-hidden="true">
                      {homeIcon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  {separator ?? <ChevronRight size={13} strokeWidth={2.2} />}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
