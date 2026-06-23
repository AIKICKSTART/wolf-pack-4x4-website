import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"
import { Sparkline } from "../charts/sparkline"
import {
  TONE_VAR,
  TOUR_STATUS_LABEL,
  TOUR_STATUS_TONE,
  formatPercent,
  formatRelative,
  type TourStatus,
  type TourTone,
} from "./tour-types"
import styles from "./tour-library-grid.module.css"

export interface TourLibraryEntry {
  id: string
  name: string
  description: string
  status: TourStatus
  /** ISO timestamp of last run. */
  lastRunIso: string
  /** Engagement rate 0..100. */
  engagementRate: number
  /** Optional tone override. */
  tone?: TourTone
  /** 6-12 point sparkline of recent completion %. */
  recentTrend?: number[]
  /** Optional step count. */
  steps?: number
}

interface TourLibraryGridProps {
  tours: ReadonlyArray<TourLibraryEntry>
  /** Optional "now" reference for relative formatting. */
  nowIso?: string
  className?: string
}

export function TourLibraryGrid({
  tours,
  nowIso,
  className,
}: TourLibraryGridProps) {
  const classes = [styles.grid, className].filter(Boolean).join(" ")

  return (
    <ul className={classes} aria-label="Tour library">
      {tours.map((tour) => {
        const tone: TourTone = tour.tone ?? TOUR_STATUS_TONE[tour.status]
        const statusLabel = TOUR_STATUS_LABEL[tour.status]
        const engagementTone: "red" | "amber" | "teal" | "green" =
          tour.engagementRate >= 60
            ? "green"
            : tour.engagementRate >= 30
              ? "amber"
              : "red"

        return (
          <li
            key={tour.id}
            className={styles.card}
            style={{ "--lib-tone": TONE_VAR[tone] } as CSSProperties}
          >
            <header className={styles.cardHead}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.status}>{statusLabel}</span>
              {typeof tour.steps === "number" ? (
                <span className={styles.steps}>{tour.steps} steps</span>
              ) : null}
            </header>

            <h3 className={styles.name}>{tour.name}</h3>
            <p className={styles.description}>{tour.description}</p>

            <div className={styles.metrics}>
              <Chip
                label={`${formatPercent(tour.engagementRate)} engagement`}
                tone={engagementTone}
              />
              <span className={styles.lastRun}>
                Last run · {formatRelative(tour.lastRunIso, nowIso)}
              </span>
            </div>

            {tour.recentTrend && tour.recentTrend.length > 1 ? (
              <div className={styles.spark}>
                <Sparkline
                  points={tour.recentTrend}
                  tone={engagementTone}
                  area
                  ariaLabel={`Recent completion trend for ${tour.name}`}
                  height={36}
                  width={200}
                />
              </div>
            ) : null}

            <span className={styles.toneStripe} aria-hidden="true" />
          </li>
        )
      })}
    </ul>
  )
}

export default TourLibraryGrid
