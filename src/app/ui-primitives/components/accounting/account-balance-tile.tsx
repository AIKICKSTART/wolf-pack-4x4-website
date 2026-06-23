import { Chip } from "../primitives/chip"
import { Sparkline } from "../charts/sparkline"

import {
  classificationLabel,
  formatAud,
  formatAudCompact,
  normalBalanceOf,
  type AccountClass,
} from "./accounting-types"
import styles from "./account-balance-tile.module.css"

export interface AccountBalanceTileProps {
  /** Account code, e.g. "1000". */
  code: string
  /** Friendly account name. */
  name: string
  classification: AccountClass
  /** Current balance in AUD. Sign indicates contra-side. */
  balance: number
  /** 12-period trend used by the sparkline. */
  trend: ReadonlyArray<number>
  /** Optional percentage change vs prior period. */
  changePct?: number
  className?: string
}

const TONE_BY_CLASS: Record<AccountClass, "teal" | "red" | "amber" | "green" | "neutral"> = {
  asset: "teal",
  liability: "red",
  equity: "amber",
  income: "green",
  expense: "neutral",
}

const SPARK_TONE: Record<AccountClass, "teal" | "red" | "amber" | "green"> = {
  asset: "teal",
  liability: "red",
  equity: "amber",
  income: "green",
  expense: "amber",
}

export function AccountBalanceTile({
  code,
  name,
  classification,
  balance,
  trend,
  changePct,
  className,
}: AccountBalanceTileProps) {
  const normal = normalBalanceOf(classification)
  const tone = TONE_BY_CLASS[classification]
  const sparkTone = SPARK_TONE[classification]
  const direction = changePct === undefined ? "flat" : changePct > 0 ? "up" : changePct < 0 ? "down" : "flat"

  return (
    <article
      className={[styles.tile, className].filter(Boolean).join(" ")}
      data-tone={tone}
      aria-label={`${name} balance ${formatAud(balance)}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.code}>{code}</span>
          <Chip
            label={`${classificationLabel(classification)} · Dr/${normal === "debit" ? "Dr" : "Cr"}`}
            tone={tone === "neutral" ? "neutral" : tone}
          />
        </div>
        {changePct !== undefined ? (
          <span className={`${styles.delta} ${styles[`delta_${direction}`]}`}>
            {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}
            <span>{Math.abs(changePct).toFixed(1)}%</span>
          </span>
        ) : null}
      </header>

      <h4 className={styles.name}>{name}</h4>

      <div className={styles.balance}>
        <span className={styles.balanceValue}>{formatAud(balance)}</span>
        <span className={styles.balanceCompact}>{formatAudCompact(balance)} on hand</span>
      </div>

      <div className={styles.spark}>
        <Sparkline
          points={[...trend]}
          tone={sparkTone}
          ariaLabel={`${name} balance trend over ${trend.length} periods`}
        />
      </div>
    </article>
  )
}

export default AccountBalanceTile
