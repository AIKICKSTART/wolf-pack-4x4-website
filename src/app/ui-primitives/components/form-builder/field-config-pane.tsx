"use client"

import { useState } from "react"

import { FieldTypeIcon } from "./field-type-icon"
import type {
  FormBuilderField,
  ValidationRule,
} from "./form-builder-types"
import styles from "./field-config-pane.module.css"

interface FieldConfigPaneProps {
  /** Selected field being edited. */
  field: FormBuilderField
  /** Optional list of validation rules rendered as chips in the editor area. */
  validationRules?: ReadonlyArray<ValidationRule>
  className?: string
}

const TYPE_LABEL: Record<FormBuilderField["type"], string> = {
  "short-text": "Short text",
  "long-text": "Long text",
  email: "Email",
  phone: "Phone",
  number: "Number",
  currency: "Currency",
  date: "Date",
  dropdown: "Dropdown",
  "multi-select": "Multi-select",
  rating: "Rating",
  "file-upload": "File upload",
  signature: "Signature",
  address: "Address",
  payment: "Payment",
  "yes-no": "Yes / No",
}

export function FieldConfigPane({
  field,
  validationRules,
  className,
}: FieldConfigPaneProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const classes = [styles.pane, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`${field.label} configuration`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Field inspector</span>
        <div className={styles.headRow}>
          <span className={styles.headIcon} aria-hidden="true">
            <FieldTypeIcon type={field.type} size={16} />
          </span>
          <h3 className={styles.title}>{field.label}</h3>
        </div>
        <span className={styles.subtitle}>{TYPE_LABEL[field.type]}</span>
      </header>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Label</span>
          <span className={styles.fieldInput}>{field.label}</span>
        </label>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Placeholder</span>
          <span className={styles.fieldInput}>
            {field.placeholder ?? "e.g. Hilux"}
          </span>
        </label>

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Required</span>
          <span className={styles.toggleRow}>
            <span
              className={[
                styles.toggle,
                field.required ? styles.toggleOn : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="switch"
              aria-checked={Boolean(field.required)}
              tabIndex={0}
            >
              <span className={styles.toggleThumb} />
            </span>
            <span className={styles.toggleLabel}>
              {field.required ? "Respondent must answer" : "Optional"}
            </span>
          </span>
        </div>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Default value</span>
          <span className={styles.fieldInput}>
            {field.defaultValue ?? "—"}
          </span>
        </label>

        {validationRules && validationRules.length > 0 ? (
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Validation rules</span>
            <div className={styles.ruleChips}>
              {validationRules.map((rule) => (
                <span
                  key={rule.id}
                  className={[
                    styles.ruleChip,
                    rule.enabled ? styles.ruleChipOn : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={styles.ruleChipDot} aria-hidden="true" />
                  {rule.label}
                  {rule.hint ? (
                    <span className={styles.ruleChipHint}>{rule.hint}</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
        ) : null}

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
          {advancedOpen ? (
            <div className={styles.advancedFields}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>CSS class</span>
                <span className={styles.fieldInput}>field-vehicle-make</span>
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Conditional show</span>
                <span className={styles.fieldInput}>
                  Visible when previous step complete
                </span>
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Help text</span>
                <span className={styles.fieldInput}>
                  {field.help ?? "Shown beneath the field"}
                </span>
              </label>
            </div>
          ) : null}
        </div>
      </div>

      <footer className={styles.footer}>
        <button type="button" className={styles.deleteBtn}>
          Delete field
        </button>
        <button type="button" className={styles.duplicateBtn}>
          Duplicate
        </button>
      </footer>
    </section>
  )
}
