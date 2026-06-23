import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import {
  formatAud,
  formatDateAu,
  type DepreciationMethod,
} from "./accounting-types"
import styles from "./fixed-asset-depreciation-row.module.css"

export interface FixedAssetDepreciationRowProps {
  assetCode: string
  assetName: string
  /** Asset class for the chip, e.g. "Plant & equipment". */
  assetClass: string
  acquisitionDateISO: string
  /** Acquisition cost in AUD. */
  acquisitionCost: number
  /** Useful life in years. */
  usefulLifeYears: number
  method: DepreciationMethod
  /** Accumulated depreciation to date. */
  accumulatedDepreciation: number
  /** Optional location / department. */
  location?: string
  className?: string
}

const METHOD_LABEL: Record<DepreciationMethod, string> = {
  straight_line: "Straight line",
  diminishing_value: "Diminishing value",
  units_of_use: "Units of use",
}

export function FixedAssetDepreciationRow({
  assetCode,
  assetName,
  assetClass,
  acquisitionDateISO,
  acquisitionCost,
  usefulLifeYears,
  method,
  accumulatedDepreciation,
  location,
  className,
}: FixedAssetDepreciationRowProps) {
  const bookValue = Math.max(0, acquisitionCost - accumulatedDepreciation)
  const consumedPct =
    acquisitionCost > 0
      ? Math.min(100, Math.round((accumulatedDepreciation / acquisitionCost) * 100))
      : 0
  const annualDepreciation = method === "straight_line" && usefulLifeYears > 0
    ? acquisitionCost / usefulLifeYears
    : null

  const lifeTone = consumedPct >= 80 ? "red" : consumedPct >= 50 ? "amber" : "teal"

  return (
    <article
      className={[styles.row, className].filter(Boolean).join(" ")}
      aria-label={`Fixed asset ${assetName} book value ${formatAud(bookValue)}`}
    >
      <div className={styles.identCell}>
        <span className={styles.assetCode}>{assetCode}</span>
        <span className={styles.assetName}>{assetName}</span>
        <span className={styles.meta}>
          {assetClass}
          {location ? ` · ${location}` : ""}
        </span>
      </div>

      <div className={styles.acqCell}>
        <span className={styles.label}>Acquired</span>
        <span className={styles.value}>{formatDateAu(acquisitionDateISO)}</span>
        <span className={styles.subValue}>{formatAud(acquisitionCost)}</span>
      </div>

      <div className={styles.lifeCell}>
        <span className={styles.label}>Method · life</span>
        <Chip label={METHOD_LABEL[method]} tone="teal" />
        <span className={styles.subValue}>{usefulLifeYears} years</span>
      </div>

      <div className={styles.depCell}>
        <span className={styles.label}>Accumulated</span>
        <span className={styles.depValue}>−{formatAud(accumulatedDepreciation)}</span>
        {annualDepreciation !== null ? (
          <span className={styles.subValue}>
            {formatAud(annualDepreciation)} / yr
          </span>
        ) : null}
        <ProgressLinear
          value={consumedPct}
          max={100}
          tone={lifeTone}
          variant="solid"
          showLabel
          label="Consumed"
        />
      </div>

      <div className={styles.bookCell}>
        <span className={styles.label}>Book value</span>
        <span className={styles.bookValue}>{formatAud(bookValue)}</span>
        <span className={styles.subValue}>
          {Math.round((bookValue / Math.max(acquisitionCost, 1)) * 100)}% remaining
        </span>
      </div>
    </article>
  )
}

export default FixedAssetDepreciationRow
