"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import {
  PAYMENT_PROVIDER_LABEL,
  PAYMENT_STATUS_LABEL,
  PAYMENT_STATUS_TONE,
  type PaymentCollection,
  type PaymentProvider,
  formatAud,
  opsToneToChip,
} from "./workshop-ops-types"

import styles from "./payment-collection-card.module.css"

interface PaymentCollectionCardProps {
  payment: PaymentCollection
  /** Providers available for switching (defaults to a sensible AU set). */
  providers?: ReadonlyArray<PaymentProvider>
  className?: string
}

const DEFAULT_PROVIDERS: ReadonlyArray<PaymentProvider> = [
  "stripe",
  "square",
  "tyro",
  "cash",
]

export function PaymentCollectionCard({
  payment,
  providers = DEFAULT_PROVIDERS,
  className,
}: PaymentCollectionCardProps) {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>(
    payment.provider,
  )
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const tone = opsToneToChip(PAYMENT_STATUS_TONE[payment.status])
  const refundAvailable =
    payment.status === "settled" || payment.status === "captured"
  const refundedDisplay = payment.refundedAud
    ? formatAud(payment.refundedAud)
    : payment.partialRefund
      ? "Partial"
      : undefined

  return (
    <article
      className={classes}
      aria-label={`Payment collection ${payment.invoiceNumber}`}
      data-payment={payment.id}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Payment · {payment.invoiceNumber}</span>
          <h3 className={styles.title}>{payment.customerLabel}</h3>
          <span className={styles.reference}>Ref · {payment.reference}</span>
        </div>
        <Chip label={PAYMENT_STATUS_LABEL[payment.status]} tone={tone} />
      </header>

      <section className={styles.totals} aria-label="Payment totals">
        <div className={styles.amountWrap}>
          <span className={styles.amountLabel}>Amount due inc. GST</span>
          <span className={styles.amount}>
            {formatAud(payment.amountAud)}
          </span>
          <span className={styles.amountSub}>
            incl. {formatAud(payment.gstAud)} GST
          </span>
        </div>
        {payment.collectedAt ? (
          <div className={styles.collected}>
            <span className={styles.collectedLabel}>Collected at</span>
            <time className={styles.collectedTime}>{payment.collectedAt}</time>
          </div>
        ) : null}
      </section>

      <section
        className={styles.providers}
        aria-label="Payment provider selector"
      >
        <span className={styles.providersLabel}>Process via</span>
        <div className={styles.providerGroup} role="radiogroup">
          {providers.map((provider) => {
            const active = provider === selectedProvider
            return (
              <button
                key={provider}
                type="button"
                className={[
                  styles.providerButton,
                  active ? styles.providerButtonActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedProvider(provider)}
              >
                <span className={styles.providerName}>
                  {PAYMENT_PROVIDER_LABEL[provider]}
                </span>
                {provider === "tyro" ? (
                  <span className={styles.providerHint}>Terminal</span>
                ) : provider === "cash" ? (
                  <span className={styles.providerHint}>Counter</span>
                ) : (
                  <span className={styles.providerHint}>Card</span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <footer className={styles.foot}>
        <button type="button" className={styles.primaryButton}>
          {payment.status === "settled" || payment.status === "captured"
            ? "Send receipt"
            : `Capture via ${PAYMENT_PROVIDER_LABEL[selectedProvider]}`}
        </button>
        <button
          type="button"
          className={styles.refundButton}
          disabled={!refundAvailable}
          aria-disabled={!refundAvailable}
        >
          {refundedDisplay
            ? `Refund · ${refundedDisplay}`
            : "Issue refund"}
        </button>
      </footer>
    </article>
  )
}

export default PaymentCollectionCard
