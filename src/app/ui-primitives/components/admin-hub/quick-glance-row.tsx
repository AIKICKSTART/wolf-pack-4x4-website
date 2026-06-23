import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react"
import type { CSSProperties } from "react"

import { adminToneToVar, type GlanceMetric, type KpiDelta } from "./admin-hub-types"

import styles from "./quick-glance-row.module.css"

interface QuickGlanceRowProps {
  metrics: ReadonlyArray<GlanceMetric>
  label?: string
  className?: string
}

const DIRECTION_CLASS: Record<KpiDelta, string> = {
  up: styles.deltaUp,
  down: styles.deltaDown,
  flat: styles.deltaFlat,
}

function DeltaIcon({ direction }: { direction: KpiDelta }) {
  if (direction === "up") {
    return <ArrowUpRight size={11} strokeWidth={2.4} aria-hidden="true" />
  }
  if (direction === "down") {
    return <ArrowDownRight size={11} strokeWidth={2.4} aria-hidden="true" />
  }
  return <Minus size={11} strokeWidth={2.4} aria-hidden="true" />
}

export function QuickGlanceRow({
  metrics,
  label = "At a glance",
  className,
}: QuickGlanceRowProps) {
  return (
    <section
      className={[styles.strip, className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      <span className={styles.kicker}>{label}</span>
      <ul className={styles.list} role="list">
        {metrics.map((metric) => {
          const direction = metric.direction ?? "flat"
          return (
            <li
              key={metric.id}
              className={styles.cell}
              style={{ "--cell-tone": adminToneToVar(metric.tone) } as CSSProperties}
              aria-label={`${metric.label}: ${metric.value}${metric.unit ?? ""}${
                metric.delta ? `, ${direction} ${metric.delta}` : ""
              }`}
            >
              <span className={styles.cellLabel}>{metric.label}</span>
              <span className={styles.cellValue}>
                {metric.value}
                {metric.unit && <em className={styles.unit}>{metric.unit}</em>}
              </span>
              {metric.delta && (
                <span
                  className={[styles.delta, DIRECTION_CLASS[direction]].join(" ")}
                  aria-hidden="true"
                >
                  <DeltaIcon direction={direction} />
                  {metric.delta}
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default QuickGlanceRow
