"use client"

import { CreditCard, Smartphone, Wallet, Calendar, Banknote } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"

import type { AfterpaySchedule, PaymentMethod } from "./storefront-types"
import { STORE_DEFAULT_CURRENCY, STORE_LOCALE } from "./storefront-types"
import styles from "./payment-method-card.module.css"

interface PaymentMethodOption {
  id: PaymentMethod
  label: string
  caption: string
}

const METHODS: ReadonlyArray<PaymentMethodOption> = [
  { id: "card", label: "Card", caption: "Visa · Mastercard · Amex" },
  { id: "apple-pay", label: "Apple Pay", caption: "Face ID or Touch ID" },
  { id: "google-pay", label: "Google Pay", caption: "One tap on Android" },
  { id: "afterpay", label: "Afterpay", caption: "4 fortnightly payments" },
  { id: "bpay", label: "BPay", caption: "Bank transfer · biller code" },
]

const METHOD_ICON: Record<PaymentMethod, typeof CreditCard> = {
  card: CreditCard,
  "apple-pay": Smartphone,
  "google-pay": Smartphone,
  afterpay: Calendar,
  bpay: Banknote,
}

interface PaymentMethodCardProps {
  selected: PaymentMethod
  onSelect: (method: PaymentMethod) => void
  total: number
  afterpaySchedule?: AfterpaySchedule
  bpayBiller?: { code: string; reference: string }
  currency?: string
  locale?: string
  onPay?: (method: PaymentMethod) => void
  payLabel?: string
  errorMessage?: string
}

function formatCurrency(amount: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

interface CardDetailsState {
  number: string
  expiry: string
  cvc: string
  name: string
}

function maskCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16)
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
}

function maskExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length <= 2) {
    return digits
  }
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function PaymentMethodCard({
  selected,
  onSelect,
  total,
  afterpaySchedule,
  bpayBiller,
  currency = STORE_DEFAULT_CURRENCY,
  locale = STORE_LOCALE,
  onPay,
  payLabel,
  errorMessage,
}: PaymentMethodCardProps) {
  const [card, setCard] = useState<CardDetailsState>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })

  const patchCard = (next: Partial<CardDetailsState>) => setCard((prev) => ({ ...prev, ...next }))

  const handleCardField = (key: keyof CardDetailsState) => (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value
    if (key === "number") {
      patchCard({ number: maskCardNumber(raw) })
      return
    }
    if (key === "expiry") {
      patchCard({ expiry: maskExpiry(raw) })
      return
    }
    if (key === "cvc") {
      patchCard({ cvc: raw.replace(/\D/g, "").slice(0, 4) })
      return
    }
    patchCard({ [key]: raw })
  }

  const totalLabel = formatCurrency(total, currency, locale)
  const buttonLabel = payLabel ?? `Pay ${totalLabel}`

  return (
    <section className={styles.card} aria-labelledby="payment-card-title">
      <header className={styles.head}>
        <span className={styles.kicker}>Step 3 · Payment</span>
        <h2 id="payment-card-title" className={styles.title}>
          Select payment method
        </h2>
      </header>

      <ul className={styles.methods} role="radiogroup" aria-label="Payment methods">
        {METHODS.map((method) => {
          const isSelected = method.id === selected
          const Icon = METHOD_ICON[method.id]
          return (
            <li key={method.id}>
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                className={`${styles.methodBtn} ${isSelected ? styles.methodSelected : ""}`}
                onClick={() => onSelect(method.id)}
              >
                <Icon size={18} aria-hidden="true" className={styles.methodIcon} />
                <span className={styles.methodBody}>
                  <span className={styles.methodLabel}>{method.label}</span>
                  <span className={styles.methodCaption}>{method.caption}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <div className={styles.detail}>
        {selected === "card" && (
          <div className={styles.cardForm}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="pm-card-number">
                Card number
              </label>
              <input
                id="pm-card-number"
                type="text"
                inputMode="numeric"
                className={styles.input}
                placeholder="4242 4242 4242 4242"
                value={card.number}
                onChange={handleCardField("number")}
                autoComplete="cc-number"
              />
            </div>
            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="pm-card-expiry">
                  Expiry
                </label>
                <input
                  id="pm-card-expiry"
                  type="text"
                  inputMode="numeric"
                  className={styles.input}
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={handleCardField("expiry")}
                  autoComplete="cc-exp"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="pm-card-cvc">
                  CVC
                </label>
                <input
                  id="pm-card-cvc"
                  type="text"
                  inputMode="numeric"
                  className={styles.input}
                  placeholder="123"
                  value={card.cvc}
                  onChange={handleCardField("cvc")}
                  autoComplete="cc-csc"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="pm-card-name">
                Name on card
              </label>
              <input
                id="pm-card-name"
                type="text"
                className={styles.input}
                value={card.name}
                onChange={handleCardField("name")}
                autoComplete="cc-name"
              />
            </div>
          </div>
        )}

        {selected === "apple-pay" && (
          <div className={styles.wallet}>
            <Wallet size={28} aria-hidden="true" className={styles.walletIcon} />
            <p>Hold your iPhone near the reader or confirm with Face ID at checkout.</p>
          </div>
        )}

        {selected === "google-pay" && (
          <div className={styles.wallet}>
            <Wallet size={28} aria-hidden="true" className={styles.walletIcon} />
            <p>Confirm with your screen lock or fingerprint at checkout.</p>
          </div>
        )}

        {selected === "afterpay" && afterpaySchedule && (
          <div className={styles.afterpay}>
            <p className={styles.afterpayHero}>
              4 × {formatCurrency(afterpaySchedule.perInstallment, currency, locale)}{" "}
              <span>fortnightly</span>
            </p>
            <ol className={styles.afterpayList}>
              {Array.from({ length: afterpaySchedule.installments }).map((_, idx) => (
                <li key={idx}>
                  <span className={styles.afterpayDot} aria-hidden="true" />
                  <span className={styles.afterpayMeta}>
                    {idx === 0 ? "Today" : `Week ${idx * 2}`}
                  </span>
                  <span className={styles.afterpayAmount}>
                    {formatCurrency(afterpaySchedule.perInstallment, currency, locale)}
                  </span>
                </li>
              ))}
            </ol>
            <p className={styles.afterpayNote}>
              First due {afterpaySchedule.firstDueLabel}. Late fees may apply. T&Cs apply.
            </p>
          </div>
        )}

        {selected === "bpay" && bpayBiller && (
          <div className={styles.bpay}>
            <div className={styles.bpayRow}>
              <span>Biller code</span>
              <strong className={styles.numeric}>{bpayBiller.code}</strong>
            </div>
            <div className={styles.bpayRow}>
              <span>Reference</span>
              <strong className={styles.numeric}>{bpayBiller.reference}</strong>
            </div>
            <p className={styles.bpayNote}>
              Lodge from your internet banking. Stock is reserved 48 hrs pending payment.
            </p>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className={styles.errorBanner} role="alert">
          <Chip label="Payment declined" tone="red" />
          <span>{errorMessage}</span>
        </div>
      )}

      <footer className={styles.foot}>
        <button type="button" className={styles.payBtn} onClick={() => onPay?.(selected)}>
          {buttonLabel}
        </button>
      </footer>
    </section>
  )
}

export default PaymentMethodCard
