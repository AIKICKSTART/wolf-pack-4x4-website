import styles from "./service-radius-overlay.module.css"

export interface ServiceRadiusRing {
  /** Radius in SVG user units (matches the StaticMapCanvas viewBox). */
  radius: number
  label: string
}

export interface ServiceRadiusOverlayProps {
  /** Center X in viewBox units. */
  cx: number
  /** Center Y in viewBox units. */
  cy: number
  rings: ReadonlyArray<ServiceRadiusRing>
  groupLabel: string
}

/**
 * Concentric service-radius rings rendered inside a parent SVG. Each ring
 * shows a faint stroke + a label chip at the top of the ring.
 */
export function ServiceRadiusOverlay({
  cx,
  cy,
  rings,
  groupLabel,
}: ServiceRadiusOverlayProps) {
  return (
    <g role="group" aria-label={groupLabel}>
      {rings.map((ring, index) => {
        const tier = index % 3
        const tierClass =
          tier === 0
            ? styles.ringInner
            : tier === 1
            ? styles.ringMid
            : styles.ringOuter

        return (
          <g key={ring.label} className={styles.ring}>
            <circle
              cx={cx}
              cy={cy}
              r={ring.radius}
              className={`${styles.circle} ${tierClass}`}
            />
            <g transform={`translate(${cx} ${cy - ring.radius})`}>
              <rect
                x="-26"
                y="-9"
                width="52"
                height="18"
                rx="9"
                className={styles.chip}
              />
              <text x="0" y="4" textAnchor="middle" className={styles.chipLabel}>
                {ring.label}
              </text>
            </g>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r="3.5" className={styles.center} />
    </g>
  )
}

export default ServiceRadiusOverlay
