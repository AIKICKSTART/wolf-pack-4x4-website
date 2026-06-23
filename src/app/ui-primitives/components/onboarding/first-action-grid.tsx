import styles from "./first-action-grid.module.css"

export type FirstActionAccent = "red" | "amber" | "teal" | "green" | "neutral"

export interface FirstActionCard {
  id: string
  /** Short label, e.g. "Add your first vehicle". */
  title: string
  /** One-line supporting copy. */
  description: string
  /** Estimated duration chip, e.g. "3 min". */
  duration: string
  /** Single-character / short glyph. */
  glyph: string
  /** Destination route. */
  href: string
  /** Accent colour. */
  accent?: FirstActionAccent
  /** Optional small badge, e.g. "Recommended" or "ADR required". */
  badge?: string
}

interface FirstActionGridProps {
  /** Eyebrow label above the grid. */
  kicker: string
  /** Headline above the grid. */
  title: string
  cards: ReadonlyArray<FirstActionCard>
  className?: string
}

const ACCENT_CLASS: Record<FirstActionAccent, string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export function FirstActionGrid({
  kicker,
  title,
  cards,
  className,
}: FirstActionGridProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 className={styles.title}>{title}</h3>
      </header>
      <ul className={styles.grid}>
        {cards.map((card) => (
          <li key={card.id} className={styles.cell}>
            <a
              className={[styles.card, ACCENT_CLASS[card.accent ?? "neutral"]].join(" ")}
              href={card.href}
            >
              <div className={styles.cardHead}>
                <span className={styles.glyph} aria-hidden="true">
                  {card.glyph}
                </span>
                {card.badge ? <span className={styles.badge}>{card.badge}</span> : null}
              </div>
              <div className={styles.cardBody}>
                <h4 className={styles.cardTitle}>{card.title}</h4>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
              <footer className={styles.cardFoot}>
                <span className={styles.duration}>
                  <span aria-hidden="true">◷</span> {card.duration}
                </span>
                <span className={styles.startCta}>
                  Start <span aria-hidden="true">→</span>
                </span>
              </footer>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FirstActionGrid
