import { AlertTriangle, Check, X } from "lucide-react"

import styles from "./fitment-compatibility-checker.module.css"

export type CompatibilityResult = "compatible" | "adapter" | "not-compatible"

export interface FitmentPartSpec {
  sku: string
  title: string
  /** Short description, e.g. "3in cat-back stainless". */
  summary: string
  /** Spec entries shown in the right-hand panel. */
  specs: ReadonlyArray<{ label: string; value: string }>
}

export interface FitmentCheckerProps {
  /** Make options, with the currently selected one first. */
  makes: ReadonlyArray<string>
  /** Model options, dependent on the chosen make. */
  models: ReadonlyArray<string>
  /** Year options, dependent on the chosen model. */
  years: ReadonlyArray<number>
  selectedMake: string
  selectedModel: string
  selectedYear: number
  part: FitmentPartSpec
  result: CompatibilityResult
  /** Short headline shown next to the result icon. */
  resultTitle: string
  /** Explanatory paragraph below the headline. */
  resultDetail: string
}

const RESULT_ICON: Record<CompatibilityResult, typeof Check> = {
  compatible: Check,
  adapter: AlertTriangle,
  "not-compatible": X,
}

export function FitmentCompatibilityChecker({
  makes,
  models,
  years,
  selectedMake,
  selectedModel,
  selectedYear,
  part,
  result,
  resultTitle,
  resultDetail,
}: FitmentCheckerProps) {
  const Icon = RESULT_ICON[result]

  return (
    <section className={styles.checker} aria-label="Fitment compatibility checker">
      <header className={styles.head}>
        <span className={styles.kicker}>Fitment check</span>
        <h3 className={styles.title}>Confirm vehicle compatibility</h3>
        <p className={styles.subhead}>
          Pick a vehicle and we will cross-reference the part against the
          factory specs, ADR notes, and our prior fitment evidence from the Oak
          Flats workshop.
        </p>
      </header>

      <div className={styles.column}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="fcc-make">
            Make
          </label>
          <div className={styles.fieldControl}>
            <select id="fcc-make" defaultValue={selectedMake} aria-label="Make">
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="fcc-model">
            Model
          </label>
          <div className={styles.fieldControl}>
            <select
              id="fcc-model"
              defaultValue={selectedModel}
              aria-label="Model"
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="fcc-year">
            Year
          </label>
          <div className={styles.fieldControl}>
            <select
              id="fcc-year"
              defaultValue={selectedYear}
              aria-label="Year"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <aside className={styles.partPanel} aria-label="Selected part">
        <div className={styles.partTitle}>
          <strong>{part.title}</strong>
          <span>{part.sku} · {part.summary}</span>
        </div>
        <div className={styles.thumbnail} aria-hidden="true">
          {part.sku.split("-").pop()}
        </div>
        <dl className={styles.specGrid}>
          {part.specs.map((spec) => (
            <li key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </li>
          ))}
        </dl>
      </aside>

      <div
        className={styles.result}
        data-result={result}
        role="status"
        aria-live="polite"
      >
        <span className={styles.icon} aria-hidden="true">
          <Icon strokeWidth={2.6} />
        </span>
        <div className={styles.resultBody}>
          <h4 className={styles.resultTitle}>{resultTitle}</h4>
          <p className={styles.resultCopy}>{resultDetail}</p>
        </div>
      </div>
    </section>
  )
}

export default FitmentCompatibilityChecker
