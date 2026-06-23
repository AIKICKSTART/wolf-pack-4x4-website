import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"

import { clamp01 } from "./photo-editor-types"
import type { CurveAnchor, HistogramBuckets, LevelsState } from "./photo-editor-types"
import styles from "./levels-curves-editor.module.css"

interface LevelsCurvesEditorProps {
  /** Active editor mode. */
  mode?: "levels" | "curves"
  /** Histogram buckets — recommended 32-128 values; component normalises. */
  histogram: HistogramBuckets
  /** Levels state (black / mid / white) shown in markers + sliders. */
  levels: LevelsState
  /** Curve anchors for the curve editor (4-6 anchors recommended). */
  curve: ReadonlyArray<CurveAnchor>
  /** Optional title — defaults to "Levels / curves". */
  title?: string
}

const WIDTH = 420
const HEIGHT = 200

function buildCurvePath(anchors: ReadonlyArray<CurveAnchor>): string {
  if (anchors.length === 0) {
    return ""
  }
  // Sort by t in ascending order and clamp.
  const sorted = anchors
    .map((anchor) => ({ t: clamp01(anchor.t), v: clamp01(anchor.v) }))
    .sort((a, b) => a.t - b.t)

  return sorted
    .map((anchor, index) => {
      const x = anchor.t * WIDTH
      const y = (1 - anchor.v) * HEIGHT
      const cmd = index === 0 ? "M" : "L"
      return `${cmd} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(" ")
}

function normaliseHistogram(values: HistogramBuckets): ReadonlyArray<number> {
  if (values.length === 0) return []
  const max = Math.max(...values)
  if (max <= 0) return values.map(() => 0)
  return values.map((v) => clamp01(v / max))
}

export function LevelsCurvesEditor({
  mode = "levels",
  histogram,
  levels,
  curve,
  title = "Levels / curves",
}: LevelsCurvesEditorProps) {
  const normalised = normaliseHistogram(histogram)
  const stageVars: CSSProperties = {
    "--bucket-count": normalised.length || 1,
  } as CSSProperties

  const curveD = buildCurvePath(curve)
  const sortedAnchors = curve
    .map((anchor) => ({ t: clamp01(anchor.t), v: clamp01(anchor.v) }))
    .sort((a, b) => a.t - b.t)

  return (
    <section className={styles.wrap} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.title}>{title}</span>
        <span className={styles.kicker}>
          <Chip label={`B ${Math.round(levels.black * 255)}`} tone="neutral" />
          <Chip label={`M ${(levels.mid * 2).toFixed(2)}`} tone="amber" />
          <Chip label={`W ${Math.round(levels.white * 255)}`} tone="neutral" />
        </span>
      </header>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Editor mode"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "levels"}
          className={[styles.tab, mode === "levels" ? styles.tabActive : ""].join(" ")}
        >
          Levels
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "curves"}
          className={[styles.tab, mode === "curves" ? styles.tabActive : ""].join(" ")}
        >
          Curves
        </button>
      </div>

      <div
        className={styles.stage}
        role="img"
        aria-label={`Histogram + ${mode} editor · ${normalised.length} buckets`}
      >
        <div className={styles.histogram} style={stageVars} aria-hidden="true">
          {normalised.map((value, index) => (
            <span
              key={index}
              className={styles.bucket}
              style={{ "--bucket-height": `${value * 100}%` } as CSSProperties}
            />
          ))}
        </div>

        {mode === "curves" ? (
          <svg
            className={styles.svgCurve}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={`M 0 ${HEIGHT} L ${WIDTH} 0`} className={styles.diagonal} />
            <path d={curveD} className={styles.curveLine} />
            {sortedAnchors.map((anchor, index) => (
              <circle
                key={index}
                cx={anchor.t * WIDTH}
                cy={(1 - anchor.v) * HEIGHT}
                r={5}
                className={styles.anchor}
              />
            ))}
          </svg>
        ) : null}

        <div className={styles.markers} aria-hidden="true">
          <span
            className={[styles.marker, styles.markerBlack].join(" ")}
            style={{ "--marker-pos": `${clamp01(levels.black) * 100}%` } as CSSProperties}
          />
          <span
            className={[styles.marker, styles.markerMid].join(" ")}
            style={{ "--marker-pos": `${clamp01(levels.mid) * 100}%` } as CSSProperties}
          />
          <span
            className={[styles.marker, styles.markerWhite].join(" ")}
            style={{ "--marker-pos": `${clamp01(levels.white) * 100}%` } as CSSProperties}
          />
        </div>
      </div>

      <div className={styles.sliders}>
        <SliderCard
          label="Black point"
          value={`${Math.round(clamp01(levels.black) * 255)}`}
          color="#0b0c12"
          fill={clamp01(levels.black)}
        />
        <SliderCard
          label="Gamma"
          value={(levels.mid * 2).toFixed(2)}
          color="var(--primitive-amber)"
          fill={clamp01(levels.mid)}
        />
        <SliderCard
          label="White point"
          value={`${Math.round(clamp01(levels.white) * 255)}`}
          color="#f5f6fa"
          fill={clamp01(levels.white)}
        />
      </div>
    </section>
  )
}

interface SliderCardProps {
  label: string
  value: string
  color: string
  fill: number
}

function SliderCard({ label, value, color, fill }: SliderCardProps) {
  const style: CSSProperties = {
    "--bar-width": `${clamp01(fill) * 100}%`,
    "--bar-color": color,
  } as CSSProperties
  return (
    <div className={styles.sliderCard}>
      <span className={styles.sliderLabel}>{label}</span>
      <span className={styles.sliderValue}>{value}</span>
      <span className={styles.sliderBar} style={style} aria-hidden="true">
        <span className={styles.sliderFill} />
      </span>
    </div>
  )
}
