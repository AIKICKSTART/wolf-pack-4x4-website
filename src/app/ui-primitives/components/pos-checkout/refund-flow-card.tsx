"use client"

import type { RefundMethod, RefundStep } from "./pos-checkout-types"
import styles from "./refund-flow-card.module.css"

export interface RefundCandidateItem {
  /** Stable id. */
  id: string
  /** Receipt line title. */
  title: string
  /** SKU. */
  sku: string
  /** Line total inc GST in AUD. */
  amount: number
}

interface RefundFlowCardProps {
  /** Receipt the refund is anchored to. */
  receiptNumber: string
  /** Items refundable from this receipt. */
  items: ReadonlyArray<RefundCandidateItem>
  /** Item ids currently selected. */
  selectedItemIds: ReadonlyArray<string>
  /** Available reason chips. */
  reasons: ReadonlyArray<string>
  /** Selected reason. */
  reason: string | null
  /** Selected refund method. */
  method: RefundMethod | null
  /** Current step. */
  step: RefundStep
  /** Fires when an item selection toggles. */
  onToggleItem?: (id: string) => void
  /** Fires when a reason is selected. */
  onReasonSelect?: (reason: string) => void
  /** Fires when a method is selected. */
  onMethodSelect?: (method: RefundMethod) => void
  /** Fires when the operator moves forward. */
  onNext?: () => void
  /** Fires when the operator moves backward. */
  onBack?: () => void
  /** Fires when the operator confirms the refund. */
  onConfirm?: () => void
}

const STEP_ORDER: ReadonlyArray<RefundStep> = [
  "select-items",
  "reason",
  "method",
  "confirm",
]

const STEP_LABEL: Record<RefundStep, string> = {
  "select-items": "01 · Items",
  reason: "02 · Reason",
  method: "03 · Method",
  confirm: "04 · Confirm",
}

const METHOD_LABEL: Record<RefundMethod, string> = {
  card: "Refund to card",
  cash: "Cash refund",
  "store-credit": "Store credit",
}

const METHODS: ReadonlyArray<RefundMethod> = ["card", "cash", "store-credit"]

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function indicatorClass(step: RefundStep, current: RefundStep): string {
  const stepIndex = STEP_ORDER.indexOf(step)
  const currentIndex = STEP_ORDER.indexOf(current)
  if (stepIndex < currentIndex) return styles.stepIndicatorDone
  if (stepIndex === currentIndex) return styles.stepIndicatorActive
  return ""
}

export function RefundFlowCard({
  receiptNumber,
  items,
  selectedItemIds,
  reasons,
  reason,
  method,
  step,
  onToggleItem,
  onReasonSelect,
  onMethodSelect,
  onNext,
  onBack,
  onConfirm,
}: RefundFlowCardProps) {
  const refundTotal = items
    .filter((item) => selectedItemIds.includes(item.id))
    .reduce((acc, item) => acc + item.amount, 0)

  const currentIndex = STEP_ORDER.indexOf(step)
  const canGoNext =
    (step === "select-items" && selectedItemIds.length > 0) ||
    (step === "reason" && reason !== null) ||
    (step === "method" && method !== null)
  const canGoBack = currentIndex > 0
  const isConfirm = step === "confirm"

  return (
    <section className={styles.card} aria-label={`Refund for ${receiptNumber}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Refund · {receiptNumber}</span>
        <h2 className={styles.title}>{STEP_LABEL[step]}</h2>
      </header>

      <ol className={styles.steps} aria-label="Refund steps">
        {STEP_ORDER.map((token) => (
          <li
            key={token}
            className={`${styles.stepIndicator} ${indicatorClass(token, step)}`}
            aria-current={token === step ? "step" : undefined}
          >
            {STEP_LABEL[token]}
          </li>
        ))}
      </ol>

      <div className={styles.stepBody}>
        {step === "select-items" && (
          <>
            <h3 className={styles.bodyTitle}>Choose lines to refund</h3>
            <ul className={styles.itemList} role="list">
              {items.map((item) => {
                const selected = selectedItemIds.includes(item.id)
                return (
                  <li key={item.id} className={styles.item}>
                    <label className={styles.itemCheckbox}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => onToggleItem?.(item.id)}
                        aria-label={`Refund ${item.title}`}
                      />
                      <span>
                        <strong>{item.title}</strong>
                        <span className={styles.itemMeta}> · SKU {item.sku}</span>
                      </span>
                    </label>
                    <span className={styles.itemPrice}>{formatAud(item.amount)}</span>
                  </li>
                )
              })}
            </ul>
          </>
        )}

        {step === "reason" && (
          <>
            <h3 className={styles.bodyTitle}>Reason for refund</h3>
            <div className={styles.reasonGroup}>
              {reasons.map((token) => {
                const selected = reason === token
                return (
                  <button
                    key={token}
                    type="button"
                    className={`${styles.stepIndicator}${
                      selected ? ` ${styles.stepIndicatorActive}` : ""
                    }`}
                    aria-pressed={selected}
                    onClick={() => onReasonSelect?.(token)}
                  >
                    {token}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {step === "method" && (
          <>
            <h3 className={styles.bodyTitle}>Refund destination</h3>
            <div className={styles.methodGroup} role="radiogroup" aria-label="Refund method">
              {METHODS.map((token) => {
                const selected = method === token
                return (
                  <label
                    key={token}
                    className={`${styles.methodOption}${
                      selected ? ` ${styles.methodOptionActive}` : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`pos-refund-method-${receiptNumber}`}
                      value={token}
                      checked={selected}
                      onChange={() => onMethodSelect?.(token)}
                    />
                    <span>{METHOD_LABEL[token]}</span>
                  </label>
                )
              })}
            </div>
          </>
        )}

        {step === "confirm" && (
          <div className={styles.confirm} role="status">
            <span className={styles.confirmLabel}>Refund total</span>
            <span className={styles.confirmValue}>{formatAud(refundTotal)}</span>
            <span className={styles.confirmMeta}>
              {selectedItemIds.length} line(s) · {reason ?? "no reason"} ·{" "}
              {method ? METHOD_LABEL[method] : "no method"}
            </span>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnBack}`}
          onClick={() => onBack?.()}
          disabled={!canGoBack}
        >
          Back
        </button>
        {isConfirm ? (
          <button
            type="button"
            className={`${styles.btn} ${styles.btnConfirm}`}
            onClick={() => onConfirm?.()}
            disabled={!reason || !method || selectedItemIds.length === 0}
          >
            Confirm refund
          </button>
        ) : (
          <button
            type="button"
            className={`${styles.btn} ${styles.btnNext}`}
            onClick={() => onNext?.()}
            disabled={!canGoNext}
          >
            Continue
          </button>
        )}
      </div>
    </section>
  )
}

export default RefundFlowCard
