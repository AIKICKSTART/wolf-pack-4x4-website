import type { ReactNode } from "react"

import styles from "./static-map-canvas.module.css"

export type StaticMapTone = "dark" | "midnight" | "amber" | "teal"

export interface StaticMapCanvasProps {
  width?: number
  height?: number
  tone?: StaticMapTone
  label: string
  children?: ReactNode
  showCompass?: boolean
  className?: string
}

const TONE_CLASS: Record<StaticMapTone, string> = {
  dark: styles.toneDark,
  midnight: styles.toneMidnight,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
}

/**
 * Hand-drawn SVG static map. Simulates landmass, harbour, and faint road
 * arteries. Other map primitives compose on top via the `children` slot,
 * which is rendered above the cartography but underneath the compass.
 */
export function StaticMapCanvas({
  width = 720,
  height = 480,
  tone = "dark",
  label,
  children,
  showCompass = true,
  className,
}: StaticMapCanvasProps) {
  const figureClass = [styles.figure, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <figure className={figureClass}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={label}
      >
        <defs>
          <radialGradient id="static-map-haze" cx="50%" cy="50%" r="68%">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <pattern
            id="static-map-grid"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Water / canvas base */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          className={styles.water}
        />
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#static-map-grid)"
          aria-hidden="true"
        />

        {/* Coastal landmass — simulated Illawarra shoreline */}
        <path
          className={styles.land}
          d={`M 0 ${height * 0.18}
              C ${width * 0.18} ${height * 0.05}, ${width * 0.34} ${height * 0.22}, ${width * 0.42} ${height * 0.36}
              C ${width * 0.48} ${height * 0.46}, ${width * 0.4} ${height * 0.58}, ${width * 0.46} ${height * 0.68}
              C ${width * 0.52} ${height * 0.78}, ${width * 0.36} ${height * 0.88}, ${width * 0.2} ${height * 0.94}
              L 0 ${height * 0.94} Z`}
        />

        {/* Harbour notch */}
        <path
          className={styles.harbour}
          d={`M ${width * 0.36} ${height * 0.5}
              Q ${width * 0.5} ${height * 0.46}, ${width * 0.58} ${height * 0.58}
              Q ${width * 0.5} ${height * 0.66}, ${width * 0.4} ${height * 0.62}
              Q ${width * 0.34} ${height * 0.58}, ${width * 0.36} ${height * 0.5} Z`}
        />

        {/* Secondary landmass island */}
        <path
          className={styles.land}
          d={`M ${width * 0.72} ${height * 0.16}
              C ${width * 0.86} ${height * 0.12}, ${width * 0.96} ${height * 0.28}, ${width * 0.92} ${height * 0.46}
              C ${width * 0.84} ${height * 0.62}, ${width * 0.7} ${height * 0.5}, ${width * 0.68} ${height * 0.32}
              Z`}
        />

        {/* Road arteries */}
        <g className={styles.roads} aria-hidden="true">
          <path d={`M 0 ${height * 0.36} L ${width * 0.42} ${height * 0.38} L ${width * 0.62} ${height * 0.52} L ${width} ${height * 0.58}`} />
          <path d={`M ${width * 0.18} ${height} L ${width * 0.2} ${height * 0.46} L ${width * 0.34} ${height * 0.22}`} />
          <path d={`M ${width * 0.4} ${height * 0.94} L ${width * 0.5} ${height * 0.7} L ${width * 0.74} ${height * 0.4} L ${width} ${height * 0.3}`} />
        </g>

        {/* Soft vignette */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#static-map-haze)"
          aria-hidden="true"
        />

        {/* Compass */}
        {showCompass ? (
          <g
            className={styles.compass}
            transform={`translate(${width - 64}, ${height - 64})`}
            aria-hidden="true"
          >
            <circle cx="0" cy="0" r="22" />
            <path d="M 0 -16 L 4 0 L 0 16 L -4 0 Z" className={styles.compassNeedle} />
            <text x="0" y="-26" textAnchor="middle" className={styles.compassLabel}>
              N
            </text>
          </g>
        ) : null}

        {/* Slot for overlays (pins, routes, hex bins) */}
        {children}
      </svg>
    </figure>
  )
}

export default StaticMapCanvas
