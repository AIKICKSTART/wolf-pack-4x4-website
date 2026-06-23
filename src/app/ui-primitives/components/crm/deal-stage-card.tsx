import { STAGE_LABEL, type DealStage } from "./crm-types"
import styles from "./deal-stage-card.module.css"

interface DealStageCardProps {
  id: string
  dealName: string
  customerName: string
  value: string
  expectedClose: string
  expectedCloseIso?: string
  probability: number
  stage: DealStage
  ownerInitials?: string
  vehicle?: string
  className?: string
}

export function DealStageCard({
  id,
  dealName,
  customerName,
  value,
  expectedClose,
  expectedCloseIso,
  probability,
  stage,
  ownerInitials,
  vehicle,
  className,
}: DealStageCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const safeProbability = Math.max(0, Math.min(100, Math.round(probability)))

  return (
    <article
      className={classes}
      data-deal-id={id}
      data-stage={stage}
      aria-label={`Deal: ${dealName}, ${STAGE_LABEL[stage]}, ${safeProbability}%`}
    >
      <header className={styles.head}>
        <span className={styles.stageDot} aria-hidden="true" />
        <span className={styles.stageLabel}>{STAGE_LABEL[stage]}</span>
        <span className={styles.probability}>{safeProbability}%</span>
      </header>

      <h4 className={styles.title}>{dealName}</h4>
      <p className={styles.customer}>{customerName}</p>
      {vehicle ? <p className={styles.vehicle}>{vehicle}</p> : null}

      <dl className={styles.meta}>
        <div>
          <dt>Value</dt>
          <dd className={styles.value}>{value}</dd>
        </div>
        <div>
          <dt>Close</dt>
          <dd>
            <time dateTime={expectedCloseIso ?? expectedClose}>{expectedClose}</time>
          </dd>
        </div>
      </dl>

      {ownerInitials ? (
        <span className={styles.owner} aria-label={`Owned by ${ownerInitials}`}>
          {ownerInitials}
        </span>
      ) : null}
    </article>
  )
}

export default DealStageCard
