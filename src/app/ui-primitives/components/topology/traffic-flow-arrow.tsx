import type { CSSProperties } from "react"
import { ArrowRight } from "lucide-react"

import styles from "./traffic-flow-arrow.module.css"

interface TrafficFlowArrowProps {
  /** Start point as percentage. */
  fromX: number
  fromY: number
  /** End point as percentage. */
  toX: number
  toY: number
  /** Requests per second value. */
  rate: number
  /** Saturation 0..1 — drives tone shift. Defaults to 0.4. */
  saturation?: number
}

function pickTone(saturation: number): string {
  if (saturation >= 0.85) return styles.toneRed
  if (saturation >= 0.6) return styles.toneAmber
  if (saturation >= 0.25) return styles.toneTeal
  return styles.toneGreen
}

function formatRate(rate: number): string {
  if (rate >= 1000) return `${(rate / 1000).toFixed(1)}k`
  return `${rate}`
}

export function TrafficFlowArrow({
  fromX,
  fromY,
  toX,
  toY,
  rate,
  saturation = 0.4,
}: TrafficFlowArrowProps) {
  const dx = toX - fromX
  const dy = toY - fromY
  const length = Math.sqrt(dx * dx + dy * dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI

  const style: CSSProperties = {
    left: `${fromX}%`,
    top: `${fromY}%`,
    width: `${length}%`,
    transform: `rotate(${angle}deg)`,
  }

  const classes = [styles.arrow, pickTone(saturation)].join(" ")
  const intensity = Math.min(1, Math.max(0, saturation))

  return (
    <span
      className={classes}
      style={style}
      aria-label={`Traffic flow ${rate} req per second, ${Math.round(intensity * 100)}% saturation`}
      role="img"
    >
      <span
        className={styles.shaft}
        style={{ "--flow-intensity": intensity } as CSSProperties}
      >
        <span className={styles.head}>
          <ArrowRight strokeWidth={2.6} />
        </span>
      </span>
      <span className={styles.rateChip}>
        {formatRate(rate)} <small>req/s</small>
      </span>
    </span>
  )
}
