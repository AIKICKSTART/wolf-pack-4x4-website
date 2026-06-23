import type { ReactNode } from "react"

import styles from "./feature-gate-preview.module.css"

export interface FeatureGateAttribute {
  label: string
  value: string
}

export interface FeatureGatePreviewProps {
  flagName: string
  attributes: ReadonlyArray<FeatureGateAttribute>
  /** Variant the user would actually receive. */
  resolvedVariant: string
  /** Tone for the variant chip and accent. */
  variantTone?: "red" | "amber" | "teal" | "green" | "neutral"
  /** Reason the gate resolved to this variant. */
  reason?: string
  /** Mock content preview, e.g. a snippet of UI the user would see. */
  children?: ReactNode
  className?: string
}

const TONE_CLASS: Record<NonNullable<FeatureGatePreviewProps["variantTone"]>, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function FeatureGatePreview({
  flagName,
  attributes,
  resolvedVariant,
  variantTone = "teal",
  reason,
  children,
  className,
}: FeatureGatePreviewProps) {
  return (
    <article
      className={[styles.card, TONE_CLASS[variantTone], className]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Feature gate preview for ${flagName}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Feature gate preview</span>
        <h3 className={styles.flagName}>{flagName}</h3>
      </header>

      <dl className={styles.attributes}>
        {attributes.map((attr) => (
          <div key={attr.label} className={styles.attribute}>
            <dt className={styles.attrLabel}>{attr.label}</dt>
            <dd className={styles.attrValue}>{attr.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.resolution}>
        <span className={styles.resolutionLabel}>Resolves to</span>
        <span className={styles.variantChip}>{resolvedVariant}</span>
        {reason ? <span className={styles.reason}>{reason}</span> : null}
      </div>

      {children ? (
        <div className={styles.surface} aria-label="Mock surface preview">
          <span className={styles.surfaceHint}>You would see</span>
          <div className={styles.surfaceBody}>{children}</div>
        </div>
      ) : null}
    </article>
  )
}

export default FeatureGatePreview
