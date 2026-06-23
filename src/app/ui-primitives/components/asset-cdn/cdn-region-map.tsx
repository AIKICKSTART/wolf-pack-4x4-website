import {
  REGION_LABEL,
  formatPercent,
  formatThroughput,
  type RegionCode,
  type RegionTelemetry,
} from "./asset-cdn-types"

import styles from "./cdn-region-map.module.css"

interface CdnRegionMapProps {
  regions: ReadonlyArray<RegionTelemetry>
  highlightId?: RegionCode
  className?: string
}

/**
 * Equirectangular-ish lat/lon to 0-100 percent on a 16:9 surface.
 * Hand-tuned so the AU east coast sits at roughly 80% across.
 */
const REGION_POS: Record<RegionCode, { x: number; y: number }> = {
  syd: { x: 86, y: 70 },
  mel: { x: 82, y: 75 },
  per: { x: 73, y: 70 },
  akl: { x: 95, y: 75 },
  sin: { x: 76, y: 53 },
  lax: { x: 14, y: 42 },
  fra: { x: 52, y: 30 },
  iad: { x: 26, y: 38 },
}

function getTone(hitRate: number): "red" | "amber" | "teal" | "green" {
  if (hitRate >= 90) return "green"
  if (hitRate >= 75) return "teal"
  if (hitRate >= 60) return "amber"
  return "red"
}

const TONE_CLASS: Record<"red" | "amber" | "teal" | "green", string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function CdnRegionMap({ regions, highlightId, className }: CdnRegionMapProps) {
  return (
    <section
      className={[styles.panel, className].filter(Boolean).join(" ")}
      aria-label="Global CDN region map"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Global cache · {regions.length} regions</span>
        <h3 className={styles.title}>Cache-hit rate by region</h3>
      </header>

      <div className={styles.map} role="img" aria-label="World map of CDN regions">
        <svg
          viewBox="0 0 100 56"
          preserveAspectRatio="none"
          className={styles.mapSvg}
          aria-hidden="true"
        >
          <defs>
            <pattern id="ofm-cdn-grid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path
                d="M 5 0 L 0 0 L 0 5"
                fill="none"
                stroke="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
                strokeWidth="0.2"
              />
            </pattern>
            <radialGradient id="ofm-cdn-glow" cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--primitive-teal) 18%, transparent)" />
              <stop offset="100%" stopColor="color-mix(in oklab, var(--primitive-teal) 0%, transparent)" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="100" height="56" fill="color-mix(in oklab, var(--primitive-canvas) 92%, transparent)" />
          <rect x="0" y="0" width="100" height="56" fill="url(#ofm-cdn-grid)" />
          <ellipse cx="50" cy="28" rx="50" ry="28" fill="url(#ofm-cdn-glow)" />
          <path
            d="M2 24 Q12 18 22 22 Q30 26 36 22 Q44 18 48 24 Q52 30 60 28 Q70 22 82 22 Q90 24 96 30"
            stroke="color-mix(in oklab, var(--primitive-teal) 18%, transparent)"
            strokeWidth="0.4"
            fill="none"
            strokeDasharray="0.6 1.2"
          />
        </svg>

        <ul className={styles.pinList}>
          {regions.map((region) => {
            const pos = REGION_POS[region.region]
            const tone = getTone(region.hitRate)
            const isHighlight = highlightId === region.region
            return (
              <li
                key={region.region}
                className={[styles.pin, TONE_CLASS[tone], isHighlight ? styles.pinHigh : ""].filter(Boolean).join(" ")}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <span className={styles.pinDot} aria-hidden="true" />
                <span className={styles.pinHalo} aria-hidden="true" />
                <span className={styles.pinLabel}>
                  <span className={styles.pinCode}>{region.region.toUpperCase()}</span>
                  <span className={styles.pinHit}>{formatPercent(region.hitRate)}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <ul className={styles.legend}>
        {regions.map((region) => {
          const tone = getTone(region.hitRate)
          return (
            <li
              key={region.region}
              className={[styles.legendRow, TONE_CLASS[tone]].join(" ")}
            >
              <span className={styles.legendDot} aria-hidden="true" />
              <span className={styles.legendName}>{REGION_LABEL[region.region]}</span>
              <span className={styles.legendStat}>{formatPercent(region.hitRate, 1)} hit</span>
              <span className={styles.legendStat}>{formatThroughput(region.throughput)}</span>
              <span className={styles.legendStat}>{region.latencyMs}ms p50</span>
              <span className={styles.legendStat}>{region.pops} PoPs</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default CdnRegionMap
