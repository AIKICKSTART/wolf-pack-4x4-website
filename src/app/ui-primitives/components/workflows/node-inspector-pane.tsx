"use client"

import { Play, Trash2 } from "lucide-react"
import { useState } from "react"

import type { WorkflowNodeKind } from "./workflow-types"
import styles from "./node-inspector-pane.module.css"

export interface InspectorField {
  id: string
  label: string
  value: string
  /** Render the value with monospace styling — useful for expressions. */
  code?: boolean
}

interface NodeInspectorPaneProps {
  /** Node kind drives chip color and copy. */
  kind: WorkflowNodeKind
  /** Display name of the selected node. */
  name: string
  /** Subline e.g. service + version. */
  subtitle?: string
  /** Configuration fields shown on the Config tab. */
  configFields: ReadonlyArray<InspectorField>
  /** Advanced fields revealed via the expander. */
  advancedFields?: ReadonlyArray<InspectorField>
  className?: string
}

const KIND_CHIP_CLASS: Record<WorkflowNodeKind, string> = {
  trigger: styles.kindChipAmber,
  action: styles.kindChipTeal,
  condition: styles.kindChipGreen,
  loop: styles.kindChipRed,
  wait: styles.kindChipAmber,
  end: styles.kindChipNeutral,
}

const KIND_LABEL: Record<WorkflowNodeKind, string> = {
  trigger: "Trigger",
  action: "Action",
  condition: "Condition",
  loop: "Loop",
  wait: "Delay",
  end: "End",
}

type InspectorTab = "config" | "test" | "notes"

export function NodeInspectorPane({
  kind,
  name,
  subtitle,
  configFields,
  advancedFields,
  className,
}: NodeInspectorPaneProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("config")
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const classes = [styles.pane, className].filter(Boolean).join(" ")
  const TABS: ReadonlyArray<{ id: InspectorTab; label: string }> = [
    { id: "config", label: "Config" },
    { id: "test", label: "Test" },
    { id: "notes", label: "Notes" },
  ]

  return (
    <section className={classes} aria-label={`${name} inspector`}>
      <header className={styles.header}>
        <span className={[styles.kindChip, KIND_CHIP_CLASS[kind]].join(" ")}>
          {KIND_LABEL[kind]}
        </span>
        <h3 className={styles.title}>{name}</h3>
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Inspector tabs">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[styles.tabBtn, isActive ? styles.tabActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className={styles.fields} role="tabpanel">
        {activeTab === "config"
          ? configFields.map((field) => (
              <label key={field.id} className={styles.field}>
                <span className={styles.fieldLabel}>{field.label}</span>
                <span
                  className={[
                    styles.fieldInput,
                    field.code ? styles.fieldInputCode : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {field.value}
                </span>
              </label>
            ))
          : null}

        {activeTab === "test" ? (
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Sample payload</span>
            <span className={[styles.fieldInput, styles.fieldInputCode].join(" ")}>
              {`{\n  "ok": true\n}`}
            </span>
          </div>
        ) : null}

        {activeTab === "notes" ? (
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Internal notes</span>
            <span className={styles.fieldInput}>
              Add comments visible to the workflow team.
            </span>
          </div>
        ) : null}

        {advancedFields && advancedFields.length > 0 ? (
          <div className={styles.advanced}>
            <button
              type="button"
              className={styles.advancedHeader}
              aria-expanded={advancedOpen}
              onClick={() => setAdvancedOpen((value) => !value)}
            >
              <span>Advanced</span>
              <span aria-hidden="true">{advancedOpen ? "−" : "+"}</span>
            </button>
            {advancedOpen
              ? advancedFields.map((field) => (
                  <label key={field.id} className={styles.field}>
                    <span className={styles.fieldLabel}>{field.label}</span>
                    <span
                      className={[
                        styles.fieldInput,
                        field.code ? styles.fieldInputCode : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {field.value}
                    </span>
                  </label>
                ))
              : null}
          </div>
        ) : null}
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.deleteBtn}>
          <Trash2 aria-hidden="true" /> Delete node
        </button>
        <button type="button" className={styles.runBtn}>
          <Play aria-hidden="true" /> Test run
        </button>
      </footer>
    </section>
  )
}
