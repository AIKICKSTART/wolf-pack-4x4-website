"use client"

import { useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Minus, TrendingDown, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { MomentumDirection } from "./marketplace-types"
import styles from "./trending-strip.module.css"

export interface TrendingStripItem {
  id: string
  rank: number
  name: string
  author: string
  momentum: MomentumDirection
  momentumLabel: string
  trendCaption?: string
  href?: string
}

export interface TrendingStripProps {
  items: ReadonlyArray<TrendingStripItem>
  title?: string
  ariaLabel?: string
  className?: string
}

const MOMENTUM_TONE: Record<MomentumDirection, string> = {
  up: styles.momentumUp,
  down: styles.momentumDown,
  flat: styles.momentumFlat,
}

const MOMENTUM_ICON: Record<MomentumDirection, LucideIcon> = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
}

export function TrendingStrip({
  items,
  title = "Trending this week",
  ariaLabel,
  className,
}: TrendingStripProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  const scrollBy = useCallback((delta: number) => {
    const node = scrollerRef.current
    if (!node) {
      return
    }
    node.scrollBy({ left: delta, behavior: "smooth" })
  }, [])

  return (
    <section className={classes} aria-label={ariaLabel ?? title}>
      <header className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrl}
            aria-label="Scroll trending list left"
            onClick={() => scrollBy(-260)}
          >
            <ChevronLeft size={16} strokeWidth={2.2} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.ctrl}
            aria-label="Scroll trending list right"
            onClick={() => scrollBy(260)}
          >
            <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div ref={scrollerRef} className={styles.scroller} role="list">
        {items.map((item) => {
          const MomentumIcon = MOMENTUM_ICON[item.momentum]
          const rankLabel = `#${item.rank.toString().padStart(2, "0")}`
          const content = (
            <>
              <div className={styles.itemHead}>
                <span className={styles.rank}>{rankLabel}</span>
                <span
                  className={[styles.momentum, MOMENTUM_TONE[item.momentum]].join(" ")}
                  aria-label={`Momentum ${item.momentumLabel}`}
                >
                  <MomentumIcon size={11} strokeWidth={2.4} aria-hidden="true" />
                  {item.momentumLabel}
                </span>
              </div>
              <h3 className={styles.itemName}>{item.name}</h3>
              <span className={styles.itemAuthor}>{item.author}</span>
              {item.trendCaption && (
                <span className={styles.itemTrend}>{item.trendCaption}</span>
              )}
            </>
          )
          if (item.href) {
            return (
              <a key={item.id} className={styles.item} role="listitem" href={item.href}>
                {content}
              </a>
            )
          }
          return (
            <div key={item.id} className={styles.item} role="listitem">
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TrendingStrip
