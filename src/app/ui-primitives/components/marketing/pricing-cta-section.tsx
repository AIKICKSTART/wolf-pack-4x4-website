import type { ReactNode } from "react"

import {
  ComparisonTable,
  type ComparisonColumn,
  type ComparisonRow,
} from "../data-display/comparison-table"

import styles from "./pricing-cta-section.module.css"

export interface PricingCtaAction {
  label: string
  href: string
  variant?: "primary" | "secondary"
}

export interface PricingCtaSectionProps {
  kicker?: string
  heading: string
  body?: string
  columns: ReadonlyArray<ComparisonColumn>
  rows: ReadonlyArray<ComparisonRow>
  footnote?: ReactNode
  actions: ReadonlyArray<PricingCtaAction>
  className?: string
}

export function PricingCtaSection({
  kicker,
  heading,
  body,
  columns,
  rows,
  footnote,
  actions,
  className,
}: PricingCtaSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading}>
      <header className={styles.header}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 className={styles.heading}>{heading}</h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </header>

      <ComparisonTable
        columns={columns}
        rows={rows}
        caption={`${heading} — feature comparison`}
        className={styles.table}
      />

      <footer className={styles.cta}>
        {footnote ? <p className={styles.footnote}>{footnote}</p> : null}
        <div className={styles.actions}>
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`${styles.action} ${
                action.variant === "secondary" ? styles.actionSecondary : styles.actionPrimary
              }`}
            >
              <span>{action.label}</span>
              <span className={styles.arrow} aria-hidden="true" />
            </a>
          ))}
        </div>
      </footer>
    </section>
  )
}

export default PricingCtaSection
