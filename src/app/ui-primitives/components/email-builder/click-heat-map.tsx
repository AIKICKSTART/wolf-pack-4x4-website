import { Chip } from "../primitives/chip"
import { HeatmapCalendar } from "../charts/heatmap-calendar"
import type { HeatCell, HeatTone } from "../charts/heatmap-calendar"

import type { ClickHeatSpot } from "./email-builder-types"
import styles from "./click-heat-map.module.css"

interface ClickHeatMapProps {
  /** Per-link hotspots positioned over the preview canvas. */
  spots: ReadonlyArray<ClickHeatSpot>
  /** Daily click pattern over the campaign window for the calendar overlay. */
  dailyCells: ReadonlyArray<HeatCell>
  /** Calendar tone — defaults to "red" for hot click days. */
  calendarTone?: HeatTone
  /** Subject line / template name shown at the top of the overlay. */
  templateLabel: string
  className?: string
}

function tonesForCtr(
  ctr: number,
): { tone: "red" | "amber" | "teal" | "green"; label: string } {
  if (ctr >= 18) return { tone: "red", label: "Hot" }
  if (ctr >= 8) return { tone: "amber", label: "Warm" }
  if (ctr >= 3) return { tone: "teal", label: "Cool" }
  return { tone: "green", label: "Cold" }
}

export function ClickHeatMap({
  spots,
  dailyCells,
  calendarTone = "red",
  templateLabel,
  className,
}: ClickHeatMapProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Click heatmap">
      <header className={styles.head}>
        <span className={styles.kicker}>Click heatmap</span>
        <h3 className={styles.title}>{templateLabel}</h3>
      </header>

      <div className={styles.layout}>
        <div className={styles.canvas} role="img" aria-label="Click hot spots on email preview">
          <div className={styles.canvasFrame} aria-hidden="true">
            <span className={styles.canvasLine} />
            <span className={styles.canvasHero} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasButton} />
            <span className={styles.canvasLine} />
            <span className={styles.canvasFooter} />
          </div>
          {spots.map((spot) => {
            const tone = tonesForCtr(spot.ctr)
            return (
              <span
                key={spot.id}
                className={styles.spot}
                style={{
                  top: `${spot.position.top}%`,
                  left: `${spot.position.left}%`,
                  ["--spot-size" as string]:
                    `${Math.min(80, 36 + spot.ctr * 1.4)}px`,
                }}
                data-tone={tone.tone}
                aria-label={`${spot.label} — ${spot.ctr}% CTR`}
              >
                <span className={styles.spotPulse} aria-hidden="true" />
                <span className={styles.spotPct}>{spot.ctr}%</span>
              </span>
            )
          })}
        </div>

        <div className={styles.aside}>
          <span className={styles.asideLabel}>Daily clicks</span>
          <HeatmapCalendar
            cells={[...dailyCells]}
            tone={calendarTone}
            ariaLabel="Daily click density over the last 12 weeks"
            weeks={12}
          />

          <ul className={styles.spotList}>
            {spots.map((spot) => {
              const tone = tonesForCtr(spot.ctr)
              return (
                <li key={`row-${spot.id}`} className={styles.spotRow}>
                  <span className={styles.spotName}>{spot.label}</span>
                  <Chip
                    label={`${tone.label} · ${spot.ctr}%`}
                    tone={tone.tone}
                    selected
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
