import type { CSSProperties } from "react"

import styles from "../ui-primitives.module.css"

type TelemetryTone = "red" | "amber" | "teal" | "green"

interface TelemetryStat {
  label: string
  value: string
  delta?: string
  tone?: TelemetryTone
}

const COLOR_TONE: Record<TelemetryTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

const stats: TelemetryStat[] = [
  { label: "Coverage", value: "94.2", delta: "+1.8%", tone: "green" },
  { label: "Variants", value: "236", delta: "+12 new", tone: "amber" },
  { label: "A11y", value: "AA·AAA", delta: "98.7%", tone: "teal" },
  { label: "Bundle", value: "118kb", delta: "-4.2kb", tone: "green" },
  { label: "Tokens", value: "412", delta: "+9", tone: "amber" },
  { label: "Drift", value: "0.4%", delta: "stable", tone: "teal" },
]

export function TelemetryStripe() {
  return (
    <div className={styles.telemetryStripe} aria-label="Live telemetry summary">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={styles.telemetryStripeCell}
          style={{ "--tile-tone": COLOR_TONE[stat.tone ?? "amber"] } as CSSProperties}
        >
          <span className={styles.kicker}>{stat.label}</span>
          <strong>{stat.value}</strong>
          {stat.delta && <small>{stat.delta}</small>}
        </div>
      ))}
    </div>
  )
}
