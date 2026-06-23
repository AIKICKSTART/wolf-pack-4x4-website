"use client"

import { Check, X, RotateCcw } from "lucide-react"

import { Chip } from "../primitives/chip"

import { formatCurrency } from "./quote-types"
import styles from "./counter-offer-card.module.css"

export interface CounterOfferChange {
  lineId: string
  title: string
  original: number
  revised: number
}

interface CounterOfferCardProps {
  customerName: string
  submittedAt: string
  changes: ReadonlyArray<CounterOfferChange>
  revisedTotal: number
  originalTotal: number
  customerNote: string
  currency?: string
  onAccept?: () => void
  onCounter?: () => void
  onReject?: () => void
}

export function CounterOfferCard({
  customerName,
  submittedAt,
  changes,
  revisedTotal,
  originalTotal,
  customerNote,
  currency = "AUD",
  onAccept,
  onCounter,
  onReject,
}: CounterOfferCardProps) {
  const delta = revisedTotal - originalTotal
  return (
    <article className={styles.card} aria-labelledby="counter-offer-title">
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>Counter-offer received</span>
          <h3 id="counter-offer-title" className={styles.title}>
            {customerName} proposed changes
          </h3>
          <span className={styles.stamp}>{submittedAt}</span>
        </div>
        <Chip
          label={`${delta < 0 ? "-" : "+"}${formatCurrency(Math.abs(delta), currency)}`}
          tone={delta < 0 ? "red" : "green"}
        />
      </header>

      <section className={styles.section} aria-labelledby="counter-changes-title">
        <h4 id="counter-changes-title" className={styles.sectionTitle}>Changed lines</h4>
        <ul className={styles.list}>
          {changes.map((change) => (
            <li key={change.lineId} className={styles.change}>
              <span className={styles.changeTitle}>{change.title}</span>
              <span className={styles.changeRow}>
                <span className={styles.changeOriginal}>
                  {formatCurrency(change.original, currency)}
                </span>
                <span className={styles.changeArrow} aria-hidden="true">→</span>
                <strong className={styles.changeRevised}>
                  {formatCurrency(change.revised, currency)}
                </strong>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="counter-totals-title">
        <h4 id="counter-totals-title" className={styles.sectionTitle}>Revised total</h4>
        <div className={styles.totals}>
          <div className={styles.totalsRow}>
            <span>Original</span>
            <span className={styles.original}>{formatCurrency(originalTotal, currency)}</span>
          </div>
          <div className={styles.totalsRow}>
            <span>Revised</span>
            <strong className={styles.revised}>{formatCurrency(revisedTotal, currency)}</strong>
          </div>
        </div>
      </section>

      <section className={styles.note} aria-labelledby="counter-note-title">
        <h4 id="counter-note-title" className={styles.sectionTitle}>Customer note</h4>
        <blockquote className={styles.quote}>{customerNote}</blockquote>
      </section>

      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={onAccept}>
          <Check size={14} aria-hidden="true" /> Accept counter
        </button>
        <button type="button" className={styles.counter} onClick={onCounter}>
          <RotateCcw size={14} aria-hidden="true" /> Send another counter
        </button>
        <button type="button" className={styles.reject} onClick={onReject}>
          <X size={14} aria-hidden="true" /> Reject
        </button>
      </div>
    </article>
  )
}

export default CounterOfferCard
