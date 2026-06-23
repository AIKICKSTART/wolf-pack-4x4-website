"use client"

import { useEffect, useState } from "react"

import styles from "./table-of-contents.module.css"

export interface TocItem {
  id: string
  label: string
  depth?: 2 | 3
}

interface TableOfContentsProps {
  items: ReadonlyArray<TocItem>
  title?: string
  rootMargin?: string
}

export function TableOfContents({
  items,
  title = "On this page",
  rootMargin = "-30% 0px -55% 0px",
}: TableOfContentsProps) {
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

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <span className={styles.title}>{title}</span>
      <ol className={styles.list}>
        {items.map((item) => {
          const isActive = item.id === activeId
          const classes = [
            styles.item,
            item.depth === 3 ? styles.depthThree : styles.depthTwo,
            isActive ? styles.active : "",
          ]
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

export default TableOfContents
