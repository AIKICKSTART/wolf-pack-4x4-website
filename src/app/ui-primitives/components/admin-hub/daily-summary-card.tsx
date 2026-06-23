import { AlertTriangle, Star, Sunrise } from "lucide-react"
import type { CSSProperties } from "react"

import {
  adminToneToVar,
  type DailySummary,
  type DailySummaryItem,
} from "./admin-hub-types"

import styles from "./daily-summary-card.module.css"

interface DailySummaryCardProps {
  summary: DailySummary
  className?: string
}

interface SummaryColumnProps {
  title: string
  items: ReadonlyArray<DailySummaryItem>
  glyph: React.ReactNode
  tone: "green" | "amber"
}

function SummaryColumn({ title, items, glyph, tone }: SummaryColumnProps) {
  const toneClass = tone === "green" ? styles.colGreen : styles.colAmber

  return (
    <section className={[styles.col, toneClass].join(" ")} aria-label={title}>
      <header className={styles.colHead}>
        <span className={styles.colGlyph} aria-hidden="true">
          {glyph}
        </span>
        <h4 className={styles.colTitle}>{title}</h4>
        <span className={styles.colCount}>{items.length}</span>
      </header>

      {items.length === 0 ? (
        <p className={styles.empty}>Nothing to report.</p>
      ) : (
        <ul className={styles.itemList} role="list">
          {items.map((item) => (
            <li
              key={item.id}
              className={styles.item}
              style={{ "--item-tone": adminToneToVar(item.tone) } as CSSProperties}
            >
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.itemValue}>
                {item.value}
                {item.unit && <em className={styles.itemUnit}>{item.unit}</em>}
              </span>
              {item.detail && <span className={styles.itemDetail}>{item.detail}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function DailySummaryCard({ summary, className }: DailySummaryCardProps) {
  return (
    <article
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={`Daily summary for ${summary.dateLabel}`}
    >
      <header className={styles.head}>
        <span className={styles.headGlyph} aria-hidden="true">
          <Sunrise size={18} strokeWidth={2.2} />
        </span>
        <div className={styles.headIdentity}>
          <span className={styles.kicker}>Yesterday recap</span>
          <h3 className={styles.title}>{summary.dateLabel}</h3>
          <span className={styles.prepared}>Prepared {summary.preparedAtLabel}</span>
        </div>
      </header>

      <div className={styles.cols}>
        <SummaryColumn
          title="Highlights"
          items={summary.highlights}
          glyph={<Star size={12} strokeWidth={2.2} />}
          tone="green"
        />
        <SummaryColumn
          title="Watch-outs"
          items={summary.warnings}
          glyph={<AlertTriangle size={12} strokeWidth={2.2} />}
          tone="amber"
        />
      </div>

      {summary.outlook && (
        <footer className={styles.outlook}>
          <span className={styles.outlookKicker}>Today&apos;s outlook</span>
          <p className={styles.outlookBody}>{summary.outlook}</p>
        </footer>
      )}
    </article>
  )
}

export default DailySummaryCard
