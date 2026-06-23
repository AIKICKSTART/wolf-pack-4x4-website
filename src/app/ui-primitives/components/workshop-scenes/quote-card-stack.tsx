import { Check, Pencil, X } from "lucide-react"

import { Chip } from "../primitives/chip"
import {
  formatQuoteTotalAud,
  getQuoteVehicleLabel,
  type PendingQuote,
} from "./quote-card-stack-data"
import styles from "./quote-card-stack.module.css"

export type { PendingQuote } from "./quote-card-stack-data"

export interface QuoteCardStackProps {
  quotes: ReadonlyArray<PendingQuote>
}

function positionFor(index: number): string {
  if (index >= 4) return "overflow"
  return String(index)
}

export function QuoteCardStack({ quotes }: QuoteCardStackProps) {
  return (
    <section
      className={styles.stage}
      aria-label={`Pending quote deck, ${quotes.length} cards`}
    >
      <div className={styles.deck}>
        <span className={styles.cardCount}>
          <strong>{quotes.length}</strong> quotes pending
        </span>
        {quotes.map((quote, index) => {
          const isTop = index === 0
          return (
            <article
              key={quote.id}
              className={styles.card}
              data-position={positionFor(index)}
              aria-hidden={!isTop}
            >
              <header className={styles.cardHead}>
                <span className={styles.kicker}>{quote.reference}</span>
                <strong className={styles.customer}>{quote.customerName}</strong>
                <span className={styles.suburb}>{quote.customerSuburb}</span>
              </header>

              <div className={styles.cardBody}>
                <div className={styles.vehicle}>
                  <div className={styles.vehicleBody}>
                    <strong>{getQuoteVehicleLabel(quote)}</strong>
                    <span>{quote.vehicleEngine}</span>
                  </div>
                  <span className={styles.rego} aria-label={`Rego ${quote.vehicleRego}`}>
                    {quote.vehicleRego}
                  </span>
                </div>

                <div className={styles.serviceChips}>
                  {quote.services.map((service) => (
                    <Chip
                      key={service.label}
                      label={service.label}
                      tone={service.tone ?? "neutral"}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className={styles.priceRow}>
                  <span>Quote inc GST</span>
                  <strong>{formatQuoteTotalAud(quote.totalAud)}</strong>
                </div>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.action} ${styles.actionDecline}`}
                    aria-label={`Decline quote ${quote.reference}`}
                    tabIndex={isTop ? 0 : -1}
                  >
                    <X strokeWidth={2.6} aria-hidden="true" />
                    Decline
                  </button>
                  <button
                    type="button"
                    className={`${styles.action} ${styles.actionAmend}`}
                    aria-label={`Amend quote ${quote.reference}`}
                    tabIndex={isTop ? 0 : -1}
                  >
                    <Pencil strokeWidth={2.4} aria-hidden="true" />
                    Amend
                  </button>
                  <button
                    type="button"
                    className={`${styles.action} ${styles.actionApprove}`}
                    aria-label={`Approve quote ${quote.reference}`}
                    tabIndex={isTop ? 0 : -1}
                  >
                    <Check strokeWidth={2.6} aria-hidden="true" />
                    Approve
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default QuoteCardStack
