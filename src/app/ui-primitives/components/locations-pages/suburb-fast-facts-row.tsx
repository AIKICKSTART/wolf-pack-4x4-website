import type { ReactNode } from "react"

import { MaterialSurface } from "../surfaces/material-surface"

import styles from "./suburb-fast-facts-row.module.css"

export interface SuburbFastFact {
  id: string
  label: string
  value: ReactNode
  /** Optional short note shown below the value. */
  note?: ReactNode
  /** Optional accent tone — defaults to amber. */
  tone?: "red" | "amber" | "teal" | "green"
}

export interface SuburbFastFactsRowProps {
  /** Heading announced to assistive tech for the description list. */
  heading?: string
  facts: ReadonlyArray<SuburbFastFact>
  className?: string
}

const TONE_CLASS: Record<NonNullable<SuburbFastFact["tone"]>, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

/**
 * Suburb fast facts row — semantic `<dl>` of stat tiles.
 *
 * Designed to sit immediately under SuburbHero. Each entry renders as
 * a description-term + description pair so the structure is meaningful
 * without requiring an explicit visible heading.
 */
export function SuburbFastFactsRow({
  heading = "Suburb fast facts",
  facts,
  className,
}: SuburbFastFactsRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <MaterialSurface elevation={1} tone="surface" className={styles.surface}>
        <dl className={styles.list}>
          {facts.map((fact) => {
            const tone = fact.tone ?? "amber"
            return (
              <div
                key={fact.id}
                className={`${styles.tile} ${TONE_CLASS[tone]}`}
              >
                <dt className={styles.label}>{fact.label}</dt>
                <dd className={styles.value}>{fact.value}</dd>
                {fact.note ? <dd className={styles.note}>{fact.note}</dd> : null}
              </div>
            )
          })}
        </dl>
      </MaterialSurface>
    </section>
  )
}

export default SuburbFastFactsRow
