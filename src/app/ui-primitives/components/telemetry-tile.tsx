import type { CSSProperties } from "react"
import type { Activity } from "lucide-react"

import styles from "../ui-primitives.module.css"

export type TelemetryTone = "red" | "amber" | "teal" | "green"

const COLOR_TONE: Record<TelemetryTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

interface TelemetryTileProps {
  icon: typeof Activity
  label: string
  value: string
  delta?: string
  tone?: TelemetryTone
}

export function TelemetryTile({
  icon: Icon,
  label,
  value,
  delta,
  tone = "amber",
}: TelemetryTileProps) {
  return (
    <article
      className={styles.telemetryTile}
      style={{ "--tile-tone": COLOR_TONE[tone] } as CSSProperties}
    >
      <header>
        <Icon aria-hidden="true" />
        <span className={styles.kicker}>{label}</span>
      </header>
      <strong>{value}</strong>
      {delta && <small>{delta}</small>}
      <div className={styles.telemetrySpark} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </article>
  )
}
