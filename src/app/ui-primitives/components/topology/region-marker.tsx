import { MapPin } from "lucide-react"

import styles from "./region-marker.module.css"
import type { RegionDescriptor } from "./topology-types"

interface RegionMarkerProps {
  /** Region descriptor. */
  region: RegionDescriptor
  /** Render with a softer background — defaults to false. */
  ghost?: boolean
}

function countryToFlag(country: string | undefined): string | null {
  if (!country || country.length !== 2) return null
  const upper = country.toUpperCase()
  const base = 0x1f1e6
  const codePoints = [
    base + (upper.charCodeAt(0) - 0x41),
    base + (upper.charCodeAt(1) - 0x41),
  ]
  return String.fromCodePoint(...codePoints)
}

export function RegionMarker({ region, ghost = false }: RegionMarkerProps) {
  const flag = countryToFlag(region.country)
  const classes = [styles.marker, ghost ? styles.ghost : ""].filter(Boolean).join(" ")

  return (
    <span
      className={classes}
      role="img"
      aria-label={`Region ${region.id}${region.label ? `, ${region.label}` : ""}`}
    >
      <span className={styles.iconBadge} aria-hidden="true">
        {flag ? <span className={styles.flag}>{flag}</span> : <MapPin strokeWidth={2.4} />}
      </span>
      <span className={styles.text}>
        <span className={styles.id}>{region.id}</span>
        <span className={styles.label}>
          {region.label}
          {typeof region.datacentres === "number" ? (
            <span className={styles.dcChip}>{region.datacentres} DC</span>
          ) : null}
        </span>
      </span>
    </span>
  )
}
