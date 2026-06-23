import { FieldTypeIcon } from "./field-type-icon"
import type { FormBuilderField, FormFieldType } from "./form-builder-types"
import styles from "./field-preview.module.css"

interface FieldPreviewProps {
  field: FormBuilderField
  /** Surface theme — defaults to the workshop dark theme. */
  theme?: "minimal" | "workshop-dark" | "editorial-light" | "brutalist"
  className?: string
}

const TYPE_LABEL: Record<FormFieldType, string> = {
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

const THEME_CLASS: Record<NonNullable<FieldPreviewProps["theme"]>, string> = {
  minimal: styles.themeMinimal,
  "workshop-dark": styles.themeWorkshop,
  "editorial-light": styles.themeEditorial,
  brutalist: styles.themeBrutalist,
}

export function FieldPreview({
  field,
  theme = "workshop-dark",
  className,
}: FieldPreviewProps) {
  const classes = [styles.preview, THEME_CLASS[theme], className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Preview of ${field.label}`}
    >
      <header className={styles.head}>
        <div className={styles.headRow}>
          <span className={styles.headIcon} aria-hidden="true">
            <FieldTypeIcon type={field.type} size={14} />
          </span>
          <span className={styles.kicker}>{TYPE_LABEL[field.type]}</span>
        </div>
        <span className={styles.previewLabel}>
          {field.label}
          {field.required ? (
            <span className={styles.requiredStar} aria-label="Required">
              *
            </span>
          ) : null}
        </span>
        {field.help ? <span className={styles.help}>{field.help}</span> : null}
      </header>

      <div className={styles.control}>{renderControl(field)}</div>
    </article>
  )
}

function renderControl(field: FormBuilderField) {
  const placeholder = field.placeholder ?? ""
  const options = field.options ?? []

  switch (field.type) {
    case "short-text":
    case "email":
    case "phone":
    case "number":
      return (
        <div className={styles.input}>
          <span className={styles.inputPlaceholder}>{placeholder}</span>
          <span className={styles.caret} aria-hidden="true" />
        </div>
      )
    case "currency":
      return (
        <div className={styles.input}>
          <span className={styles.prefix}>$</span>
          <span className={styles.inputPlaceholder}>{placeholder || "0.00"}</span>
        </div>
      )
    case "long-text":
      return (
        <div className={[styles.input, styles.inputTextarea].join(" ")}>
          <span className={styles.inputPlaceholder}>{placeholder}</span>
        </div>
      )
    case "date":
      return (
        <div className={[styles.input, styles.inputDate].join(" ")}>
          <span className={styles.inputPlaceholder}>{placeholder || "Pick a date"}</span>
          <span className={styles.suffix} aria-hidden="true">
            <FieldTypeIcon type="date" size={14} />
          </span>
        </div>
      )
    case "dropdown":
      return (
        <div className={[styles.input, styles.inputDropdown].join(" ")}>
          <span className={styles.inputPlaceholder}>
            {options[0] ?? placeholder ?? "Select…"}
          </span>
          <span className={styles.chevron} aria-hidden="true">
            ▾
          </span>
        </div>
      )
    case "multi-select":
      return (
        <div className={styles.chipRow}>
          {(options.length > 0 ? options : ["Option A", "Option B", "Option C"]).map(
            (opt) => (
              <span key={opt} className={styles.optionChip}>
                {opt}
              </span>
            ),
          )}
        </div>
      )
    case "rating":
      return (
        <div className={styles.rating} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((index) => (
            <span
              key={index}
              className={[
                styles.star,
                index < 3 ? styles.starOn : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              ★
            </span>
          ))}
        </div>
      )
    case "file-upload":
      return (
        <div className={styles.upload}>
          <span className={styles.uploadIcon} aria-hidden="true">
            <FieldTypeIcon type="file-upload" size={18} />
          </span>
          <span className={styles.uploadCopy}>
            Drag a file here or <span className={styles.link}>browse</span>
          </span>
          <span className={styles.uploadHint}>Max 10 MB · JPG / PNG / PDF</span>
        </div>
      )
    case "signature":
      return (
        <div className={styles.signature}>
          <svg
            viewBox="0 0 240 60"
            preserveAspectRatio="none"
            className={styles.signaturePath}
            aria-hidden="true"
          >
            <path
              d="M5 45 C 20 20, 40 10, 60 30 S 100 60, 120 32 S 160 5, 180 28 S 220 50, 235 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </svg>
          <span className={styles.signatureBaseline} aria-hidden="true" />
          <span className={styles.signatureHint}>Sign above the line</span>
        </div>
      )
    case "address":
      return (
        <div className={styles.addressGrid}>
          <span className={styles.input}>
            <span className={styles.inputPlaceholder}>Street</span>
          </span>
          <span className={styles.input}>
            <span className={styles.inputPlaceholder}>Suburb</span>
          </span>
          <span className={styles.input}>
            <span className={styles.inputPlaceholder}>State</span>
          </span>
          <span className={styles.input}>
            <span className={styles.inputPlaceholder}>Postcode</span>
          </span>
        </div>
      )
    case "payment":
      return (
        <div className={styles.payment}>
          <span className={styles.paymentRow}>
            <span className={styles.input}>
              <span className={styles.inputPlaceholder}>4242 4242 4242 4242</span>
            </span>
          </span>
          <span className={styles.paymentSplit}>
            <span className={styles.input}>
              <span className={styles.inputPlaceholder}>MM / YY</span>
            </span>
            <span className={styles.input}>
              <span className={styles.inputPlaceholder}>CVC</span>
            </span>
          </span>
        </div>
      )
    case "yes-no":
      return (
        <div className={styles.yesNoRow}>
          <button type="button" className={[styles.yesNoBtn, styles.yesNoOn].join(" ")}>
            Yes
          </button>
          <button type="button" className={styles.yesNoBtn}>
            No
          </button>
        </div>
      )
    default:
      return null
  }
}
