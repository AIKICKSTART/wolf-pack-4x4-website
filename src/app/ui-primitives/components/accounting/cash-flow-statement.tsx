import { Chip } from "../primitives/chip"
import { BarChart, type BarSeries } from "../charts/bar-chart"

import {
  formatAud,
  formatAudCompact,
  type PeriodRef,
} from "./accounting-types"
import styles from "./cash-flow-statement.module.css"

export interface CashFlowItem {
  id: string
  description: string
  amount: number
}

export interface CashFlowStatementProps {
  period: PeriodRef
  openingCash: number
  operating: ReadonlyArray<CashFlowItem>
  investing: ReadonlyArray<CashFlowItem>
  financing: ReadonlyArray<CashFlowItem>
  /** X labels for the period bar chart (e.g. months). */
  trendLabels: ReadonlyArray<string>
  /** Operating / investing / financing trend values per label. */
  trendOperating: ReadonlyArray<number>
  trendInvesting: ReadonlyArray<number>
  trendFinancing: ReadonlyArray<number>
  className?: string
}

function sum(items: ReadonlyArray<CashFlowItem>): number {
  return items.reduce((acc, item) => acc + item.amount, 0)
}

interface SectionProps {
  title: string
  items: ReadonlyArray<CashFlowItem>
  total: number
  tone: "teal" | "amber" | "red"
}

function Section({ title, items, total, tone }: SectionProps) {
  return (
    <div className={styles.section} data-tone={tone}>
      <header className={styles.sectionHead}>
        <h4 className={styles.sectionTitle}>{title}</h4>
        <span className={styles.sectionTotal}>{formatAud(total)}</span>
      </header>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.row}>
            <span className={styles.rowName}>{item.description}</span>
            <span
              className={
                item.amount < 0 ? styles.rowAmountNeg : styles.rowAmount
              }
            >
              {item.amount < 0 ? "−" : ""}
              {formatAud(Math.abs(item.amount))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CashFlowStatement({
  period,
  openingCash,
  operating,
  investing,
  financing,
  trendLabels,
  trendOperating,
  trendInvesting,
  trendFinancing,
  className,
}: CashFlowStatementProps) {
  const opTotal = sum(operating)
  const invTotal = sum(investing)
  const finTotal = sum(financing)
  const netChange = opTotal + invTotal + finTotal
  const closingCash = openingCash + netChange

  const trendSeries: BarSeries[] = [
    { label: "Operating", values: [...trendOperating], tone: "teal" },
    { label: "Investing", values: [...trendInvesting], tone: "amber" },
    { label: "Financing", values: [...trendFinancing], tone: "red" },
  ]

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Cash flow statement for ${period.label}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Cash flow</span>
          <h3 className={styles.title}>Statement of cash flows</h3>
          <Chip label={period.label} tone="teal" />
        </div>
        <div className={styles.cashSummary}>
          <div className={styles.cashCell}>
            <span className={styles.cashLabel}>Opening cash</span>
            <span className={styles.cashValue}>{formatAud(openingCash)}</span>
          </div>
          <div className={`${styles.cashCell} ${netChange >= 0 ? styles.deltaUp : styles.deltaDown}`}>
            <span className={styles.cashLabel}>Net change</span>
            <span className={styles.cashValue}>
              {netChange >= 0 ? "+" : "−"}
              {formatAud(Math.abs(netChange))}
            </span>
          </div>
          <div className={styles.cashCell}>
            <span className={styles.cashLabel}>Closing cash</span>
            <span className={styles.cashValue}>{formatAud(closingCash)}</span>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        <Section title="Operating activities" items={operating} total={opTotal} tone="teal" />
        <Section title="Investing activities" items={investing} total={invTotal} tone="amber" />
        <Section title="Financing activities" items={financing} total={finTotal} tone="red" />
      </div>

      <div className={styles.trend}>
        <header className={styles.trendHead}>
          <span className={styles.trendKicker}>Cash flow trend</span>
          <span className={styles.trendValue}>{formatAudCompact(netChange)}</span>
        </header>
        <BarChart
          series={trendSeries}
          xLabels={[...trendLabels]}
          ariaLabel="Cash flow by category over the trailing periods"
        />
      </div>
    </section>
  )
}

export default CashFlowStatement
