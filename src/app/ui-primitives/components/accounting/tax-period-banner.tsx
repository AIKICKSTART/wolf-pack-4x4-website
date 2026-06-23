"use client"

import { Chip } from "../primitives/chip"

import {
  basStatusTone,
  daysUntil,
  formatAud,
  formatDateAu,
  type BasLodgementStatus,
  type PeriodRef,
} from "./accounting-types"
import styles from "./tax-period-banner.module.css"

export interface TaxPeriodBannerProps {
  /** Tax period being reported. */
  period: PeriodRef
  /** Lodgement due date. */
  dueDateISO: string
  /** Provisional amount owing for the period. */
  amountOwing: number
  status: BasLodgementStatus
  /** Render the CTA even when the parent has no client-side handler. */
  showFileNow?: boolean
  /** CTA — only rendered when handler provided. */
  onFileNow?: () => void
  className?: string
}

const STATUS_LABEL: Record<BasLodgementStatus, string> = {
  pending: "Not started",
  drafted: "Drafted",
  lodged: "Lodged",
  paid: "Paid",
}

export function TaxPeriodBanner({
  period,
  dueDateISO,
  amountOwing,
  status,
  showFileNow = false,
  onFileNow,
  className,
}: TaxPeriodBannerProps) {
  const days = daysUntil(dueDateISO)
  const paid = status === "paid"
  const lodged = status === "lodged" || paid
  const overdue = days < 0 && !lodged
  const statusTone = basStatusTone(status)
  const dueTone = overdue ? "red" : days < 7 ? "amber" : days < 30 ? "teal" : "neutral"

  const role = overdue ? "alert" : "region"
  const hasFileNowCta = !paid && (showFileNow || onFileNow)

  const countdown =
    days >= 0
      ? `${days} day${days === 1 ? "" : "s"} until lodgement`
      : `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`

  return (
    <section
      className={[styles.banner, className].filter(Boolean).join(" ")}
      data-tone={overdue ? "red" : paid ? "green" : "teal"}
      role={role}
      aria-label={`Tax period banner — ${period.label}`}
    >
      <div className={styles.left}>
        <span className={styles.kicker}>Tax period</span>
        <h3 className={styles.title}>{period.label}</h3>
        <span className={styles.range}>
          {formatDateAu(period.startISO)} → {formatDateAu(period.endISO)}
        </span>
      </div>

      <div className={styles.middle}>
        <Chip
          label={STATUS_LABEL[status]}
          tone={statusTone === "neutral" ? "neutral" : statusTone}
        />
        <Chip label={countdown} tone={dueTone === "neutral" ? "neutral" : dueTone} />
        <span className={styles.due}>
          Due {formatDateAu(dueDateISO)}
        </span>
      </div>

      <div className={styles.right}>
        <div className={styles.amount}>
          <span className={styles.amountLabel}>Provisional owing</span>
          <span className={styles.amountValue}>{formatAud(amountOwing)}</span>
        </div>
        {hasFileNowCta ? (
          <button
            type="button"
            className={styles.cta}
            onClick={() => onFileNow?.()}
            aria-label={lodged ? "Pay BAS now" : "File BAS now"}
          >
            {lodged ? "Pay now" : "File now"}
            <span aria-hidden="true">→</span>
          </button>
        ) : null}
      </div>
    </section>
  )
}

export default TaxPeriodBanner
