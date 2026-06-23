import type { ReactNode } from "react"

import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"
import { QuoteBubble } from "../primitives/quote-bubble"

import styles from "./suburb-testimonial.module.css"

export interface SuburbTestimonialProps {
  customerName: string
  /** Suburb chip — usually matches the page suburb. */
  suburbName: string
  /** Vehicle the customer drives. */
  vehicle: string
  /** Body of the testimonial. */
  quote: ReactNode
  /** Integer 1-5 star rating. */
  rating: 1 | 2 | 3 | 4 | 5
  /** Optional review source (e.g. "Google", "Facebook"). */
  source?: string
  className?: string
}

/**
 * Suburb testimonial — adapter that frames a `primitives/QuoteBubble`
 * with an `Avatar` for the customer and a teal `Chip` for the suburb
 * tag. Rendered as `<article role="article">` so it can live alongside
 * other testimonial cards in a grid.
 */
export function SuburbTestimonial({
  customerName,
  suburbName,
  vehicle,
  quote,
  rating,
  source,
  className,
}: SuburbTestimonialProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const ariaLabel = `${rating} star testimonial from ${customerName} in ${suburbName}`

  return (
    <article className={classes} role="article" aria-label={ariaLabel}>
      <header className={styles.head}>
        <ul
          className={styles.stars}
          aria-label={`${rating} out of 5 stars`}
        >
          {[1, 2, 3, 4, 5].map((position) => (
            <li
              key={position}
              className={`${styles.star} ${
                position <= rating ? styles.starOn : ""
              }`}
              aria-hidden="true"
            >
              ★
            </li>
          ))}
        </ul>
        {source ? <span className={styles.source}>{source}</span> : null}
      </header>

      <QuoteBubble tone="amber" side="bottom" label={`Testimonial from ${customerName}`}>
        {quote}
      </QuoteBubble>

      <footer className={styles.foot}>
        <div className={styles.author}>
          <Avatar name={customerName} tone="amber" size="md" />
          <div className={styles.authorCopy}>
            <span className={styles.name}>{customerName}</span>
            <span className={styles.vehicle}>{vehicle}</span>
          </div>
        </div>
        <Chip label={suburbName} tone="teal" />
      </footer>
    </article>
  )
}

export default SuburbTestimonial
