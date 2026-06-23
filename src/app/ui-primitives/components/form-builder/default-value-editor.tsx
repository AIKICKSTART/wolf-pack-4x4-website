import { FieldTypeIcon } from "./field-type-icon"
import type { FormFieldType } from "./form-builder-types"
import styles from "./default-value-editor.module.css"

interface DefaultValueEditorProps {
  /** Field type drives which input UI is rendered. */
  type: FormFieldType
  /** Current default value — rendered as static text (visual reference). */
  value?: string
  /** Optional placeholder for inputs that show no value. */
  placeholder?: string
  /** Optional options for dropdown / multi-select / rating / yes-no. */
  options?: ReadonlyArray<string>
  className?: string
}

export function DefaultValueEditor({
  type,
  value,
  placeholder,
  options,
  className,
}: DefaultValueEditorProps) {
  const classes = [styles.editor, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Default value editor">
      <header className={styles.head}>
        <span className={styles.kicker}>Default value</span>
        <div className={styles.headRow}>
          <span className={styles.headIcon} aria-hidden="true">
            <FieldTypeIcon type={type} size={14} />
          </span>
          <span className={styles.headLabel}>{describe(type)}</span>
        </div>
      </header>

      <div className={styles.body}>{renderEditor({ type, value, placeholder, options })}</div>

      <footer className={styles.footer}>
        <span className={styles.hint}>
          Pre-fills the field when respondents arrive.
        </span>
        <button type="button" className={styles.clearBtn}>
          Clear default
        </button>
      </footer>
    </section>
  )
}

interface RenderArgs {
  type: FormFieldType
  value?: string
  placeholder?: string
  options?: ReadonlyArray<string>
}

function renderEditor({ type, value, placeholder, options }: RenderArgs) {
  const placeholderCopy = placeholder ?? "—"
  switch (type) {
    case "short-text":
    case "email":
    case "phone":
    case "long-text":
    case "address":
      return (
        <div className={[styles.input, type === "long-text" ? styles.inputTextarea : ""].filter(Boolean).join(" ")}>
          <span className={styles.inputValue}>{value ?? placeholderCopy}</span>
        </div>
      )
    case "number":
      return (
        <div className={styles.input}>
          <span className={styles.inputValue}>{value ?? "0"}</span>
          <span className={styles.stepper} aria-hidden="true">
            <span>▴</span>
            <span>▾</span>
          </span>
        </div>
      )
    case "currency":
      return (
        <div className={styles.input}>
          <span className={styles.prefix}>$</span>
          <span className={styles.inputValue}>{value ?? "0.00"}</span>
          <span className={styles.suffix}>AUD</span>
        </div>
      )
    case "date":
      return (
        <div className={[styles.input, styles.inputDate].join(" ")}>
          <FieldTypeIcon type="date" size={14} />
          <span className={styles.inputValue}>{value ?? "Today"}</span>
          <span className={styles.chevron} aria-hidden="true">▾</span>
        </div>
      )
    case "dropdown":
      return (
        <div className={[styles.input, styles.inputDropdown].join(" ")}>
          <span className={styles.inputValue}>
            {value ?? options?.[0] ?? "Select an option"}
          </span>
          <span className={styles.chevron} aria-hidden="true">▾</span>
        </div>
      )
    case "multi-select":
      return (
        <div className={styles.chipRow}>
          {(options && options.length > 0 ? options : ["Quiet", "Throaty"]).map((opt) => (
            <span
              key={opt}
              className={[
                styles.optionChip,
                value && value.split(",").map((v) => v.trim()).includes(opt) ? styles.optionChipOn : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {opt}
            </span>
          ))}
        </div>
      )
    case "rating":
      return (
        <div className={styles.rating} aria-hidden="true">
          {[1, 2, 3, 4, 5].map((index) => {
            const score = value ? parseInt(value, 10) : 0
            return (
              <span
                key={index}
                className={[styles.star, index <= score ? styles.starOn : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                ★
              </span>
            )
          })}
        </div>
      )
    case "yes-no":
      return (
        <div className={styles.yesNoRow}>
          <button
            type="button"
            className={[styles.yesNoBtn, value === "yes" ? styles.yesNoOn : ""]
              .filter(Boolean)
              .join(" ")}
          >
            Yes
          </button>
          <button
            type="button"
            className={[styles.yesNoBtn, value === "no" ? styles.yesNoOn : ""]
              .filter(Boolean)
              .join(" ")}
          >
            No
          </button>
        </div>
      )
    case "file-upload":
      return (
        <div className={styles.fileRow}>
          <span className={styles.fileChip}>{value ?? "No default file"}</span>
          <button type="button" className={styles.browseBtn}>
            Browse
          </button>
        </div>
      )
    case "signature":
      return (
        <div className={styles.signature}>
          <span className={styles.signatureHint}>
            Signatures don&rsquo;t pre-fill — collected at submission.
          </span>
        </div>
      )
    case "payment":
      return (
        <div className={styles.payment}>
          <span className={styles.paymentHint}>
            Payments don&rsquo;t pre-fill — captured securely at submission.
          </span>
        </div>
      )
    default:
      return null
  }
}

function describe(type: FormFieldType): string {
  switch (type) {
    case "short-text":
      return "Text input"
    case "long-text":
      return "Paragraph"
    case "email":
      return "Email"
    case "phone":
      return "Phone"
    case "number":
      return "Number"
    case "currency":
      return "Currency"
    case "date":
      return "Date picker"
    case "dropdown":
      return "Dropdown select"
    case "multi-select":
      return "Multi-select chips"
    case "rating":
      return "Star rating"
    case "file-upload":
      return "File upload"
    case "signature":
      return "Signature pad"
    case "address":
      return "Address block"
    case "payment":
      return "Payment"
    case "yes-no":
      return "Yes / No"
    default:
      return type
  }
}
