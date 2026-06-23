import { Type } from "lucide-react"
import type { CSSProperties } from "react"

import { Chip } from "../primitives/chip"

import type { TypographyPairing } from "./brand-control-types"
import styles from "./brand-control.module.css"

interface TypographyPairingCardProps {
  pairing: TypographyPairing
  /** Render in print-friendly mode (light background, no scanline). */
  printMode?: boolean
  className?: string
}

/**
 * Display × body font pairing with a live sample. Display and body each use
 * inline `font-family` so the user sees the actual stack, not a theme
 * fallback. Tags chip the intended use.
 */
export function TypographyPairingCard({
  pairing,
  printMode = false,
  className,
}: TypographyPairingCardProps) {
  const cardClasses = [
    styles.card,
    styles.cardWide,
    printMode && styles.cardElevated,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={cardClasses}
      aria-label={`Typography pairing — ${pairing.label}`}
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <Type size={12} aria-hidden="true" /> Umbrella · Type
          </span>
          <h3 className={styles.title}>{pairing.label}</h3>
          <p className={styles.subtitle}>{pairing.rationale}</p>
        </div>
      </header>

      <div className={styles.livePreview} aria-label="Display sample">
        <span className={styles.tinyLabel}>Display · {pairing.displayFamily}</span>
        <h4
          className={styles.livePreviewHeading}
          style={{ fontFamily: pairing.displayFamily } as CSSProperties}
        >
          {pairing.displaySample}
        </h4>
      </div>

      <div className={styles.livePreview} aria-label="Body sample">
        <span className={styles.tinyLabel}>Body · {pairing.bodyFamily}</span>
        <p
          className={styles.livePreviewBody}
          style={
            { fontFamily: pairing.bodyFamily, fontSize: 15, lineHeight: 1.6, color: "var(--primitive-body)" } as CSSProperties
          }
        >
          {pairing.bodySample}
        </p>
      </div>

      <footer className={styles.foot}>
        <div className={styles.metaRow}>
          {pairing.tags.map((tag) => (
            <Chip key={tag} label={tag} tone="teal" />
          ))}
        </div>
        <span className={styles.tinyLabel}>Inline stack · zero FOUC</span>
      </footer>
    </article>
  )
}

export default TypographyPairingCard
