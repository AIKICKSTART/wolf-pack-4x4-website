"use client"

import { useId, useMemo, useState } from "react"

import type { CardBrand } from "./billing-types"
import styles from "./payment-method-update.module.css"

interface PaymentMethodUpdateProps {
  initialCardNumber?: string
  initialExpiry?: string
  initialCardholder?: string
  initialBillingAddress?: {
    line1: string
    suburb: string
    state: string
    postcode: string
  }
  onSave?: (form: PaymentMethodFormState) => void
}

export interface PaymentMethodFormState {
  cardNumber: string
  expiry: string
  cvc: string
  cardholder: string
  brand: CardBrand
  line1: string
  suburb: string
  state: string
  postcode: string
  saveDefault: boolean
}

function detectBrand(value: string): CardBrand {
  const digits = value.replace(/\D/g, "")
  if (digits.startsWith("4")) return "visa"
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard"
  if (/^3[47]/.test(digits)) return "amex"
  if (/^3(?:0[0-5]|[689])/.test(digits)) return "diners"
  return "unknown"
}

function formatCardNumber(value: string, brand: CardBrand): string {
  const digits = value.replace(/\D/g, "").slice(0, brand === "amex" ? 15 : 16)
  if (brand === "amex") {
    return digits.replace(/^(\d{4})(\d{0,6})(\d{0,5}).*$/, (_, a, b, c) => [a, b, c].filter(Boolean).join(" "))
  }
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ")
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

const BRAND_LABEL: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  diners: "Diners Club",
  unknown: "Card",
}

const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const

export function PaymentMethodUpdate({
  initialCardNumber = "",
  initialExpiry = "",
  initialCardholder = "",
  initialBillingAddress,
  onSave,
}: PaymentMethodUpdateProps) {
  const numId = useId()
  const expId = useId()
  const cvcId = useId()
  const nameId = useId()
  const line1Id = useId()
  const suburbId = useId()
  const stateId = useId()
  const pcId = useId()

  const [cardNumber, setCardNumber] = useState(initialCardNumber)
  const [expiry, setExpiry] = useState(initialExpiry)
  const [cvc, setCvc] = useState("")
  const [cardholder, setCardholder] = useState(initialCardholder)
  const [line1, setLine1] = useState(initialBillingAddress?.line1 ?? "")
  const [suburb, setSuburb] = useState(initialBillingAddress?.suburb ?? "")
  const [stateCode, setStateCode] = useState(initialBillingAddress?.state ?? "NSW")
  const [postcode, setPostcode] = useState(initialBillingAddress?.postcode ?? "")
  const [saveDefault, setSaveDefault] = useState(true)

  const brand = useMemo(() => detectBrand(cardNumber), [cardNumber])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSave?.({
      cardNumber: cardNumber.replace(/\D/g, ""),
      expiry,
      cvc,
      cardholder,
      brand,
      line1,
      suburb,
      state: stateCode,
      postcode,
      saveDefault,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} aria-label="Update payment method">
      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h3 className={styles.sectionTitle}>Card details</h3>
          <span className={`${styles.brandChip} ${styles[`brand_${brand}`]}`}>{BRAND_LABEL[brand]}</span>
        </header>
        <div className={styles.grid}>
          <label className={styles.fieldWide} htmlFor={numId}>
            <span className={styles.fieldLabel}>Card number</span>
            <input
              id={numId}
              className={styles.input}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              value={formatCardNumber(cardNumber, brand)}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </label>
          <label className={styles.field} htmlFor={expId}>
            <span className={styles.fieldLabel}>Expiry MM/YY</span>
            <input
              id={expId}
              className={styles.input}
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="04/28"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            />
          </label>
          <label className={styles.field} htmlFor={cvcId}>
            <span className={styles.fieldLabel}>CVC</span>
            <input
              id={cvcId}
              className={styles.input}
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={brand === "amex" ? 4 : 3}
              placeholder={brand === "amex" ? "1234" : "123"}
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
            />
          </label>
          <label className={styles.fieldWide} htmlFor={nameId}>
            <span className={styles.fieldLabel}>Name on card</span>
            <input
              id={nameId}
              className={styles.input}
              autoComplete="cc-name"
              placeholder="D Fleuren"
              value={cardholder}
              onChange={(e) => setCardholder(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHead}>
          <h3 className={styles.sectionTitle}>Billing address</h3>
        </header>
        <div className={styles.grid}>
          <label className={styles.fieldWide} htmlFor={line1Id}>
            <span className={styles.fieldLabel}>Street address</span>
            <input
              id={line1Id}
              className={styles.input}
              autoComplete="address-line1"
              placeholder="22 Industrial Drive"
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
            />
          </label>
          <label className={styles.field} htmlFor={suburbId}>
            <span className={styles.fieldLabel}>Suburb</span>
            <input
              id={suburbId}
              className={styles.input}
              autoComplete="address-level2"
              placeholder="Oak Flats"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            />
          </label>
          <label className={styles.fieldNarrow} htmlFor={stateId}>
            <span className={styles.fieldLabel}>State</span>
            <select
              id={stateId}
              className={styles.input}
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            >
              {AU_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className={styles.fieldNarrow} htmlFor={pcId}>
            <span className={styles.fieldLabel}>Postcode</span>
            <input
              id={pcId}
              className={styles.input}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={4}
              placeholder="2529"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ""))}
            />
          </label>
        </div>
      </section>

      <aside className={styles.banner} role="note">
        <span className={styles.bannerIcon} aria-hidden="true">3DS</span>
        <span className={styles.bannerText}>
          Your bank may ask you to verify this card with a one-time 3D Secure code.
        </span>
      </aside>

      <footer className={styles.footer}>
        <label className={styles.defaultToggle}>
          <input
            type="checkbox"
            checked={saveDefault}
            onChange={(e) => setSaveDefault(e.target.checked)}
          />
          <span>Set as default payment method</span>
        </label>
        <button type="submit" className={styles.saveBtn}>Save card</button>
      </footer>
    </form>
  )
}

export default PaymentMethodUpdate
