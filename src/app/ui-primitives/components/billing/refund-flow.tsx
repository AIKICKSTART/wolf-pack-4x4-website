"use client"

import { useId, useState } from "react"

import {
  formatMoney,
  type MoneyAmount,
  type RefundReason,
} from "./billing-types"
import styles from "./refund-flow.module.css"

export interface RefundableInvoice {
  id: string
  invoiceNumber: string
  customerName: string
  paidISO: string
  amount: MoneyAmount
  refundedAmount?: MoneyAmount
}

interface RefundFlowProps {
  invoices: ReadonlyArray<RefundableInvoice>
  onConfirm?: (form: RefundConfirmation) => void
}

export interface RefundConfirmation {
  invoiceId: string
  refundType: "full" | "partial"
  amount: MoneyAmount
  reason: RefundReason
  note: string
}

const REASON_LABEL: Record<RefundReason, string> = {
  duplicate: "Duplicate charge",
  fraudulent: "Fraudulent",
  requested_by_customer: "Requested by customer",
  service_not_delivered: "Service not delivered",
  other: "Other",
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

export function RefundFlow({ invoices, onConfirm }: RefundFlowProps) {
  const amountId = useId()
  const reasonId = useId()
  const noteId = useId()

  const [step, setStep] = useState<1 | 2>(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [refundType, setRefundType] = useState<"full" | "partial">("full")
  const [partialValue, setPartialValue] = useState<string>("")
  const [reason, setReason] = useState<RefundReason>("requested_by_customer")
  const [note, setNote] = useState("")

  const selectedInvoice = invoices.find((i) => i.id === selectedId)

  const handleNext = () => {
    if (selectedId) setStep(2)
  }

  const handleConfirm = () => {
    if (!selectedInvoice) return
    const amount: MoneyAmount = refundType === "full"
      ? selectedInvoice.amount
      : {
          value: Math.min(parseFloat(partialValue) || 0, selectedInvoice.amount.value),
          currency: selectedInvoice.amount.currency,
        }
    onConfirm?.({
      invoiceId: selectedInvoice.id,
      refundType,
      amount,
      reason,
      note,
    })
  }

  return (
    <section className={styles.flow} aria-label="Refund flow">
      <ol className={styles.steps} aria-label="Refund steps">
        <li className={step === 1 ? styles.stepActive : styles.stepDone}>
          <span className={styles.stepNum}>01</span>
          <span className={styles.stepLabel}>Choose invoice</span>
        </li>
        <li className={step === 2 ? styles.stepActive : styles.step}>
          <span className={styles.stepNum}>02</span>
          <span className={styles.stepLabel}>Choose amount</span>
        </li>
      </ol>

      {step === 1 ? (
        <div className={styles.list}>
          {invoices.map((inv) => (
            <button
              key={inv.id}
              type="button"
              className={`${styles.invoiceRow} ${selectedId === inv.id ? styles.invoiceSelected : ""}`}
              onClick={() => setSelectedId(inv.id)}
              aria-pressed={selectedId === inv.id}
            >
              <span className={styles.invoiceNum}>{inv.invoiceNumber}</span>
              <span className={styles.invoiceCustomer}>{inv.customerName}</span>
              <span className={styles.invoiceDate}>{formatDate(inv.paidISO)}</span>
              <span className={styles.invoiceAmount}>{formatMoney(inv.amount)}</span>
            </button>
          ))}
          <footer className={styles.footer}>
            <button
              type="button"
              className={styles.primaryBtn}
              disabled={!selectedId}
              onClick={handleNext}
            >
              Next
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.detail}>
          {selectedInvoice ? (
            <div className={styles.summary}>
              <span className={styles.summaryLabel}>Refunding</span>
              <span className={styles.summaryInvoice}>{selectedInvoice.invoiceNumber}</span>
              <span className={styles.summaryAmount}>{formatMoney(selectedInvoice.amount)}</span>
            </div>
          ) : null}

          <div className={styles.typeToggle} role="radiogroup" aria-label="Refund amount">
            <button
              type="button"
              role="radio"
              aria-checked={refundType === "full"}
              className={`${styles.typeBtn} ${refundType === "full" ? styles.typeBtnActive : ""}`}
              onClick={() => setRefundType("full")}
            >
              Full refund
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={refundType === "partial"}
              className={`${styles.typeBtn} ${refundType === "partial" ? styles.typeBtnActive : ""}`}
              onClick={() => setRefundType("partial")}
            >
              Partial refund
            </button>
          </div>

          {refundType === "partial" ? (
            <label className={styles.field} htmlFor={amountId}>
              <span className={styles.fieldLabel}>Refund amount (AUD)</span>
              <input
                id={amountId}
                className={styles.input}
                inputMode="decimal"
                placeholder="0.00"
                value={partialValue}
                onChange={(e) => setPartialValue(e.target.value.replace(/[^\d.]/g, ""))}
              />
            </label>
          ) : null}

          <label className={styles.field} htmlFor={reasonId}>
            <span className={styles.fieldLabel}>Reason</span>
            <select
              id={reasonId}
              className={styles.input}
              value={reason}
              onChange={(e) => setReason(e.target.value as RefundReason)}
            >
              {(Object.keys(REASON_LABEL) as RefundReason[]).map((r) => (
                <option key={r} value={r}>{REASON_LABEL[r]}</option>
              ))}
            </select>
          </label>

          <label className={styles.field} htmlFor={noteId}>
            <span className={styles.fieldLabel}>Internal note (optional)</span>
            <textarea
              id={noteId}
              className={styles.textarea}
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>

          <footer className={styles.footer}>
            <button type="button" className={styles.ghostBtn} onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className={styles.primaryBtn} onClick={handleConfirm}>
              Confirm refund
            </button>
          </footer>
        </div>
      )}
    </section>
  )
}

export default RefundFlow
