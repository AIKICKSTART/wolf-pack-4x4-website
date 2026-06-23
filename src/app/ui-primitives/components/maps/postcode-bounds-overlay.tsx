import styles from "./postcode-bounds-overlay.module.css"

export interface PostcodePolygon {
  postcode: string
  suburb: string
  /** SVG polygon points string e.g. "10,10 90,20 80,80 20,70". */
  points: string
  /** Anchor X for the label tag. */
  labelX: number
  /** Anchor Y for the label tag. */
  labelY: number
}

export interface PostcodeBoundsOverlayProps {
  polygons: ReadonlyArray<PostcodePolygon>
  groupLabel: string
}

/**
 * SVG polygon overlays representing postcode boundaries with a label
 * tag positioned at each polygon's anchor.
 */
export function PostcodeBoundsOverlay({
  polygons,
  groupLabel,
}: PostcodeBoundsOverlayProps) {
  return (
    <g role="group" aria-label={groupLabel}>
      {polygons.map((poly, index) => {
        const toneClass =
          index % 3 === 0
            ? styles.toneRed
            : index % 3 === 1
            ? styles.toneAmber
            : styles.toneTeal
        return (
          <g key={poly.postcode} className={`${styles.polygon} ${toneClass}`}>
            <polygon points={poly.points} className={styles.shape} />
            <g transform={`translate(${poly.labelX} ${poly.labelY})`}>
              <rect
                x="-30"
                y="-12"
                width="60"
                height="24"
                rx="6"
                className={styles.tagBg}
              />
              <text x="0" y="-1" textAnchor="middle" className={styles.tagPostcode}>
                {poly.postcode}
              </text>
              <text x="0" y="9" textAnchor="middle" className={styles.tagSuburb}>
                {poly.suburb}
              </text>
            </g>
          </g>
        )
      })}
    </g>
  )
}

export default PostcodeBoundsOverlay
