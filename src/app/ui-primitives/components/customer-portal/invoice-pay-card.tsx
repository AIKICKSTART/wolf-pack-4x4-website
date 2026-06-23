"use client"

import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import { PaymentBrandLogo } from "../commerce/payment-brand-logo"
import {
  INVOICE_STATUS_LABEL,
  INVOICE_STATUS_TONE,
  formatAud,
  portalToneToChip,
  type CustomerInvoice,
  type WalletBrand,
} from "./customer-portal-types"

import styles from "./invoice-pay-card.module.css"

interface InvoicePayCardProps {
  invoice: CustomerInvoice
  /** Optional pay-now handler called with both the invoice id and chosen option. */
  onPay?: (invoiceId: string, optionId: string) => void
  className?: string
}

const BRAND_MAP: Readonly<
  Record<
    WalletBrand,
    "applepay" | "googlepay" | "generic"
  >
> = {
  "apple-pay": "applepay",
  "google-pay": "googlepay",
  stripe: "generic",
  tyro: "generic",
  "bank-transfer": "generic",
}

const BRAND_GLYPH: Readonly<Record<WalletBrand, string>> = {
  "apple-pay": "Apple Pay",
  "google-pay": "Google Pay",
  stripe: "Card",
  tyro: "Tyro",
  "bank-transfer": "Transfer",
}

export function InvoicePayCard({
  invoice,
  onPay,
  className,
}: InvoicePayCardProps) {
  const [optionId, setOptionId] = useState<string | undefined>(
    invoice.paymentOptions[0]?.id,
  )
  const [paid, setPaid] = useState<boolean>(invoice.status === "paid")

  const balance = useMemo(() => {
    const paidPart = invoice.paidAud ?? 0
    return Math.max(0, invoice.amountAud - paidPart)
  }, [invoice])

  const paidPct = useMemo(() => {
    if (invoice.amountAud <= 0) return 0
    return ((invoice.paidAud ?? 0) / invoice.amountAud) * 100
  }, [invoice])

  const statusTone = portalToneToChip(INVOICE_STATUS_TONE[invoice.status])
  const isPaid = paid || invoice.status === "paid"
  const classes = [
    styles.card,
    isPaid ? styles.cardPaid : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const handlePay = () => {
    if (!optionId) return
    setPaid(true)
    onPay?.(invoice.id, optionId)
  }

  return (
    <article
      className={classes}
      data-invoice={invoice.id}
      aria-label={`Invoice ${invoice.number} for ${invoice.vehicleLabel}, ${INVOICE_STATUS_LABEL[invoice.status]}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Invoice {invoice.number}</span>
          <h3 className={styles.title}>{invoice.vehicleLabel}</h3>
          <span className={styles.rego}>Rego {invoice.rego}</span>
        </div>
        <Chip
          label={
            isPaid ? INVOICE_STATUS_LABEL.paid : INVOICE_STATUS_LABEL[invoice.status]
          }
          tone={isPaid ? "green" : statusTone}
        />
      </header>

      <section className={styles.amounts} aria-label="Invoice totals">
        <div className={styles.amountRow}>
          <dt>Amount inc GST</dt>
          <dd>{formatAud(invoice.amountAud)}</dd>
        </div>
        <div className={styles.amountRow}>
          <dt>GST 10%</dt>
          <dd>{formatAud(invoice.gstAud)}</dd>
        </div>
        {invoice.paidAud !== undefined && invoice.paidAud > 0 ? (
          <div className={styles.amountRow}>
            <dt>Already paid</dt>
            <dd>{formatAud(invoice.paidAud)}</dd>
          </div>
        ) : null}
        <div className={styles.amountTotal}>
          <dt>{isPaid ? "Settled" : "Balance due"}</dt>
          <dd>{isPaid ? formatAud(0) : formatAud(balance)}</dd>
        </div>
        {invoice.paidAud !== undefined && invoice.paidAud > 0 && !isPaid ? (
          <ProgressLinear value={paidPct} tone="green" variant="solid" />
        ) : null}
      </section>

      <section className={styles.due}>
        <span className={styles.dueLabel}>Due</span>
        <time className={styles.dueValue}>{invoice.dueAt}</time>
      </section>

      {!isPaid ? (
        <fieldset className={styles.options} aria-label="Payment options">
          <legend className={styles.optionsLabel}>Pay with</legend>
          <div className={styles.optionsRow}>
            {invoice.paymentOptions.map((option) => {
              const selected = option.id === optionId
              return (
                <label
                  key={option.id}
                  className={[
                    styles.option,
                    selected ? styles.optionSelected : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <input
                    type="radio"
                    name={`invoice-${invoice.id}-option`}
                    value={option.id}
                    checked={selected}
                    onChange={() => setOptionId(option.id)}
                    className={styles.optionInput}
                  />
                  <span className={styles.optionLogo} aria-hidden="true">
                    <PaymentBrandLogo
                      brand={BRAND_MAP[option.brand]}
                      width={44}
                      height={28}
                    />
                  </span>
                  <span className={styles.optionText}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    <span className={styles.optionHint}>
                      {option.hint ?? BRAND_GLYPH[option.brand]}
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
        </fieldset>
      ) : (
        <p className={styles.paidNote}>
          Receipt emailed and saved to documents. Cheers, mate.
        </p>
      )}

      <footer className={styles.foot}>
        <span className={styles.footHint}>
          Secured by Stripe · Australian merchant
        </span>
        <button
          type="button"
          className={styles.payButton}
          onClick={handlePay}
          disabled={isPaid || !optionId}
        >
          {isPaid ? "Paid" : `Pay ${formatAud(balance)}`}
        </button>
      </footer>
    </article>
  )
}

export default InvoicePayCard
