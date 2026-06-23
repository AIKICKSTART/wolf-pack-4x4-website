import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"

import {
  AU_GST_RATE,
  basStatusTone,
  daysUntil,
  formatAud,
  formatDateAu,
  type BasLodgementStatus,
  type PeriodRef,
} from "./accounting-types"
import styles from "./bas-summary-card.module.css"

export interface BasSummaryCardProps {
  abn: string
  /** Reporting period (quarter). */
  period: PeriodRef
  /** Lodgement due date. */
  dueDateISO: string
  /** GST collected on sales (1A). */
  gstCollected: number
  /** GST paid on purchases (1B). */
  gstPaid: number
  /** PAYG tax withheld from wages (W2). */
  paygWithholding: number
  /** Optional PAYG instalment (5A). */
  paygInstalment?: number
  status: BasLodgementStatus
  className?: string
}

const STATUS_LABEL: Record<BasLodgementStatus, string> = {
  pending: "Not started",
  drafted: "Drafted",
  lodged: "Lodged",
  paid: "Paid",
}

export function BasSummaryCard({
  abn,
  period,
  dueDateISO,
  gstCollected,
  gstPaid,
  paygWithholding,
  paygInstalment = 0,
  status,
  className,
}: BasSummaryCardProps) {
  const netGst = gstCollected - gstPaid
  const totalOwing = netGst + paygWithholding + paygInstalment
  const days = daysUntil(dueDateISO)
  const overdue = days < 0 && status !== "lodged" && status !== "paid"
  const dueChipTone =
    overdue ? "red" : days < 7 ? "amber" : "teal"
  const statusTone = basStatusTone(status)
  const progressValue = Math.min(100, Math.max(0, 100 - Math.abs(days)))

  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`BAS summary for ${period.label}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>BAS · {period.label}</span>
          <h3 className={styles.title}>Business activity statement</h3>
          <span className={styles.abn}>ABN {abn}</span>
        </div>
        <div className={styles.headRight}>
          <Chip
            label={STATUS_LABEL[status]}
            tone={statusTone === "neutral" ? "neutral" : statusTone}
          />
          <Chip
            label={overdue ? `Overdue ${Math.abs(days)}d` : `Due in ${days}d`}
            tone={dueChipTone}
          />
        </div>
      </header>

      {overdue ? (
        <p className={styles.alert} role="alert">
          Lodgement was due {formatDateAu(dueDateISO)} — overdue by {Math.abs(days)} day{Math.abs(days) === 1 ? "" : "s"}.
        </p>
      ) : null}

      <dl className={styles.grid}>
        <div className={styles.cell}>
          <dt>GST collected (1A)</dt>
          <dd>{formatAud(gstCollected)}</dd>
        </div>
        <div className={styles.cell}>
          <dt>GST paid (1B)</dt>
          <dd>−{formatAud(gstPaid)}</dd>
        </div>
        <div className={`${styles.cell} ${netGst >= 0 ? styles.cellOwed : styles.cellRefund}`}>
          <dt>Net GST</dt>
          <dd>{formatAud(netGst)}</dd>
        </div>
        <div className={styles.cell}>
          <dt>PAYG withheld (W2)</dt>
          <dd>{formatAud(paygWithholding)}</dd>
        </div>
        {paygInstalment > 0 ? (
          <div className={styles.cell}>
            <dt>PAYG instalment (5A)</dt>
            <dd>{formatAud(paygInstalment)}</dd>
          </div>
        ) : null}
        <div className={`${styles.cell} ${styles.cellTotal}`}>
          <dt>Total owing</dt>
          <dd>{formatAud(totalOwing)}</dd>
        </div>
      </dl>

      <div className={styles.meta}>
        <span className={styles.metaLabel}>
          GST rate {Math.round(AU_GST_RATE * 100)}% · Due {formatDateAu(dueDateISO)}
        </span>
        <ProgressLinear
          value={progressValue}
          max={100}
          tone={overdue ? "red" : "teal"}
          variant="solid"
        />
      </div>
    </article>
  )
}

export default BasSummaryCard
