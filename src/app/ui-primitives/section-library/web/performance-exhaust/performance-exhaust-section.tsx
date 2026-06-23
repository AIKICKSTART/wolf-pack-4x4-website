"use client"

import {
  FeatureSpotlight,
  StatCounterRow,
  type StatCounterEntry,
} from "../../../components/marketing"
import {
  BoostGaugeIcon,
  DynoCurveIcon,
  TurboIcon,
} from "../../../components/icons"

import styles from "./performance-exhaust-section.module.css"

export interface PerformanceExhaustSectionProps {
  kicker?: string
  heading?: string
  body?: string
  primaryLabel?: string
  primaryHref?: string
  /** Dyno-style stat counters. Defaults to a four-stat row. */
  stats?: ReadonlyArray<StatCounterEntry>
  className?: string
}

const DEFAULT_STATS: ReadonlyArray<StatCounterEntry> = [
  { id: "power", label: "Peak power gain", value: 28, suffix: " kW", tone: "red", body: "Typical V8 cat-back" },
  { id: "torque", label: "Extra torque", value: 41, suffix: " Nm", tone: "amber", body: "Across the mid-range" },
  { id: "egt", label: "Lower EGTs", value: 90, suffix: " °C", tone: "teal", body: "On towing diesels" },
  { id: "builds", label: "Performance builds", value: 1200, tone: "green", body: "And counting" },
]

const SPOTLIGHT_BULLETS = [
  { label: "Mandrel-bent 2.5\" to 4\" — no flow-killing crush bends" },
  { label: "Manta, XForce, Redback & custom stainless options" },
  { label: "Dyno-backed before/after so the numbers are real" },
  { label: "Tuned for the note you want — mellow to track-loud" },
] as const

/**
 * Performance exhaust — a reversed spotlight (visual right) plus a dyno-style
 * animated stat row. Composes `FeatureSpotlight` + `StatCounterRow`.
 * Token-driven, light/dark, responsive, reduced-motion safe.
 */
export function PerformanceExhaustSection({
  kicker = "Performance exhaust",
  heading = "More flow. More grunt. The right note.",
  body = "A full mandrel-bent performance system frees up your engine end to end — every bend keeps the gas moving so you feel the gains and hear the difference. We back it with real dyno numbers, not guesswork.",
  primaryLabel = "Build my system",
  primaryHref = "/book/performance",
  stats = DEFAULT_STATS,
  className,
}: PerformanceExhaustSectionProps) {
  const classes = [styles.host, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <span className={styles.weave} aria-hidden="true" />
      <FeatureSpotlight
        className={styles.spotlight}
        reversed
        kicker={kicker}
        heading={heading}
        body={body}
        bullets={[...SPOTLIGHT_BULLETS]}
        action={{ label: primaryLabel, href: primaryHref }}
        visual={
          <div className={styles.visual} aria-hidden="true">
            <span className={styles.visualSheen} />
            <div className={styles.gaugeRow}>
              <BoostGaugeIcon size={64} tone="amber" title="Boost gauge" />
              <TurboIcon size={64} tone="red" title="Turbo" />
            </div>
            <DynoCurveIcon size={120} tone="teal" title="Dyno curve" />
            <span className={styles.visualCaption}>Dyno-proven gains</span>
          </div>
        }
      />

      <StatCounterRow className={styles.stats} entries={stats} />
    </div>
  )
}

export default PerformanceExhaustSection
