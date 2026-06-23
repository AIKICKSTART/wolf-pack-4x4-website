import { useId } from "react"

import { Chip } from "../primitives/chip"
import { DynoCurveIcon } from "../icons/dyno-curve"
import {
  type DynoCurvePoint,
  type DynoRun,
  formatKw,
  formatNm,
  formatRpm,
} from "./workshop-ops-types"

import styles from "./dyno-run-card.module.css"

interface DynoRunCardProps {
  run: DynoRun
  className?: string
}

interface CurveExtents {
  minRpm: number
  maxRpm: number
  maxPower: number
  maxTorque: number
}

function extents(
  before: ReadonlyArray<DynoCurvePoint>,
  after: ReadonlyArray<DynoCurvePoint>,
): CurveExtents {
  const all = [...before, ...after]
  if (all.length === 0) {
    return { minRpm: 1000, maxRpm: 7000, maxPower: 100, maxTorque: 200 }
  }
  let minRpm = Infinity
  let maxRpm = -Infinity
  let maxPower = -Infinity
  let maxTorque = -Infinity
  for (const point of all) {
    if (point.rpm < minRpm) minRpm = point.rpm
    if (point.rpm > maxRpm) maxRpm = point.rpm
    if (point.power > maxPower) maxPower = point.power
    if (point.torque > maxTorque) maxTorque = point.torque
  }
  return { minRpm, maxRpm, maxPower, maxTorque }
}

function buildCurvePath(
  points: ReadonlyArray<DynoCurvePoint>,
  width: number,
  height: number,
  ext: CurveExtents,
  metric: "power" | "torque",
): string {
  if (points.length === 0) return ""
  const max = metric === "power" ? ext.maxPower : ext.maxTorque
  const rpmRange = ext.maxRpm - ext.minRpm || 1
  return points
    .map((point, idx) => {
      const x = ((point.rpm - ext.minRpm) / rpmRange) * width
      const value = metric === "power" ? point.power : point.torque
      const y = height - (value / max) * height * 0.92
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

export function DynoRunCard({ run, className }: DynoRunCardProps) {
  const gradientPower = useId()
  const gradientTorque = useId()
  const ext = extents(run.beforeCurve, run.afterCurve)

  const width = 320
  const height = 132

  const beforePowerPath = buildCurvePath(
    run.beforeCurve,
    width,
    height,
    ext,
    "power",
  )
  const afterPowerPath = buildCurvePath(
    run.afterCurve,
    width,
    height,
    ext,
    "power",
  )
  const beforeTorquePath = buildCurvePath(
    run.beforeCurve,
    width,
    height,
    ext,
    "torque",
  )
  const afterTorquePath = buildCurvePath(
    run.afterCurve,
    width,
    height,
    ext,
    "torque",
  )

  const peakBeforePower = Math.max(
    0,
    ...run.beforeCurve.map((point) => point.power),
  )
  const peakBeforeTorque = Math.max(
    0,
    ...run.beforeCurve.map((point) => point.torque),
  )
  const powerDelta = run.peakPowerKw - peakBeforePower
  const torqueDelta = run.peakTorqueNm - peakBeforeTorque
  const powerDeltaPct = peakBeforePower
    ? (powerDelta / peakBeforePower) * 100
    : 0
  const torqueDeltaPct = peakBeforeTorque
    ? (torqueDelta / peakBeforeTorque) * 100
    : 0

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Dyno run: ${run.label}`}>
      <header className={styles.head}>
        <div className={styles.headIdentity}>
          <span className={styles.kicker}>Dyno result</span>
          <h3 className={styles.title}>
            <span className={styles.titleGlyph} aria-hidden="true">
              <DynoCurveIcon size={22} tone="amber" motion="none" />
            </span>
            {run.label}
          </h3>
          <span className={styles.timestamp}>
            <time>{run.recordedAt}</time>
          </span>
        </div>
        <div className={styles.peaks}>
          <div className={styles.peakStat}>
            <span className={styles.peakLabel}>Peak power</span>
            <span className={styles.peakValue}>{formatKw(run.peakPowerKw)}</span>
            <span
              className={[
                styles.peakDelta,
                powerDelta >= 0 ? styles.peakDeltaUp : styles.peakDeltaDown,
              ].join(" ")}
            >
              {powerDelta >= 0 ? "▲" : "▼"} {Math.abs(powerDelta).toFixed(1)} kW · {Math.abs(powerDeltaPct).toFixed(1)}%
            </span>
          </div>
          <div className={styles.peakStat}>
            <span className={styles.peakLabel}>Peak torque</span>
            <span className={styles.peakValue}>{formatNm(run.peakTorqueNm)}</span>
            <span
              className={[
                styles.peakDelta,
                torqueDelta >= 0 ? styles.peakDeltaUp : styles.peakDeltaDown,
              ].join(" ")}
            >
              {torqueDelta >= 0 ? "▲" : "▼"} {Math.abs(torqueDelta).toFixed(0)} Nm · {Math.abs(torqueDeltaPct).toFixed(1)}%
            </span>
          </div>
          <div className={styles.peakStat}>
            <span className={styles.peakLabel}>@ RPM</span>
            <span className={styles.peakValue}>{formatRpm(run.peakRpm)}</span>
          </div>
        </div>
      </header>

      <section className={styles.chartBlock} aria-label="Power and torque curves">
        <header className={styles.chartHead}>
          <Chip label="Before" tone="neutral" />
          <Chip label="After" tone="amber" />
        </header>
        <div className={styles.charts}>
          <figure className={styles.figure}>
            <figcaption className={styles.figCaption}>Power (kW)</figcaption>
            <svg
              className={styles.chart}
              viewBox={`0 0 ${width} ${height}`}
              width={width}
              height={height}
              role="img"
              aria-label={`Power curve from ${ext.minRpm} to ${ext.maxRpm} rpm`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={gradientPower} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primitive-amber)" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="var(--primitive-amber)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${afterPowerPath} L ${width} ${height} L 0 ${height} Z`}
                fill={`url(#${gradientPower})`}
              />
              <path
                d={beforePowerPath}
                className={styles.lineBefore}
                fill="none"
              />
              <path
                d={afterPowerPath}
                className={styles.lineAfter}
                fill="none"
              />
            </svg>
          </figure>
          <figure className={styles.figure}>
            <figcaption className={styles.figCaption}>Torque (Nm)</figcaption>
            <svg
              className={styles.chart}
              viewBox={`0 0 ${width} ${height}`}
              width={width}
              height={height}
              role="img"
              aria-label={`Torque curve from ${ext.minRpm} to ${ext.maxRpm} rpm`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={gradientTorque} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primitive-teal)" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="var(--primitive-teal)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${afterTorquePath} L ${width} ${height} L 0 ${height} Z`}
                fill={`url(#${gradientTorque})`}
              />
              <path
                d={beforeTorquePath}
                className={styles.lineBefore}
                fill="none"
              />
              <path
                d={afterTorquePath}
                className={styles.lineTorqueAfter}
                fill="none"
              />
            </svg>
          </figure>
        </div>
        <footer className={styles.chartFoot}>
          <span>{formatRpm(ext.minRpm)}</span>
          <span>{formatRpm(ext.maxRpm)}</span>
        </footer>
      </section>

      {run.notes ? (
        <p className={styles.notes}>{run.notes}</p>
      ) : null}
    </article>
  )
}

export default DynoRunCard
