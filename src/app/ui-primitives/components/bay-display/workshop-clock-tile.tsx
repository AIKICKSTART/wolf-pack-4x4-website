"use client"

import { useEffect, useState } from "react"

import { formatClock24 } from "./bay-display-types"
import styles from "./workshop-clock-tile.module.css"

export type ShiftId = "morning" | "afternoon" | "after-hours"

export interface WorkshopClockTileProps {
  /** Static seed for SSR; component falls back to live tick after mount. */
  initialTime: Date
  /** Display label for the current shift. */
  shift: ShiftId
  /** Date label override — defaults to en-AU formatted. */
  dateLabel?: string
  className?: string
}

const SHIFT_LABEL: Readonly<Record<ShiftId, string>> = {
  morning: "Morning crew",
  afternoon: "Afternoon crew",
  "after-hours": "After hours",
}

function clampDeg(value: number): number {
  return ((value % 360) + 360) % 360
}

export function WorkshopClockTile({
  initialTime,
  shift,
  dateLabel,
  className,
}: WorkshopClockTileProps) {
  const [now, setNow] = useState<Date>(initialTime)

  useEffect(() => {
    const align = () => setNow(new Date())
    const initialTick = window.setTimeout(align, 0)
    const t = window.setInterval(align, 30_000)
    return () => {
      window.clearTimeout(initialTick)
      window.clearInterval(t)
    }
  }, [])

  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const hh = formatClock24(now)
  const ss = seconds.toString().padStart(2, "0")
  const label =
    dateLabel ??
    new Intl.DateTimeFormat("en-AU", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(now)

  const minuteDeg = clampDeg(minutes * 6 + seconds * 0.1)
  const hourDeg = clampDeg(((hours % 12) + minutes / 60) * 30)

  const classes = [styles.tile, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Workshop clock — ${hh}, ${SHIFT_LABEL[shift]}`}
    >
      <div className={styles.analogWrap} aria-hidden="true">
        <div className={styles.analog}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={styles.tick}
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
          <span
            className={styles.handHour}
            style={{ transform: `rotate(${hourDeg}deg)` }}
          />
          <span
            className={styles.handMinute}
            style={{ transform: `rotate(${minuteDeg}deg)` }}
          />
          <span className={styles.hub} />
        </div>
      </div>
      <div className={styles.digital}>
        <strong className={styles.timeText}>
          {hh}
          <em>:{ss}</em>
        </strong>
        <span className={styles.date}>{label}</span>
        <span className={styles.shift} data-shift={shift}>
          {SHIFT_LABEL[shift]}
        </span>
      </div>
    </article>
  )
}

export default WorkshopClockTile
