"use client"

import { useState } from "react"

import {
  ColumnListPanel,
  ConstraintChipRow,
  ErDiagramCanvas,
  IndexInspector,
  TriggerCard,
} from "../../components/db-admin"

import {
  ER_EDGES,
  ER_NODES,
  QUOTES_COLUMNS,
  QUOTES_CONSTRAINTS,
  QUOTES_INDEXES,
  QUOTES_TRIGGERS,
} from "../_mock-data"
import styles from "../db-admin.module.css"

type StageTab = "columns" | "er"

export function FullAdminStage() {
  const [tab, setTab] = useState<StageTab>("columns")

  return (
    <div className={styles.adminCenter}>
      <div className={styles.adminTabs} role="tablist" aria-label="Selected table view">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "columns"}
          className={styles.adminTab}
          onClick={() => setTab("columns")}
        >
          Columns
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "er"}
          className={styles.adminTab}
          onClick={() => setTab("er")}
        >
          ER diagram
        </button>
      </div>
      {tab === "columns" ? (
        <div className={styles.demoStack}>
          <ColumnListPanel schema="public" table="quotes" columns={QUOTES_COLUMNS} />
          <ConstraintChipRow constraints={QUOTES_CONSTRAINTS} />
          {QUOTES_INDEXES.slice(0, 3).map((index) => (
            <IndexInspector key={index.name} index={index} />
          ))}
          {QUOTES_TRIGGERS.map((trigger) => (
            <TriggerCard key={trigger.name} trigger={trigger} />
          ))}
        </div>
      ) : (
        <ErDiagramCanvas nodes={ER_NODES} edges={ER_EDGES} />
      )}
    </div>
  )
}
