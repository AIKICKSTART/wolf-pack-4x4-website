"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"

import type { SchemaColumn } from "./db-admin-types"
import styles from "./column-list-panel.module.css"

interface ColumnListPanelProps {
  /** Schema name. */
  schema: string
  /** Table name. */
  table: string
  columns: ReadonlyArray<SchemaColumn>
  className?: string
}

export function ColumnListPanel({ schema, table, columns, className }: ColumnListPanelProps) {
  const [openCommentIndex, setOpenCommentIndex] = useState<number | null>(null)
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  const pkCount = columns.filter((column) => column.isPrimaryKey).length
  const fkCount = columns.filter((column) => column.isForeignKey).length

  return (
    <section
      className={classes}
      aria-label={`Columns of ${schema}.${table}`}
    >
      <header className={styles.header}>
        <span className={styles.kicker}>Columns</span>
        <span className={styles.qualifiedName}>
          {schema}.<em>{table}</em>
        </span>
        <span className={styles.summary}>
          {columns.length} cols · {pkCount} pk · {fkCount} fk
        </span>
      </header>
      <ul className={styles.list}>
        {columns.map((column, index) => {
          const isOpen = openCommentIndex === index
          return (
            <li key={column.name} className={styles.row}>
              <div className={styles.nameCol}>
                <span className={styles.nameLine}>
                  {column.name}
                  {column.comment ? (
                    <span className={styles.commentWrap}>
                      <button
                        type="button"
                        className={styles.commentBtn}
                        aria-label={`Comment for column ${column.name}`}
                        aria-expanded={isOpen}
                        onClick={() => setOpenCommentIndex(isOpen ? null : index)}
                      >
                        <MessageSquare size={10} strokeWidth={2.4} aria-hidden="true" />
                      </button>
                      {isOpen ? (
                        <span role="tooltip" className={styles.commentPopover}>
                          {column.comment}
                        </span>
                      ) : null}
                    </span>
                  ) : null}
                </span>
                {column.defaultValue ? (
                  <span className={styles.defaultText}>
                    default: {column.defaultValue}
                  </span>
                ) : null}
              </div>
              <span className={styles.typeText}>{column.type}</span>
              <div className={styles.chips}>
                {column.isPrimaryKey ? (
                  <span className={`${styles.chip} ${styles.chipPk}`}>PK</span>
                ) : null}
                {column.isForeignKey ? (
                  <span className={`${styles.chip} ${styles.chipFk}`}>FK</span>
                ) : null}
                <span
                  className={`${styles.chip} ${
                    column.nullable ? styles.chipNull : styles.chipNotNull
                  }`}
                >
                  {column.nullable ? "NULL" : "NOT NULL"}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ColumnListPanel
