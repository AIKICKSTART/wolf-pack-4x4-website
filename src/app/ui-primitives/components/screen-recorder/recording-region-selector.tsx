import styles from "./recording-region-selector.module.css"

import type { RecordingResolution } from "./screen-recorder-types"

interface RecordingRegionSelectorProps {
  /** Region in CSS percentages relative to its stage container. */
  regionPct?: {
    top: number
    left: number
    width: number
    height: number
  }
  /** Resolution chip value. */
  resolution: RecordingResolution
  /** Frame rate chip value. */
  fps?: 24 | 30 | 60
  /** Stage label printed in the corner. */
  stageLabel?: string
}

const DEFAULT_REGION = { top: 18, left: 14, width: 66, height: 54 }

export function RecordingRegionSelector({
  regionPct = DEFAULT_REGION,
  resolution,
  fps = 30,
  stageLabel = "Selecting capture region",
}: RecordingRegionSelectorProps) {
  const corners = ["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const
  return (
    <div className={styles.stage}>
      <span className={styles.stageLabel}>{stageLabel}</span>

      <div
        className={styles.region}
        role="region"
        aria-label={`Recording region · ${resolution} · ${fps}fps`}
        style={{
          top: `${regionPct.top}%`,
          left: `${regionPct.left}%`,
          width: `${regionPct.width}%`,
          height: `${regionPct.height}%`,
        }}
      >
        <span className={styles.dim} aria-hidden="true" />
        <span className={styles.outline} aria-hidden="true" />
        {corners.map((corner) => (
          <span
            key={corner}
            className={[styles.handle, styles[`handle-${corner}`]].join(" ")}
            aria-hidden="true"
          />
        ))}
        <span className={styles.chips} aria-hidden="true">
          <span className={styles.chip}>
            <span className={styles.chipDot} />
            {resolution}
          </span>
          <span className={styles.chip}>{fps}fps</span>
        </span>
        <span className={styles.crosshair} aria-hidden="true">
          <span className={styles.crosshairH} />
          <span className={styles.crosshairV} />
        </span>
      </div>
    </div>
  )
}
