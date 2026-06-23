"use client"

import { Chip } from "../primitives/chip"
import { ProgressLinear, type ProgressLinearTone } from "../primitives/progress-linear"
import { FadeIn } from "../motion/fade-in"

import {
  formatAud,
  formatAudCompact,
  formatPctSigned,
  type BudgetState,
} from "./cloud-costs-types"
import styles from "./budget-alert-banner.module.css"

export interface BudgetAlertBannerProps {
  /** Budget name e.g. "Production AWS spend". */
  budgetName: string
  /** Period label e.g. "May 2026". */
  periodLabel: string
  /** Budget amount in AUD. */
  budget: number
  /** Actual spend so far in AUD. */
  actual: number
  /** Forecast end-of-period spend in AUD. */
  forecast: number
  /** Threshold percentage that triggered the alert (e.g. 80 or 100). */
  thresholdPct: number
  /** State of the budget. */
  state: BudgetState
  /** Optional CTA to view details. */
  onViewDetails?: () => void
  /** Optional CTA to dismiss the banner. */
  onDismiss?: () => void
  className?: string
}

function bannerTone(state: BudgetState): ProgressLinearTone {
  switch (state) {
    case "ok":
      return "green"
    case "approaching":
      return "amber"
    case "exceeded":
      return "red"
  }
}

export function BudgetAlertBanner({
  budgetName,
  periodLabel,
  budget,
  actual,
  forecast,
  thresholdPct,
  state,
  onViewDetails,
  onDismiss,
  className,
}: BudgetAlertBannerProps) {
  const usedPct = budget > 0 ? Math.min(100, Math.round((actual / budget) * 100)) : 0
  const forecastDeltaPct = budget > 0 ? ((forecast - budget) / budget) * 100 : 0
  const tone = bannerTone(state)
  const title =
    state === "exceeded"
      ? `${budgetName} exceeded`
      : state === "approaching"
        ? `${budgetName} approaching cap`
        : `${budgetName} on track`
  const subtitle =
    state === "exceeded"
      ? `Forecast end-of-period ${formatAudCompact(forecast)} is ${formatPctSigned(forecastDeltaPct)} above the ${formatAudCompact(budget)} cap.`
      : state === "approaching"
        ? `${usedPct}% of the ${formatAudCompact(budget)} cap used — threshold ${thresholdPct}% crossed.`
        : `${usedPct}% of the ${formatAudCompact(budget)} cap used. Forecast ${formatAudCompact(forecast)}.`

  return (
    <FadeIn>
      <section
        className={[styles.banner, styles[`tone-${tone}`], className].filter(Boolean).join(" ")}
        role="status"
        aria-live="polite"
        aria-label={`${budgetName} budget alert`}
      >
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <span className={styles.icon} aria-hidden="true" data-tone={tone}>
              {state === "exceeded" ? "!" : state === "approaching" ? "▲" : "✓"}
            </span>
            <div className={styles.titleStack}>
              <span className={styles.kicker}>
                {periodLabel} · Threshold {thresholdPct}%
              </span>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            <Chip
              label={
                state === "exceeded"
                  ? `Δ ${formatPctSigned(forecastDeltaPct)}`
                  : `${usedPct}% used`
              }
              tone={tone}
            />
          </div>

          <div className={styles.meterRow}>
            <span className={styles.meterLabel}>Actual {formatAud(actual)}</span>
            <ProgressLinear value={usedPct} max={100} tone={tone} variant="segmented" />
            <span className={styles.meterLabelRight}>Cap {formatAud(budget)}</span>
          </div>
        </div>

        {onViewDetails || onDismiss ? (
          <footer className={styles.actions}>
            {onViewDetails ? (
              <button
                type="button"
                className={styles.actionPrimary}
                onClick={onViewDetails}
              >
                View details
              </button>
            ) : null}
            {onDismiss ? (
              <button type="button" className={styles.actionGhost} onClick={onDismiss}>
                Dismiss
              </button>
            ) : null}
          </footer>
        ) : null}
      </section>
    </FadeIn>
  )
}

export default BudgetAlertBanner
