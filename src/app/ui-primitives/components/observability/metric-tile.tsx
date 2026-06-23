import { GlassSurface } from "../surfaces/glass-surface"
import { Sparkline } from "../charts/sparkline"
import type { SparklineTone } from "../charts/sparkline"
import { FadeIn } from "../motion/fade-in"
import type { StatusTone } from "../status-page/status-types"

import styles from "./metric-tile.module.css"

export type MetricTileTone = "red" | "amber" | "teal" | "green" | "neutral"

export type MetricDeltaDirection = "up" | "down" | "flat"

export interface MetricTileDelta {
  /** Pre-formatted delta string, e.g. "+12.4%" or "-3 errs". */
  label: string
  direction: MetricDeltaDirection
  /** Optional comparison window note, e.g. "vs last hour". */
  vs?: string
}

export interface MetricTileProps {
  label: string
  value: string
  unit?: string
  delta?: MetricTileDelta
  sparkline: ReadonlyArray<number>
  tone?: MetricTileTone
  /** Optional fine-print, e.g. "p99 over 5m". */
  caption?: string
  /** Service the metric belongs to, e.g. "quotes-api". */
  service?: string
  className?: string
}

const TONE_CLASS: Record<MetricTileTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

const DELTA_CLASS: Record<MetricDeltaDirection, string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  flat: styles.deltaFlat,
}

const DELTA_GLYPH: Record<MetricDeltaDirection, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
}

const TONE_SPARK: Record<MetricTileTone, SparklineTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "teal",
}

const TONE_STATUS: Record<MetricTileTone, StatusTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
  neutral: "neutral",
}

export function MetricTile({
  label,
  value,
  unit,
  delta,
  sparkline,
  tone = "teal",
  caption,
  service,
  className,
}: MetricTileProps) {
  const classes = [styles.tile, TONE_CLASS[tone], className].filter(Boolean).join(" ")
  const statusTone: StatusTone = TONE_STATUS[tone]
  const ariaLabel = `${label} ${value}${unit ? unit : ""}${delta ? `, ${delta.label}` : ""}`

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <FadeIn duration={420}>
        <article aria-label={ariaLabel} data-tone={statusTone}>
          <header className={styles.head}>
            <span className={styles.label}>{label}</span>
            {service ? <span className={styles.service}>{service}</span> : null}
          </header>
          <div className={styles.valueRow}>
            <strong className={styles.value}>
              {value}
              {unit ? <em className={styles.unit}>{unit}</em> : null}
            </strong>
            {delta ? (
              <span className={[styles.delta, DELTA_CLASS[delta.direction]].join(" ")}>
                <span aria-hidden="true">{DELTA_GLYPH[delta.direction]}</span>
                {delta.label}
                {delta.vs ? <span className={styles.deltaVs}>{delta.vs}</span> : null}
              </span>
            ) : null}
          </div>
          <div className={styles.spark}>
            <Sparkline
              points={[...sparkline]}
              tone={TONE_SPARK[tone]}
              width={220}
              height={48}
              ariaLabel={`${label} trend sparkline`}
            />
          </div>
          {caption ? <footer className={styles.foot}>{caption}</footer> : null}
        </article>
      </FadeIn>
    </GlassSurface>
  )
}

export default MetricTile
