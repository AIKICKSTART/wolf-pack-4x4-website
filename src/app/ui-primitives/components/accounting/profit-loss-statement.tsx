"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"
import { MetricBlock, type MetricBlockItem } from "../data-display/metric-block"
import { Sparkline } from "../charts/sparkline"

import {
  formatAud,
  formatAudCompact,
  type PeriodRef,
} from "./accounting-types"
import styles from "./profit-loss-statement.module.css"

export interface PnlLineItem {
  id: string
  account: string
  amount: number
}

export interface ProfitLossStatementProps {
  periods: ReadonlyArray<PeriodRef>
  initialPeriodIndex?: number
  /** Revenue lines (positive). */
  revenue: ReadonlyArray<PnlLineItem>
  /** Cost of goods sold lines (positive — sign handled internally). */
  cogs: ReadonlyArray<PnlLineItem>
  /** Operating expense lines (positive — sign handled internally). */
  opex: ReadonlyArray<PnlLineItem>
  /** 6-12 month trend of net profit for the sparkline. */
  netProfitTrend: ReadonlyArray<number>
  className?: string
}

function sum(items: ReadonlyArray<PnlLineItem>): number {
  return items.reduce((acc, item) => acc + item.amount, 0)
}

interface SectionRowsProps {
  title: string
  items: ReadonlyArray<PnlLineItem>
  total: number
  negative?: boolean
}

function SectionRows({ title, items, total, negative = false }: SectionRowsProps) {
  return (
    <div className={styles.section}>
      <h4 className={styles.sectionTitle}>{title}</h4>
      <table className={styles.lines}>
        <caption className={styles.sr}>{title} lines</caption>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <th scope="row" className={styles.account}>{item.account}</th>
              <td className={styles.amount}>
                {negative ? "−" : ""}
                {formatAud(item.amount)}
              </td>
            </tr>
          ))}
          <tr className={styles.subtotalRow}>
            <th scope="row" className={styles.subtotalLabel}>{`Total ${title.toLowerCase()}`}</th>
            <td className={styles.subtotal}>
              {negative ? "−" : ""}
              {formatAud(total)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function ProfitLossStatement({
  periods,
  initialPeriodIndex = 0,
  revenue,
  cogs,
  opex,
  netProfitTrend,
  className,
}: ProfitLossStatementProps) {
  const [periodIndex, setPeriodIndex] = useState(
    Math.min(Math.max(initialPeriodIndex, 0), periods.length - 1),
  )
  const period = periods[periodIndex]
  const totalRevenue = sum(revenue)
  const totalCogs = sum(cogs)
  const grossProfit = totalRevenue - totalCogs
  const totalOpex = sum(opex)
  const netProfit = grossProfit - totalOpex
  const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0
  const netMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

  const summary: ReadonlyArray<MetricBlockItem> = [
    {
      id: "revenue",
      label: "Revenue",
      value: formatAudCompact(totalRevenue),
    },
    {
      id: "gross",
      label: "Gross profit",
      value: formatAudCompact(grossProfit),
      delta: {
        label: `${grossMargin.toFixed(1)}% margin`,
        direction: grossMargin >= 30 ? "up" : grossMargin >= 0 ? "flat" : "down",
      },
    },
    {
      id: "opex",
      label: "Operating exp.",
      value: formatAudCompact(totalOpex),
    },
    {
      id: "net",
      label: "Net profit",
      value: formatAudCompact(netProfit),
      delta: {
        label: `${netMargin.toFixed(1)}% margin`,
        direction: netProfit >= 0 ? "up" : "down",
      },
    },
  ]

  return (
    <section
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Profit and loss statement for ${period.label}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.kicker}>Income statement</span>
          <h3 className={styles.title}>Profit &amp; loss</h3>
          <Chip
            label={period.label}
            tone={period.status === "closed" ? "green" : period.status === "locked" ? "red" : "teal"}
          />
        </div>
        <div className={styles.periodPicker} role="group" aria-label="Reporting period">
          {periods.map((p, idx) => (
            <button
              key={p.label}
              type="button"
              className={`${styles.periodBtn} ${idx === periodIndex ? styles.periodOn : ""}`}
              onClick={() => setPeriodIndex(idx)}
              aria-pressed={idx === periodIndex}
            >
              {p.label}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.summaryRow}>
        <MetricBlock metrics={summary} />
        <div className={styles.trend}>
          <span className={styles.trendLabel}>12-period net</span>
          <Sparkline
            points={[...netProfitTrend]}
            tone={netProfit >= 0 ? "green" : "red"}
            ariaLabel={`Net profit trend over ${netProfitTrend.length} periods`}
          />
        </div>
      </div>

      <div className={styles.body}>
        <SectionRows title="Revenue" items={revenue} total={totalRevenue} />
        <SectionRows title="Cost of goods sold" items={cogs} total={totalCogs} negative />
        <div className={styles.totalRow}>
          <span>Gross profit</span>
          <span>{formatAud(grossProfit)}</span>
        </div>
        <SectionRows title="Operating expenses" items={opex} total={totalOpex} negative />
        <div className={`${styles.totalRow} ${netProfit < 0 ? styles.totalRowBad : styles.totalRowGood}`}>
          <span>Net profit</span>
          <span>{formatAud(netProfit)}</span>
        </div>
      </div>
    </section>
  )
}

export default ProfitLossStatement
