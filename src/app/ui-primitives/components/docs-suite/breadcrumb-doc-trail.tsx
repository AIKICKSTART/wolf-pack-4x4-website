"use client"

import Link from "next/link"
import { useEffect, useId, useRef, useState, type ReactNode } from "react"

import type {
  DocsBreadcrumbCrumb,
  DocsPageTreeNode,
} from "./docs-suite-types"

import styles from "./breadcrumb-doc-trail.module.css"

interface BreadcrumbDocTrailProps {
  items: ReadonlyArray<DocsBreadcrumbCrumb>
  pageTree?: ReadonlyArray<DocsPageTreeNode>
  ariaLabel?: string
  separator?: ReactNode
}

export function BreadcrumbDocTrail({
  items,
  pageTree,
  ariaLabel = "Documentation breadcrumb",
  separator = "/",
}: BreadcrumbDocTrailProps) {
  const [open, setOpen] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) {
      return
    }
    const handleClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (wrapRef.current && target && !wrapRef.current.contains(target)) {
        setOpen(false)
      }
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("touchstart", handleClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open])

  return (
    <nav className={styles.trail} aria-label={ariaLabel} role="navigation">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const showTreeAfter = isLast && pageTree && pageTree.length > 0
          return (
            <li key={`${item.label}-${index}`} className={styles.list}>
              {isLast || !item.href ? (
                <span
                  className={[styles.crumb, isLast ? styles.crumbCurrent : ""]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={styles.crumb}>
                  {item.label}
                </Link>
              )}
              {!isLast ? (
                <span className={styles.separator} aria-hidden="true">
                  {separator}
                </span>
              ) : null}
              {showTreeAfter ? (
                <span className={styles.treeWrap} ref={wrapRef}>
                  <button
                    ref={btnRef}
                    type="button"
                    className={styles.treeBtn}
                    aria-haspopup="menu"
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label="Open page tree"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    Tree
                    <svg
                      className={[styles.chev, open ? styles.chevOpen : ""]
                        .filter(Boolean)
                        .join(" ")}
                      viewBox="0 0 24 24"
                      width="10"
                      height="10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {open ? (
                    <ul id={panelId} className={styles.treePanel} role="menu">
                      {pageTree.map((node) => (
                        <li key={node.href} role="none">
                          <Link
                            href={node.href}
                            role="menuitem"
                            className={[styles.treeLink, node.isCurrent ? styles.treeLinkActive : ""]
                              .filter(Boolean)
                              .join(" ")}
                            aria-current={node.isCurrent ? "page" : undefined}
                            onClick={() => setOpen(false)}
                          >
                            <span className={styles.treeMark} aria-hidden="true" />
                            <span>{node.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default BreadcrumbDocTrail
