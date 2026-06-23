import {
  formatMoney,
  type MoneyAmount,
} from "./billing-types"
import styles from "./proration-preview.module.css"

interface ProrationPreviewProps {
  fromPlanName: string
  toPlanName: string
  effectiveISO: string
  unusedCredit: MoneyAmount
  newCharge: MoneyAmount
  /** If true, signals an aria-live update (use for state changes). */
  liveUpdate?: boolean
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function ProrationPreview({
  fromPlanName,
  toPlanName,
  effectiveISO,
  unusedCredit,
  newCharge,
  liveUpdate = true,
}: ProrationPreviewProps) {
  const netValue = newCharge.value - unusedCredit.value
  const net: MoneyAmount = {
    value: Math.max(0, netValue),
    currency: newCharge.currency,
  }
  const isCredit = netValue < 0
  const creditMoney: MoneyAmount = {
    value: Math.abs(netValue),
    currency: newCharge.currency,
  }

  return (
    <section
      className={styles.preview}
      role="status"
      aria-live={liveUpdate ? "polite" : "off"}
      aria-label="Proration preview"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Proration preview</span>
        <h3 className={styles.title}>
          {fromPlanName} <span aria-hidden="true">→</span> {toPlanName}
        </h3>
        <span className={styles.effective}>Effective {formatDate(effectiveISO)}</span>
      </header>

      <dl className={styles.lines}>
        <div className={styles.line}>
          <dt>Unused credit from {fromPlanName}</dt>
          <dd className={styles.credit}>− {formatMoney(unusedCredit)}</dd>
        </div>
        <div className={styles.line}>
          <dt>Charge for new {toPlanName} cycle</dt>
          <dd className={styles.charge}>+ {formatMoney(newCharge)}</dd>
        </div>
        <div className={`${styles.line} ${styles.lineNet}`}>
          <dt>{isCredit ? "Credit added to your account" : "Due today"}</dt>
          <dd className={styles.net}>{formatMoney(isCredit ? creditMoney : net)}</dd>
        </div>
      </dl>

      <p className={styles.note}>
        Pro-rated. You will be charged for the new plan on a daily basis from the effective date.
      </p>
    </section>
  )
}

export default ProrationPreview
