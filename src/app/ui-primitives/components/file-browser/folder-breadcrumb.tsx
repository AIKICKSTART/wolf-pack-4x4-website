"use client"

import { ChevronRight, Home, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Fragment, useEffect, useRef, useState } from "react"

import { Popover } from "../primitives/popover"

import type { FolderSegment } from "./file-types"

import styles from "./folder-breadcrumb.module.css"

interface FolderBreadcrumbProps {
  segments: ReadonlyArray<FolderSegment>
  /** Always-visible leading segments before the overflow collapse. */
  leadingVisible?: number
  /** Always-visible trailing segments (current folder + neighbours). */
  trailingVisible?: number
  /** Width below which overflow collapses kick in. */
  collapseThreshold?: number
  className?: string
}

export function FolderBreadcrumb({
  segments,
  leadingVisible = 1,
  trailingVisible = 2,
  collapseThreshold = 480,
  className,
}: FolderBreadcrumbProps) {
  const containerRef = useRef<HTMLElement | null>(null)
  const [shouldCollapse, setShouldCollapse] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setShouldCollapse(entry.contentRect.width < collapseThreshold)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [collapseThreshold])

  const total = segments.length
  const collapseActive =
    shouldCollapse && total > leadingVisible + trailingVisible + 1

  const leading = collapseActive
    ? segments.slice(0, leadingVisible)
    : segments
  const trailing = collapseActive
    ? segments.slice(total - trailingVisible)
    : []
  const hidden = collapseActive
    ? segments.slice(leadingVisible, total - trailingVisible)
    : []

  const renderItem = (seg: FolderSegment, isLast: boolean, idx: number) => (
    <Fragment key={seg.id}>
      <li
        className={[styles.item, isLast ? styles.itemCurrent : ""]
          .filter(Boolean)
          .join(" ")}
        {...(isLast ? { "aria-current": "page" as const } : {})}
      >
        {idx === 0 ? (
          <span className={styles.home} aria-hidden="true">
            <Home size={12} strokeWidth={2.2} />
          </span>
        ) : null}
        {seg.href && !isLast ? (
          <Link href={seg.href} className={styles.link}>
            {seg.name}
          </Link>
        ) : (
          <span className={styles.label}>{seg.name}</span>
        )}
      </li>
      {!isLast ? (
        <li className={styles.sep} aria-hidden="true">
          <ChevronRight size={12} strokeWidth={2.2} />
        </li>
      ) : null}
    </Fragment>
  )

  return (
    <nav
      ref={containerRef}
      aria-label="Folder breadcrumb"
      className={[styles.nav, className].filter(Boolean).join(" ")}
    >
      <ol className={styles.list}>
        {leading.map((seg, idx) =>
          renderItem(
            seg,
            !collapseActive && idx === total - 1,
            idx,
          ),
        )}

        {collapseActive ? (
          <>
            <li className={styles.sep} aria-hidden="true">
              <ChevronRight size={12} strokeWidth={2.2} />
            </li>
            <li className={styles.item}>
              <Popover
                placement="bottom"
                align="start"
                trigger={
                  <button
                    type="button"
                    className={styles.overflowBtn}
                    aria-label={`Show ${hidden.length} hidden folders`}
                  >
                    <MoreHorizontal size={14} strokeWidth={2.4} />
                  </button>
                }
                contentClassName={styles.overflowMenu}
              >
                <ul className={styles.overflowList}>
                  {hidden.map((seg) => (
                    <li key={seg.id}>
                      {seg.href ? (
                        <Link href={seg.href} className={styles.overflowLink}>
                          {seg.name}
                        </Link>
                      ) : (
                        <span className={styles.overflowLink}>{seg.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </Popover>
            </li>
            <li className={styles.sep} aria-hidden="true">
              <ChevronRight size={12} strokeWidth={2.2} />
            </li>
            {trailing.map((seg, idx) =>
              renderItem(seg, idx === trailing.length - 1, leadingVisible + idx + 1),
            )}
          </>
        ) : null}
      </ol>
    </nav>
  )
}

export default FolderBreadcrumb
