import { PaymentBrandLogo, type PaymentBrand } from "../commerce/payment-brand-logo"

import styles from "./payment-icon-strip.module.css"

export type PosPaymentBrand =
  | PaymentBrand
  | "eftpos"

interface PaymentIconStripProps {
  /** Header title, e.g. "Accepted at this terminal". */
  title?: string
  /** Brands accepted, in display order. */
  accepted: ReadonlyArray<PosPaymentBrand>
  /** Brands that should appear disabled (e.g. unavailable today). */
  disabled?: ReadonlyArray<PosPaymentBrand>
  /** Optional footer note. */
  note?: string
}

const POS_BRAND_LABEL: Record<PosPaymentBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "Amex",
  paypal: "PayPal",
  afterpay: "Afterpay",
  applepay: "Apple Pay",
  googlepay: "Google Pay",
  eftpos: "EFTPOS",
  generic: "Card",
}

function EftposLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 26"
      width={40}
      height={26}
      role="img"
      aria-label="EFTPOS"
    >
      <title>EFTPOS</title>
      <rect width="40" height="26" rx="4" fill="#003f6e" />
      <text
        x="20"
        y="17"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="8"
        fill="#ffffff"
      >
        EFTPOS
      </text>
    </svg>
  )
}

export function PaymentIconStrip({
  title = "Accepted at this terminal",
  accepted,
  disabled = [],
  note,
}: PaymentIconStripProps) {
  return (
    <section className={styles.strip} aria-label="Accepted payment methods">
      <header className={styles.head}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.meta}>{accepted.length} methods</span>
      </header>
      <div className={styles.row}>
        {accepted.map((brand) => {
          const isDisabled = disabled.includes(brand)
          const className = `${styles.brand} ${styles.brandActive}${
            isDisabled ? ` ${styles.brandDisabled}` : ""
          }`
          return (
            <span key={brand} className={className} aria-disabled={isDisabled}>
              {brand === "eftpos" ? (
                <EftposLogo />
              ) : (
                <PaymentBrandLogo brand={brand} />
              )}
              <span className={styles.label}>{POS_BRAND_LABEL[brand]}</span>
            </span>
          )
        })}
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </section>
  )
}

export default PaymentIconStrip
