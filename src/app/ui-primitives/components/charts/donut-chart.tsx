import * as React from "react"

import styles from "./donut-chart.module.css"

export type DonutTone = "red" | "amber" | "teal" | "green"

export interface DonutSegment {
  label: string
  value: number
  tone: DonutTone
}

interface DonutChartProps {
  segments: DonutSegment[]
  /** Pixel size of the square viewBox. Defaults to 220. */
  size?: number
  /** Thickness of donut ring in viewport units. Defaults to 26. */
  thickness?: number
  ariaLabel: string
  /** Center label rendered in display font. */
  centerLabel: string
  /** Smaller caption rendered below centerLabel. */
  centerCaption?: string
  /** Show external labeled tick lines per segment. */
  segmentLabels?: boolean
}

const TONE_VAR: Record<DonutTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
}

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

function arcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number
): string {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  const [x1, y1] = polar(cx, cy, rOuter, endDeg)
  const [x2, y2] = polar(cx, cy, rOuter, startDeg)
  const [x3, y3] = polar(cx, cy, rInner, startDeg)
  const [x4, y4] = polar(cx, cy, rInner, endDeg)

  return [
    `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 0 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    `L ${x3.toFixed(2)} ${y3.toFixed(2)}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 1 ${x4.toFixed(2)} ${y4.toFixed(2)}`,
    "Z",
  ].join(" ")
}

export function DonutChart({
  segments,
  size = 220,
  thickness = 26,
  ariaLabel,
  centerLabel,
  centerCaption,
  segmentLabels = false,
}: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  const cx = size / 2
  const cy = size / 2
  const rOuter = size / 2 - 8
  const rInner = rOuter - thickness

  // Pre-compute cumulative angles via reduce so we never reassign during render.
  const cumulative = segments.reduce<number[]>((acc, seg) => {
    const previous = acc[acc.length - 1] ?? 0
    acc.push(previous + (seg.value / total) * 360)
    return acc
  }, [])

  const slices = segments.map((seg, idx) => {
    const ratio = seg.value / total
    const start = idx === 0 ? 0 : cumulative[idx - 1]
    const end = cumulative[idx]
    const labelDeg = (start + end) / 2
    const [lx, ly] = polar(cx, cy, rOuter + 14, labelDeg)
    return {
      key: seg.label + idx,
      d: arcPath(cx, cy, rOuter, rInner, start, end),
      tone: seg.tone,
      label: seg.label,
      value: seg.value,
      ratio,
      labelX: lx,
      labelY: ly,
      anchor: lx > cx + 4 ? "start" : lx < cx - 4 ? "end" : "middle",
    } as const
  })

  return (
    <figure className={styles.figure}>
      <svg
        className={styles.chart}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={ariaLabel}
      >
        <title>{ariaLabel}</title>
        <desc>{`Donut chart with ${segments.length} segments totaling ${total.toFixed(0)}.`}</desc>

        {/* Subtle background track */}
        <circle cx={cx} cy={cy} r={(rOuter + rInner) / 2} fill="none" stroke="var(--primitive-line)" strokeWidth={thickness} opacity={0.16} />

        <g className={styles.slices}>
          {slices.map((slice, idx) => (
            <g key={slice.key} className={styles.sliceGroup} style={{ animationDelay: `${idx * 80}ms` }}>
              <path
                d={slice.d}
                fill={TONE_VAR[slice.tone]}
                className={styles.slice}
                data-tone={slice.tone}
                style={{ color: TONE_VAR[slice.tone] }}
              />
            </g>
          ))}
        </g>

        {/* Center labels */}
        <g className={styles.center}>
          <text x={cx} y={cy - 2} textAnchor="middle" className={styles.centerValue}>
            {centerLabel}
          </text>
          {centerCaption ? (
            <text x={cx} y={cy + 18} textAnchor="middle" className={styles.centerCaption}>
              {centerCaption}
            </text>
          ) : null}
        </g>

        {/* Segment external labels */}
        {segmentLabels ? (
          <g className={styles.segLabels}>
            {slices.map((slice) => (
              <text
                key={`l-${slice.key}`}
                x={slice.labelX}
                y={slice.labelY}
                textAnchor={slice.anchor}
                className={styles.segLabel}
              >
                {slice.label}
              </text>
            ))}
          </g>
        ) : null}
      </svg>

      <figcaption className={styles.legend}>
        {slices.map((slice) => (
          <span
            key={`leg-${slice.key}`}
            className={styles.legendItem}
            style={{ "--swatch": TONE_VAR[slice.tone] } as React.CSSProperties}
          >
            <span className={styles.legendSwatch} aria-hidden="true" />
            <span className={styles.legendLabel}>{slice.label}</span>
            <span className={styles.legendValue}>{(slice.ratio * 100).toFixed(0)}%</span>
          </span>
        ))}
      </figcaption>
    </figure>
  )
}
