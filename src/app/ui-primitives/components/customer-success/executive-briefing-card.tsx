import { Chip } from "../primitives/chip"
import styles from "./executive-briefing-card.module.css"

export interface BriefingItem {
  id: string
  text: string
  /** Optional metric or call-out, displayed inline. */
  metric?: string
}

interface ExecutiveBriefingCardProps {
  /** Week label, e.g. "Week of 27 May 2026". */
  weekLabel: string
  wins: ReadonlyArray<BriefingItem>
  risks: ReadonlyArray<BriefingItem>
  asks: ReadonlyArray<BriefingItem>
  /** Optional author / owner. */
  author?: string
  className?: string
}

interface BriefSectionProps {
  label: string
  items: ReadonlyArray<BriefingItem>
  tone: "green" | "red" | "amber"
}

function BriefSection({ label, items, tone }: BriefSectionProps) {
  return (
    <section className={styles.section} data-tone={tone}>
      <header className={styles.sectionHead}>
        <Chip label={label} tone={tone} />
        <span className={styles.sectionCount}>{items.length}</span>
      </header>
      <ol className={styles.list}>
        {items.slice(0, 3).map((item, index) => (
          <li key={item.id} className={styles.item}>
            <span className={styles.itemIndex}>{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.itemBody}>
              <span className={styles.itemText}>{item.text}</span>
              {item.metric ? (
                <span className={styles.itemMetric}>{item.metric}</span>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function ExecutiveBriefingCard({
  weekLabel,
  wins,
  risks,
  asks,
  author,
  className,
}: ExecutiveBriefingCardProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      aria-label={`Executive briefing — ${weekLabel}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Executive briefing</span>
        <h3 className={styles.title}>{weekLabel}</h3>
        {author ? <span className={styles.author}>by {author}</span> : null}
      </header>

      <BriefSection label="Top wins" items={wins} tone="green" />
      <BriefSection label="Top risks" items={risks} tone="red" />
      <BriefSection label="Asks for the week" items={asks} tone="amber" />
    </article>
  )
}

export default ExecutiveBriefingCard
