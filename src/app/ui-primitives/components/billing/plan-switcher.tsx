"use client"

import { useState } from "react"

import {
  formatMoney,
  type BillingInterval,
  type MoneyAmount,
} from "./billing-types"
import styles from "./plan-switcher.module.css"

export interface PlanFeatureRow {
  label: string
  /** Whether this feature is included per plan id. */
  byPlan: Record<string, boolean | string>
}

export interface PlanOption {
  id: string
  name: string
  tagline: string
  monthly: MoneyAmount
  annual: MoneyAmount
  perUnitNote?: string
}

interface PlanSwitcherProps {
  plans: ReadonlyArray<PlanOption>
  currentPlanId: string
  features: ReadonlyArray<PlanFeatureRow>
  defaultInterval?: BillingInterval
  onChangePlan?: (planId: string, interval: BillingInterval) => void
}

function getDisplayAmount(plan: PlanOption, interval: BillingInterval): MoneyAmount {
  return interval === "annual" ? plan.annual : plan.monthly
}

function renderInclusion(value: boolean | string): React.ReactNode {
  if (value === true) {
    return <span aria-label="Included">✓</span>
  }
  if (value === false) {
    return <span aria-label="Not included" className={styles.featureMissing}>—</span>
  }
  return <span>{value}</span>
}

export function PlanSwitcher({
  plans,
  currentPlanId,
  features,
  defaultInterval = "monthly",
  onChangePlan,
}: PlanSwitcherProps) {
  const [interval, setInterval] = useState<BillingInterval>(defaultInterval)

  return (
    <section className={styles.switcher} aria-label="Plan switcher">
      <header className={styles.head}>
        <div className={styles.headText}>
          <span className={styles.kicker}>Choose plan</span>
          <h3 className={styles.title}>Workshop subscription tiers</h3>
        </div>
        <div className={styles.intervalToggle} role="radiogroup" aria-label="Billing interval">
          {(["monthly", "annual"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={interval === opt}
              className={`${styles.intervalBtn} ${interval === opt ? styles.intervalActive : ""}`}
              onClick={() => setInterval(opt)}
            >
              {opt === "monthly" ? "Monthly" : "Annual −17%"}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.grid}>
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId
          return (
            <article
              key={plan.id}
              className={`${styles.plan} ${isCurrent ? styles.planCurrent : ""}`}
            >
              {isCurrent ? <span className={styles.currentBadge}>Current plan</span> : null}
              <header className={styles.planHead}>
                <h4 className={styles.planName}>{plan.name}</h4>
                <p className={styles.planTagline}>{plan.tagline}</p>
              </header>
              <p className={styles.planPrice}>
                <span className={styles.planAmount}>
                  {formatMoney(getDisplayAmount(plan, interval))}
                </span>
                <span className={styles.planInterval}>
                  {interval === "annual" ? "/yr" : "/mo"}
                </span>
              </p>
              {plan.perUnitNote ? <span className={styles.planNote}>{plan.perUnitNote}</span> : null}
              <button
                type="button"
                className={isCurrent ? styles.planCtaCurrent : styles.planCta}
                disabled={isCurrent}
                onClick={() => onChangePlan?.(plan.id, interval)}
              >
                {isCurrent ? "On this plan" : `Switch to ${plan.name}`}
              </button>
            </article>
          )
        })}
      </div>

      <table className={styles.matrix}>
        <caption className={styles.matrixCaption}>Feature comparison</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.matrixFeature}>Feature</th>
            {plans.map((plan) => (
              <th key={plan.id} scope="col" className={styles.matrixPlanHead}>
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((row) => (
            <tr key={row.label}>
              <th scope="row" className={styles.matrixRowHead}>{row.label}</th>
              {plans.map((plan) => (
                <td key={plan.id} className={styles.matrixCell}>
                  {renderInclusion(row.byPlan[plan.id] ?? false)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default PlanSwitcher
