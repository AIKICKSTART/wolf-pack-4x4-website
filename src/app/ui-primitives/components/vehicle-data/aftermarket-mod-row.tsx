import { Wrench, ChevronRight } from "lucide-react"
import Link from "next/link"

import { Chip } from "../primitives/chip"

import {
  MOD_CATEGORY_LABEL,
  MOD_LEGALITY_LABEL,
  MOD_LEGALITY_TONE,
  formatAud,
  type ModCategory,
  type ModLegality,
} from "./vehicle-data-types"
import styles from "./aftermarket-mod-row.module.css"

interface AftermarketModRowProps {
  /** Mod label (e.g. "3-inch turbo-back exhaust"). */
  label: string
  /** Manufacturer + part code (e.g. "Manta MKTY0186"). */
  partReference: string
  category: ModCategory
  legality: ModLegality
  /** Power gain claimed by the supplier (kW or %, freeform string). */
  claimedGain?: string
  /** Installed AUD cost (parts + labour). */
  installedAud?: number
  /** Optional engineer certificate / approval reference (NSW VSI). */
  certificateRef?: string
  /** Link to the workshop's install brief. */
  briefHref?: string
  className?: string
}

export function AftermarketModRow({
  label,
  partReference,
  category,
  legality,
  claimedGain,
  installedAud,
  certificateRef,
  briefHref,
  className,
}: AftermarketModRowProps) {
  const classes = [styles.row, styles[`legality-${legality}`], className]
    .filter(Boolean)
    .join(" ")

  return (
    <tr className={classes}>
      <th scope="row" className={styles.modCell}>
        <span className={styles.glyph} aria-hidden="true">
          <Wrench size={14} strokeWidth={2.2} />
        </span>
        <span className={styles.modBody}>
          <strong>{label}</strong>
          <span className={styles.modRef}>
            {MOD_CATEGORY_LABEL[category]} · {partReference}
          </span>
        </span>
      </th>
      <td className={styles.gainCell}>
        {claimedGain ? (
          <span className={styles.gainBadge}>{claimedGain}</span>
        ) : (
          <span className={styles.empty}>—</span>
        )}
      </td>
      <td className={styles.costCell}>
        {installedAud != null ? formatAud(installedAud) : "—"}
      </td>
      <td className={styles.legalityCell}>
        <Chip
          label={MOD_LEGALITY_LABEL[legality]}
          tone={MOD_LEGALITY_TONE[legality]}
        />
        {certificateRef ? (
          <span className={styles.certRef}>{certificateRef}</span>
        ) : null}
      </td>
      <td className={styles.actionCell}>
        {briefHref ? (
          <Link href={briefHref} className={styles.briefLink}>
            <span>Install brief</span>
            <ChevronRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        ) : (
          <span className={styles.empty}>No brief</span>
        )}
      </td>
    </tr>
  )
}

export default AftermarketModRow
