"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useId, useState, type ChangeEvent, type KeyboardEvent } from "react"

import styles from "./pagination.module.css"

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showGoTo?: boolean
  className?: string
  ariaLabel?: string
}

type RangeToken = number | "leading-ellipsis" | "trailing-ellipsis"

function buildRange(page: number, pageCount: number, siblingCount: number): RangeToken[] {
  if (pageCount <= 1) {
    return [1]
  }
  const total = pageCount
  const window = siblingCount * 2 + 5
  if (total <= window) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const left = Math.max(2, page - siblingCount)
  const right = Math.min(total - 1, page + siblingCount)
  const showLeftEllipsis = left > 2
  const showRightEllipsis = right < total - 1
  const range: RangeToken[] = [1]

  if (showLeftEllipsis) {
    range.push("leading-ellipsis")
  }
  for (let i = left; i <= right; i += 1) {
    range.push(i)
  }
  if (showRightEllipsis) {
    range.push("trailing-ellipsis")
  }
  range.push(total)
  return range
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  showGoTo = true,
  className,
  ariaLabel = "Pagination",
}: PaginationProps) {
  const [goToValue, setGoToValue] = useState("")
  const goToId = useId()
  if (pageCount <= 0) {
    return null
  }
  const safePage = Math.min(Math.max(1, page), Math.max(1, pageCount))
  const items = buildRange(safePage, pageCount, siblingCount)

  const go = (target: number) => {
    if (target < 1 || target > pageCount || target === safePage) {
      return
    }
    onPageChange(target)
  }

  const handleGoToKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      const parsed = Number.parseInt(goToValue, 10)
      if (Number.isFinite(parsed)) {
        go(parsed)
      }
      setGoToValue("")
    }
  }

  const handleGoToChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "" || /^\d+$/.test(value)) {
      setGoToValue(value)
    }
  }

  const classes = [styles.pagination, className].filter(Boolean).join(" ")

  return (
    <nav className={classes} aria-label={ariaLabel}>
      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => go(1)}
        disabled={safePage === 1}
        aria-label="First page"
      >
        <ChevronsLeft size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => go(safePage - 1)}
        disabled={safePage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>
      <ol className={styles.list}>
        {items.map((token, index) => {
          if (token === "leading-ellipsis" || token === "trailing-ellipsis") {
            return (
              <li key={`${token}-${index}`} className={styles.ellipsis} aria-hidden="true">
                …
              </li>
            )
          }
          const isActive = token === safePage
          return (
            <li key={token}>
              <button
                type="button"
                className={`${styles.pageBtn} ${isActive ? styles.pageBtnActive : ""}`}
                onClick={() => go(token)}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Page ${token}`}
              >
                {token}
              </button>
            </li>
          )
        })}
      </ol>
      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => go(safePage + 1)}
        disabled={safePage === pageCount}
        aria-label="Next page"
      >
        <ChevronRight size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>
      <button
        type="button"
        className={styles.iconBtn}
        onClick={() => go(pageCount)}
        disabled={safePage === pageCount}
        aria-label="Last page"
      >
        <ChevronsRight size={14} strokeWidth={2.2} aria-hidden="true" />
      </button>
      {showGoTo && (
        <div className={styles.goTo}>
          <label htmlFor={goToId} className={styles.goToLabel}>
            Go to
          </label>
          <input
            id={goToId}
            className={styles.goToInput}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={goToValue}
            placeholder={String(safePage)}
            onChange={handleGoToChange}
            onKeyDown={handleGoToKey}
            aria-label={`Go to page (1 to ${pageCount})`}
          />
        </div>
      )}
    </nav>
  )
}

export default Pagination
