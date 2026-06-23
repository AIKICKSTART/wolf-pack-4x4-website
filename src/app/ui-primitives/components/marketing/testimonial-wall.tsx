import { Star } from "lucide-react"

import { Avatar, type AvatarTone } from "../primitives/avatar"

import styles from "./testimonial-wall.module.css"

export interface TestimonialEntry {
  id: string
  quote: string
  name: string
  role: string
  tone?: AvatarTone
  rating?: 1 | 2 | 3 | 4 | 5
  /** Optional emphasis — varies card height visually. */
  span?: "short" | "regular" | "tall"
}

export interface TestimonialWallProps {
  kicker?: string
  heading?: string
  body?: string
  entries: ReadonlyArray<TestimonialEntry>
  className?: string
}

const SPAN_CLASS: Record<NonNullable<TestimonialEntry["span"]>, string> = {
  short: styles.spanShort,
  regular: styles.spanRegular,
  tall: styles.spanTall,
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <span className={styles.stars} aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          strokeWidth={1.4}
          fill={index < filled ? "currentColor" : "transparent"}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export function TestimonialWall({
  kicker,
  heading,
  body,
  entries,
  className,
}: TestimonialWallProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading ?? "Customer testimonials"}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}

      <ul className={styles.wall}>
        {entries.map((entry) => {
          const spanClass = SPAN_CLASS[entry.span ?? "regular"]
          return (
            <li key={entry.id} className={`${styles.card} ${spanClass}`}>
              <article>
                {entry.rating ? <Stars rating={entry.rating} /> : null}
                <blockquote className={styles.quote}>
                  <p>{entry.quote}</p>
                </blockquote>
                <footer className={styles.footer}>
                  <Avatar name={entry.name} tone={entry.tone ?? "obsidian"} size="md" />
                  <div>
                    <strong>{entry.name}</strong>
                    <span>{entry.role}</span>
                  </div>
                </footer>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default TestimonialWall
