"use client"

import { useState } from "react"

import type { ConstraintKind, ConstraintRecord } from "./db-admin-types"
import styles from "./constraint-chip-row.module.css"

interface ConstraintChipRowProps {
  constraints: ReadonlyArray<ConstraintRecord>
  className?: string
}

const KIND_LABEL: Record<ConstraintKind, string> = {
  primary_key: "PK",
  foreign_key: "FK",
  unique: "UQ",
  check: "CK",
  not_null: "NN",
}

const KIND_CLASS: Record<ConstraintKind, string> = {
  primary_key: styles.kindPk,
  foreign_key: styles.kindFk,
  unique: styles.kindUnique,
  check: styles.kindCheck,
  not_null: styles.kindNotNull,
}

export function ConstraintChipRow({ constraints, className }: ConstraintChipRowProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Table constraints">
      <span className={styles.label}>Constraints</span>
      {constraints.map((constraint, index) => {
        const isOpen = openIndex === index
        return (
          <span key={`${constraint.kind}-${constraint.name}`} className={styles.detailWrap}>
            <button
              type="button"
              className={`${styles.chip} ${KIND_CLASS[constraint.kind]}`}
              aria-expanded={isOpen}
              aria-label={`Constraint ${constraint.name}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className={styles.chipKind}>{KIND_LABEL[constraint.kind]}</span>
              <span className={styles.chipCols}>{constraint.columns.join(", ")}</span>
            </button>
            {isOpen ? (
              <span role="dialog" className={styles.details}>
                <span>
                  <span className={styles.detailKey}>Name</span>
                  {constraint.name}
                </span>
                <span>
                  <span className={styles.detailKey}>Columns</span>
                  {constraint.columns.join(", ")}
                </span>
                {constraint.references ? (
                  <span>
                    <span className={styles.detailKey}>References</span>
                    {constraint.references.table}
                    ({constraint.references.columns.join(", ")})
                  </span>
                ) : null}
                {constraint.expression ? (
                  <span>
                    <span className={styles.detailKey}>Expression</span>
                    {constraint.expression}
                  </span>
                ) : null}
              </span>
            ) : null}
          </span>
        )
      })}
    </section>
  )
}

export default ConstraintChipRow
