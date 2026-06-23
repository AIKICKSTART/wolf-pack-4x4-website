import type { FormFieldType, ValidationRule } from "./form-builder-types"
import styles from "./validation-rules-editor.module.css"

interface ValidationRulesEditorProps {
  /** Validation rules being displayed. Render order is preserved. */
  rules: ReadonlyArray<ValidationRule>
  /** Optional field type used to drive the available-rule hint chips. */
  fieldType?: FormFieldType
  /** Title shown above the chip list. */
  title?: string
  className?: string
}

export function ValidationRulesEditor({
  rules,
  fieldType,
  title = "Validation",
  className,
}: ValidationRulesEditorProps) {
  const classes = [styles.editor, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Field validation rules">
      <header className={styles.head}>
        <span className={styles.kicker}>Validation rules</span>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {fieldType ? (
            <p className={styles.subtitle}>
              Suggestions tuned for the <code>{fieldType}</code> type.
            </p>
          ) : null}
        </div>
      </header>

      <ul className={styles.list} role="list">
        {rules.map((rule) => (
          <li key={rule.id} className={styles.item}>
            <button
              type="button"
              className={[
                styles.chip,
                rule.enabled ? styles.chipOn : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={rule.enabled}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{rule.label}</span>
              {rule.hint ? <span className={styles.hint}>{rule.hint}</span> : null}
            </button>
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <button type="button" className={styles.addBtn}>
          <span aria-hidden="true">+</span> Custom rule
        </button>
        <span className={styles.footerHint}>
          Rules combine with AND — all enabled rules must pass.
        </span>
      </footer>
    </section>
  )
}
