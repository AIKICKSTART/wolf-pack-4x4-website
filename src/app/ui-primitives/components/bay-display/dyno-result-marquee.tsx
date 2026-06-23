import { Activity, TrendingUp } from "lucide-react"

import { Marquee } from "../primitives/marquee"
import styles from "./dyno-result-marquee.module.css"

export interface DynoResultEntry {
  id: string
  /** Vehicle stack — "Patrol Y62 5.6L · QXK-014". */
  vehicle: string
  /** Peak power kW. */
  peakKw: number
  /** Peak torque Nm. */
  peakNm: number
  /** Customer surname for the grin. */
  customer: string
  /** Optional baseline before-tune in kW to compute delta. */
  baselineKw?: number
}

export interface DynoResultMarqueeProps {
  entries: ReadonlyArray<DynoResultEntry>
  speed?: number
  className?: string
}

export function DynoResultMarquee({
  entries,
  speed = 30,
  className,
}: DynoResultMarqueeProps) {
  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label="Latest dyno results"
    >
      <span className={styles.label}>
        <Activity size={18} strokeWidth={2.4} aria-hidden="true" />
        Dyno bench
      </span>
      <div className={styles.scroll}>
        <Marquee
          speed={speed}
          pauseOnHover
          gap={56}
          fadeEdges={false}
          ariaLabel="Dyno result reel"
        >
          {entries.map((entry) => {
            const delta =
              typeof entry.baselineKw === "number"
                ? Math.round(entry.peakKw - entry.baselineKw)
                : null
            return (
              <span key={entry.id} className={styles.item}>
                <strong className={styles.vehicle}>{entry.vehicle}</strong>
                <span className={styles.metric}>
                  <em>kW</em>
                  <strong className={styles.tabular}>
                    {Math.round(entry.peakKw)}
                  </strong>
                </span>
                <span className={styles.metric}>
                  <em>Nm</em>
                  <strong className={styles.tabular}>
                    {Math.round(entry.peakNm)}
                  </strong>
                </span>
                {delta !== null && (
                  <span className={styles.delta} data-pos={delta > 0 ? "on" : "off"}>
                    <TrendingUp size={12} strokeWidth={2.4} aria-hidden="true" />
                    <span className={styles.tabular}>
                      {delta > 0 ? "+" : ""}
                      {delta} kW
                    </span>
                  </span>
                )}
                <span className={styles.grin}>
                  <span aria-label="grinning driver" role="img">
                    {"😎"}
                  </span>
                  <em>{entry.customer}</em>
                </span>
              </span>
            )
          })}
        </Marquee>
      </div>
    </section>
  )
}

export default DynoResultMarquee
