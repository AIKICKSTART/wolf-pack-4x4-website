import { Sparkline } from "../charts/sparkline"
import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./inquiry-form-capture.module.css"

export interface InquiryFormField {
  name: string
  label: string
  required: boolean
  /** Conversion rate (0-100) — percentage of visitors who completed this field. */
  conversionRate: number
  /** Per-day completion counts driving the sparkline. */
  trend: ReadonlyArray<number>
}

interface InquiryFormCaptureProps {
  title: string
  /** Overall form submission rate. */
  submissionRate: number
  fields: ReadonlyArray<InquiryFormField>
  className?: string
}

function pickTone(rate: number): "green" | "amber" | "red" {
  if (rate >= 70) return "green"
  if (rate >= 40) return "amber"
  return "red"
}

export function InquiryFormCapture({
  title,
  submissionRate,
  fields,
  className,
}: InquiryFormCaptureProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const overallTone = pickTone(submissionRate)

  return (
    <section
      className={classes}
      aria-label={`Inquiry form capture preview: ${title}`}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Inquiry capture</span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.overall}>
          <span className={styles.overallLabel}>Submission rate</span>
          <strong className={styles.overallValue} data-tone={overallTone}>
            {Math.round(submissionRate)}%
          </strong>
        </div>
      </header>

      <div className={styles.preview} aria-hidden="true">
        {fields.map((field) => (
          <div key={field.name} className={styles.previewField}>
            <span className={styles.previewLabel}>
              {field.label}
              {field.required ? <em className={styles.required}>*</em> : null}
            </span>
            <span className={styles.previewInput} />
          </div>
        ))}
        <button type="button" className={styles.previewButton} tabIndex={-1}>
          Send inquiry
        </button>
      </div>

      <ul className={styles.fieldList}>
        {fields.map((field) => {
          const tone = pickTone(field.conversionRate)
          return (
            <li key={field.name} className={styles.fieldRow}>
              <div className={styles.fieldHead}>
                <span className={styles.fieldName}>
                  {field.label}
                  {field.required ? (
                    <span className={styles.requiredBadge}>req</span>
                  ) : (
                    <span className={styles.optionalBadge}>opt</span>
                  )}
                </span>
                <span className={styles.fieldRate} data-tone={tone}>
                  {Math.round(field.conversionRate)}%
                </span>
              </div>
              <ProgressLinear
                value={field.conversionRate}
                max={100}
                tone={tone}
                variant="solid"
              />
              <div className={styles.fieldTrend}>
                <Sparkline
                  points={[...field.trend]}
                  tone={tone}
                  height={28}
                  ariaLabel={`${field.label} weekly trend`}
                />
                <span className={styles.fieldTrendLabel}>14d trend</span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default InquiryFormCapture
