import { FieldTypeIcon } from "../form-builder/field-type-icon"
import type { FormFieldType } from "../form-builder/form-builder-types"
import type { FieldConfigDraft } from "./forms-platform-types"
import styles from "./field-config-panel.module.css"

interface FieldConfigPanelProps {
  /** The currently selected field draft. */
  draft: FieldConfigDraft
  /** Trailing helper rendered under the input row. */
  helperHint?: string
  className?: string
}

const TYPE_LABEL: Record<FormFieldType, string> = {
  "short-text": "Short text",
  "long-text": "Long text",
  email: "Email",
  phone: "Phone",
  number: "Number",
  currency: "Currency (AUD)",
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

export function FieldConfigPanel({
  draft,
  helperHint,
  className,
}: FieldConfigPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`${draft.label} configuration`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Field config</span>
        <div className={styles.titleRow}>
          <span className={styles.headIcon} aria-hidden="true">
            <FieldTypeIcon type={draft.type} size={16} />
          </span>
          <h3 className={styles.title}>{draft.label}</h3>
        </div>
        <span className={styles.subtitle}>{TYPE_LABEL[draft.type]}</span>
      </header>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Label</span>
          <span className={styles.fieldInput}>{draft.label}</span>
        </label>

        {draft.placeholder !== undefined ? (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Placeholder</span>
            <span className={`${styles.fieldInput} ${styles.fieldInputMono}`}>
              {draft.placeholder}
            </span>
          </label>
        ) : null}

        <div className={styles.field}>
          <span className={styles.fieldLabel}>Required</span>
          <div className={styles.requiredRow}>
            <span className={styles.requiredLabel}>
              <span className={styles.requiredStar} aria-hidden="true">
                *
              </span>
              {draft.required ? "Respondent must answer" : "Optional"}
            </span>
            <span
              className={[
                styles.switch,
                draft.required ? styles.switchOn : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="switch"
              aria-checked={draft.required}
              aria-label="Toggle required"
              tabIndex={0}
            >
              <span className={styles.switchThumb} />
            </span>
          </div>
        </div>

        {draft.helperText !== undefined ? (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Help text</span>
            <span className={styles.fieldInput}>
              {draft.helperText || helperHint || "Shown beneath the field"}
            </span>
          </label>
        ) : null}

        {draft.defaultValue !== undefined ? (
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Default value</span>
            <span className={`${styles.fieldInput} ${styles.fieldInputMono}`}>
              {draft.defaultValue || "—"}
            </span>
          </label>
        ) : null}

        {draft.options && draft.options.length > 0 ? (
          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              Options ({draft.options.length})
            </span>
            <ol className={styles.optionsList}>
              {draft.options.map((option, index) => (
                <li key={option.id} className={styles.optionRow}>
                  <span className={styles.optionIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{option.label}</span>
                  <span className={styles.optionValue}>{option.value}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>

      <footer className={styles.footer}>
        <button
          type="button"
          className={`${styles.footerBtn} ${styles.footerBtnDanger}`}
        >
          Delete
        </button>
        <button type="button" className={styles.footerBtn}>
          Duplicate
        </button>
      </footer>
    </section>
  )
}
