import { FeatureSpotlight, type FeatureSpotlightBullet } from "../marketing/feature-spotlight"

import styles from "./adr-education-snippet.module.css"

interface AdrEducationSnippetProps {
  /** Kicker shown above the heading, default "ADR · plain English". */
  kicker?: string
  /** Heading e.g. "What ADR means for your build". */
  heading: string
  /** Body copy explaining ADR + customer responsibilities. */
  body: string
  /** Rule chip bullets, max ~4 looks best. */
  bullets: ReadonlyArray<FeatureSpotlightBullet>
  /** Optional further reading link. */
  furtherReading?: { label: string; href: string }
  /** When true, mirror the spotlight layout. */
  reversed?: boolean
  className?: string
}

export function AdrEducationSnippet({
  kicker = "ADR · plain English",
  heading,
  body,
  bullets,
  furtherReading,
  reversed = false,
  className,
}: AdrEducationSnippetProps) {
  return (
    <FeatureSpotlight
      kicker={kicker}
      heading={heading}
      body={body}
      bullets={bullets}
      action={furtherReading}
      reversed={reversed}
      className={className}
      visual={
        <div className={styles.visual}>
          <div className={styles.glyph}>
            <span className={styles.glyphMark}>ADR</span>
            <span className={styles.glyphLabel}>Design rules</span>
          </div>
        </div>
      }
    />
  )
}

export default AdrEducationSnippet
