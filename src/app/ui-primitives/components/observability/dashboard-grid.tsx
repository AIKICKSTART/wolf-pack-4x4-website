import type { ReactNode } from "react"

import { NeuoSurface } from "../surfaces/neuo-surface"
import { FadeIn } from "../motion/fade-in"

import styles from "./dashboard-grid.module.css"

export type DashboardTileSpan = 1 | 2 | 3 | 4 | 6 | 12

export interface DashboardTile {
  id: string
  title: string
  /** Optional sub-title displayed under the tile title. */
  subtitle?: string
  /** Column span out of 12 (default 4). */
  span?: DashboardTileSpan
  /** Row span (default 1). */
  rowSpan?: 1 | 2 | 3
  /** Body content of the tile. */
  content: ReactNode
}

export interface DashboardGridProps {
  tiles: ReadonlyArray<DashboardTile>
  /** Visual-only drag handles to hint a customizable layout. */
  showDragHandles?: boolean
  className?: string
  caption?: string
}

const SPAN_CLASS: Record<DashboardTileSpan, string> = {
  1: styles.span1,
  2: styles.span2,
  3: styles.span3,
  4: styles.span4,
  6: styles.span6,
  12: styles.span12,
}

const ROW_CLASS: Record<1 | 2 | 3, string> = {
  1: styles.row1,
  2: styles.row2,
  3: styles.row3,
}

export function DashboardGrid({
  tiles,
  showDragHandles = true,
  className,
  caption,
}: DashboardGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={caption ?? "Observability dashboard grid"}
    >
      {tiles.map((tile, index) => (
        <div
          key={tile.id}
          className={[
            styles.cell,
            SPAN_CLASS[tile.span ?? 4],
            ROW_CLASS[tile.rowSpan ?? 1],
          ].join(" ")}
        >
          <FadeIn duration={320} delay={index * 40}>
            <NeuoSurface tone="obsidian" className={styles.tile}>
              <header className={styles.tileHead}>
                <div className={styles.tileTitleStack}>
                  <h3 className={styles.tileTitle}>{tile.title}</h3>
                  {tile.subtitle ? (
                    <span className={styles.tileSubtitle}>{tile.subtitle}</span>
                  ) : null}
                </div>
                {showDragHandles ? (
                  <span
                    className={styles.dragHandle}
                    aria-hidden="true"
                    title="Drag to reorder (visual only)"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </span>
                ) : null}
              </header>
              <div className={styles.tileBody}>{tile.content}</div>
            </NeuoSurface>
          </FadeIn>
        </div>
      ))}
    </section>
  )
}

export default DashboardGrid
