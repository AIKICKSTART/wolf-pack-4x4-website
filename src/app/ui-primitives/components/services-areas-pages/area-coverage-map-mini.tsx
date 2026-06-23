import { MapPin, StaticMapCanvas, type MapPinTone } from "../maps"

import type { CoverageDensity } from "./services-areas-types"
import styles from "./area-coverage-map-mini.module.css"

export interface AreaCoverageMapMiniWorkshop {
  id: string
  /** Pin label — e.g. workshop name. */
  label: string
  /** X position 0–100% within the map area. */
  x: number
  /** Y position 0–100% within the map area. */
  y: number
  /** Index displayed inside the pin. */
  index: number
  /** Optional: render this workshop as the active highlighted pin. */
  active?: boolean
}

export interface AreaCoverageMapMiniProps {
  /** Kicker, e.g. "Coverage map". */
  kicker?: string
  /** Mini-map title, e.g. "Illawarra coverage". */
  title: string
  /** Workshops dropped as map pins. */
  workshops: ReadonlyArray<AreaCoverageMapMiniWorkshop>
  /** Coverage density tones the pin colour mix. */
  density: CoverageDensity
  /** Scale chip label, e.g. "20 km radius". */
  scaleLabel: string
}

const DENSITY_TO_TONE: Record<CoverageDensity, MapPinTone> = {
  high: "red",
  medium: "amber",
  light: "teal",
}

/**
 * Area coverage mini-map. Composes the maps `StaticMapCanvas` (which
 * already supplies the hand-drawn Illawarra-style region SVG) and the
 * `MapPin` primitive for each workshop. The mini-map's only adapter
 * concern is the scale chip overlay and the area-tone wiring.
 */
export function AreaCoverageMapMini({
  kicker = "Coverage map",
  title,
  workshops,
  density,
  scaleLabel,
}: AreaCoverageMapMiniProps) {
  const tone = DENSITY_TO_TONE[density]

  return (
    <section className={styles.wrap} aria-label={`${title} mini coverage map`}>
      <header className={styles.header}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
      </header>
      <div
        className={styles.mapHost}
        role="img"
        aria-label={`${title} area outline with ${workshops.length} workshop pins`}
      >
        <StaticMapCanvas
          width={420}
          height={260}
          tone="midnight"
          showCompass
          label={`${title} hand-drawn region outline`}
        />
        {workshops.map((workshop) => (
          <MapPin
            key={workshop.id}
            x={workshop.x}
            y={workshop.y}
            tone={tone}
            label={workshop.label}
            index={workshop.index}
            active={workshop.active}
          />
        ))}
        <span className={styles.scaleChip} aria-hidden="true">
          <span className={styles.scaleBar} />
          {scaleLabel}
        </span>
      </div>
    </section>
  )
}

export default AreaCoverageMapMini
