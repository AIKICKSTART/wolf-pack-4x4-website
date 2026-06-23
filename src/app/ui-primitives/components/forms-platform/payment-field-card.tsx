import type { PaymentFieldDraft } from "./forms-platform-types"
import styles from "./payment-field-card.module.css"

interface PaymentFieldCardProps {
  draft: PaymentFieldDraft
  className?: string
}

const AUD_FORMATTER = new Intl.NumberFormat("en-AU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function PaymentFieldCard({ draft, className }: PaymentFieldCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const tipPercents = draft.tipPercents ?? [0, 5, 10, 15]
  const tipEnabled = draft.tippingEnabled ?? true
  const stripeKey = draft.stripeKey ?? "pk_live_…AUD"

  return (
    <section className={classes} aria-label={`${draft.label} payment field`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Payment field</span>
          <h3 className={styles.title}>{draft.label}</h3>
        </div>
        <span className={styles.stripeBadge}>
          <span className={styles.stripeDot} aria-hidden="true" />
          Stripe AU
        </span>
      </header>

      <div className={styles.amount}>
        <div className={styles.amountRow}>
          <span className={styles.currency}>AUD</span>
          <span
            className={styles.amountValue}
            aria-label={`Amount ${AUD_FORMATTER.format(draft.amountAud)}`}
          >
            ${AUD_FORMATTER.format(draft.amountAud)}
          </span>
          <span className={styles.amountSuffix}>inc. GST</span>
        </div>
      </div>

      <div className={styles.cardElement}>
        <div className={styles.cardElementRow}>
          <span className={styles.cardLogo} aria-hidden="true">
            VISA
          </span>
          <span className={styles.cardPlaceholder}>
            •••• •••• •••• 4242
          </span>
          <span className={styles.cardMeta}>Stripe element</span>
        </div>
        <div className={styles.cardRowSecondary}>
          {draft.captureCardholder ? (
            <div className={styles.cardField}>
              <span className={styles.cardFieldLabel}>Cardholder name</span>
              <span className={styles.cardFieldValue}>Daniel Fleuren</span>
            </div>
          ) : null}
          <div className={styles.cardField}>
            <span className={styles.cardFieldLabel}>Expiry</span>
            <span className={styles.cardFieldValue}>12 / 29</span>
          </div>
          <div className={styles.cardField}>
            <span className={styles.cardFieldLabel}>CVC</span>
            <span className={styles.cardFieldValue}>•••</span>
          </div>
        </div>
      </div>

      {tipEnabled ? (
        <div className={styles.tip}>
          <div className={styles.tipHead}>
            <span className={styles.tipLabel}>
              {draft.tipLabel ?? "Add a tip"}
            </span>
            <span className={styles.tipMeta}>Goes to the workshop crew</span>
          </div>
          <div className={styles.tipChips} role="radiogroup" aria-label="Tip amount">
            {tipPercents.map((pct) => {
              const tipAud = (draft.amountAud * pct) / 100
              const label =
                pct === 0
                  ? "No tip"
                  : `${pct}% · $${AUD_FORMATTER.format(tipAud)}`
              return (
                <button
                  key={pct}
                  type="button"
                  className={styles.tipChip}
                  role="radio"
                  aria-checked={false}
                  aria-label={`Tip ${pct} percent`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      <footer className={styles.footer}>
        <span>
          Key <span className={styles.footerKey}>{stripeKey}</span>
        </span>
        <span>Live · 3DS · Apple Pay</span>
      </footer>
    </section>
  )
}
