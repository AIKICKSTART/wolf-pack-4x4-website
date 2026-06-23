import { QuoteBubble } from "../primitives/quote-bubble"
import type { QuoteBubbleTone } from "../primitives/quote-bubble"

import {
  LICENSE_DESCRIPTION,
  LICENSE_LABEL,
  LICENSE_TONE,
  type AssetTone,
  type LicenseType,
} from "./asset-library-types"

import styles from "./license-chip.module.css"

interface LicenseChipProps {
  license: LicenseType
  /** Render the tooltip QuoteBubble next to the chip. Defaults to false. */
  showTooltip?: boolean
  className?: string
}

const TONE_CLASS: Record<AssetTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

const BUBBLE_TONE: Record<AssetTone, QuoteBubbleTone> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "teal",
  neutral: "obsidian",
}

export function LicenseChip({
  license,
  showTooltip = false,
  className,
}: LicenseChipProps) {
  const tone = LICENSE_TONE[license]
  const label = LICENSE_LABEL[license]
  const description = LICENSE_DESCRIPTION[license]
  const classes = [styles.chip, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <span className={styles.wrap}>
      <span className={classes} role="status" aria-label={`License: ${label}`}>
        <span className={styles.dot} aria-hidden="true" />
        {label}
      </span>
      {showTooltip ? (
        <QuoteBubble side="top" tone={BUBBLE_TONE[tone]}>
          {description}
        </QuoteBubble>
      ) : null}
    </span>
  )
}

export default LicenseChip
