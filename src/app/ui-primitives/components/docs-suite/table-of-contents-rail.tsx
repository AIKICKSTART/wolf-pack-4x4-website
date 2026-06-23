"use client"

import { useEffect, useMemo, useState, type CSSProperties } from "react"

import type { DocsTocItem } from "./docs-suite-types"

import styles from "./table-of-contents-rail.module.css"

interface TableOfContentsRailProps {
  items: ReadonlyArray<DocsTocItem>
  title?: string
  rootMargin?: string
  showProgress?: boolean
}

export function TableOfContentsRail({
  items,
  title = "On this page",
  rootMargin = "-30% 0px -55% 0px",
  showProgress = true,
}: TableOfContentsRailProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "")

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) {
      return
    }
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin, threshold: [0, 1] },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items, rootMargin])

  const progressPercent = useMemo(() => {
    if (items.length === 0) {
      return 0
    }
    const index = items.findIndex((item) => item.id === activeId)
    if (index < 0) {
      return 0
    }
    return Math.round(((index + 1) / items.length) * 100)
  }, [items, activeId])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (typeof window === "undefined") {
      return
    }
    const target = document.getElementById(id)
    if (!target) {
      return
    }
    event.preventDefault()
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    target.scrollIntoView({
      behavior: media.matches ? "auto" : "smooth",
      block: "start",
    })
    setActiveId(id)
    window.history.replaceState(null, "", `#${id}`)
  }

  const railStyle = {
    "--progress": `${progressPercent}%`,
  } as CSSProperties

  return (
    <nav
      className={styles.rail}
      style={railStyle}
      role="navigation"
      aria-label="Table of contents"
    >
      <div className={styles.head}>
        <span className={styles.title}>{title}</span>
        {showProgress ? (
          <div className={styles.progress} aria-hidden="true">
            <span className={styles.bar}>
              <span className={styles.barFill} />
            </span>
            <span className={styles.percent}>{progressPercent}%</span>
          </div>
        ) : null}
      </div>
      <ol className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId
          const depthClass =
            item.depth === 4
              ? styles.itemDepth4
              : item.depth === 3
                ? styles.itemDepth3
                : styles.itemDepth2
          const classes = [styles.item, depthClass, isActive ? styles.itemActive : ""]
            .filter(Boolean)
            .join(" ")
          return (
            <li key={item.id} className={classes}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => handleClick(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default TableOfContentsRail
