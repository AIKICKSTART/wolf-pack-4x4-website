"use client"

import { useState } from "react"

import { DealStageCard } from "./deal-stage-card"
import { STAGE_LABEL, type DealStage } from "./crm-types"
import styles from "./pipeline-kanban.module.css"

export interface PipelineDeal {
  id: string
  dealName: string
  customerName: string
  vehicle?: string
  value: string
  numericValue: number
  expectedClose: string
  expectedCloseIso?: string
  probability: number
  stage: DealStage
  ownerInitials?: string
}

interface PipelineKanbanProps {
  deals: ReadonlyArray<PipelineDeal>
  currency?: string
  className?: string
  onSelectStage?: (stage: DealStage) => void
}

const STAGE_ORDER: ReadonlyArray<DealStage> = [
  "new",
  "qualified",
  "quoted",
  "verbal",
  "won",
]

function formatTotal(amount: number, currency: string): string {
  if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(1)}k`
  }
  return `${currency}${amount.toFixed(0)}`
}

export function PipelineKanban({
  deals,
  currency = "$",
  className,
  onSelectStage,
}: PipelineKanbanProps) {
  const [activeStage, setActiveStage] = useState<DealStage | null>(null)
  const classes = [styles.board, className].filter(Boolean).join(" ")

  const handleStageClick = (stage: DealStage) => {
    const next = activeStage === stage ? null : stage
    setActiveStage(next)
    if (next) {
      onSelectStage?.(next)
    }
  }

  return (
    <div className={classes} aria-label="Deal pipeline">
      {STAGE_ORDER.map((stage) => {
        const stageDeals = deals.filter((deal) => deal.stage === stage)
        const total = stageDeals.reduce((sum, deal) => sum + deal.numericValue, 0)
        const isActive = activeStage === stage

        return (
          <section
            key={stage}
            className={styles.column}
            data-stage={stage}
            aria-current={isActive ? "true" : undefined}
            aria-label={`${STAGE_LABEL[stage]}: ${stageDeals.length} deals`}
          >
            <button
              type="button"
              className={styles.head}
              onClick={() => handleStageClick(stage)}
              aria-pressed={isActive}
            >
              <span className={styles.headTop}>
                <span className={styles.headDot} aria-hidden="true" />
                <span className={styles.stageName}>{STAGE_LABEL[stage]}</span>
                <span className={styles.count}>{stageDeals.length}</span>
              </span>
              <span className={styles.total}>{formatTotal(total, currency)}</span>
            </button>
            <ul className={styles.stack}>
              {stageDeals.map((deal) => (
                <li key={deal.id}>
                  <DealStageCard
                    id={deal.id}
                    dealName={deal.dealName}
                    customerName={deal.customerName}
                    vehicle={deal.vehicle}
                    value={deal.value}
                    expectedClose={deal.expectedClose}
                    expectedCloseIso={deal.expectedCloseIso}
                    probability={deal.probability}
                    stage={deal.stage}
                    ownerInitials={deal.ownerInitials}
                  />
                </li>
              ))}
              {stageDeals.length === 0 ? (
                <li className={styles.empty} aria-hidden="true">
                  No deals
                </li>
              ) : null}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export default PipelineKanban
