import styles from "./data-mapping-row.module.css"

export type DataMappingTransform =
  | "identity"
  | "uppercase"
  | "lowercase"
  | "iso-date"
  | "currency-aud"
  | "trim"
  | "phone-e164"
  | "split-comma"

export interface DataMappingRowProps {
  /** Source field, e.g. "shopify.customer.email". */
  sourceField: string
  /** Source field type, e.g. "string", "money", "datetime". */
  sourceType: string
  /** Target field, e.g. "payload.users.email". */
  targetField: string
  /** Target field type. */
  targetType: string
  transform: DataMappingTransform
  /** True when the field is required. */
  required?: boolean
  /** Optional validation chip, e.g. "Email format". */
  validation?: string
  className?: string
}

const TRANSFORM_LABEL: Record<DataMappingTransform, string> = {
  identity: "1:1",
  uppercase: "UPPER",
  lowercase: "lower",
  "iso-date": "→ ISO 8601",
  "currency-aud": "→ AUD cents",
  trim: "trim",
  "phone-e164": "→ E.164",
  "split-comma": "split ‘,’",
}

const TRANSFORM_TONE: Record<DataMappingTransform, string> = {
  identity: styles.transformNeutral,
  uppercase: styles.transformAmber,
  lowercase: styles.transformAmber,
  "iso-date": styles.transformTeal,
  "currency-aud": styles.transformGreen,
  trim: styles.transformNeutral,
  "phone-e164": styles.transformTeal,
  "split-comma": styles.transformViolet,
}

export function DataMappingRow({
  sourceField,
  sourceType,
  targetField,
  targetType,
  transform,
  required = false,
  validation,
  className,
}: DataMappingRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")
  return (
    <article
      className={classes}
      role="region"
      aria-label={`Mapping ${sourceField} (${sourceType}) → ${targetField} (${targetType}) with ${TRANSFORM_LABEL[transform]} transform`}
    >
      <div className={styles.side}>
        <span className={styles.sideLabel}>Source</span>
        <code className={styles.field}>{sourceField}</code>
        <span className={styles.type}>{sourceType}</span>
      </div>

      <div className={styles.bridge} aria-hidden="true">
        <span className={styles.bridgeLine} />
        <span className={[styles.transformChip, TRANSFORM_TONE[transform]].join(" ")}>
          {TRANSFORM_LABEL[transform]}
        </span>
        <span className={styles.bridgeLine} />
        <span className={styles.bridgeArrow}>›</span>
      </div>

      <div className={styles.side}>
        <span className={styles.sideLabel}>Target</span>
        <code className={styles.field}>{targetField}</code>
        <div className={styles.targetMeta}>
          <span className={styles.type}>{targetType}</span>
          {required ? (
            <span className={styles.requiredChip} title="Required field">
              required
            </span>
          ) : null}
          {validation ? <span className={styles.validationChip}>{validation}</span> : null}
        </div>
      </div>
    </article>
  )
}

export default DataMappingRow
