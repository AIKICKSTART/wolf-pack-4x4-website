"use client"

import { useId, useState, type ChangeEvent } from "react"

import styles from "./retention-schedule-editor.module.css"

export type DurationUnit = "days" | "months" | "years"

export type DisposalMethod =
  | "secure-erase"
  | "crypto-erase"
  | "physical-destruction"
  | "anonymisation"
  | "archival-cold-storage"

export interface RetentionRule {
  recordId: string
  category: string
  durationAmount: number
  durationUnit: DurationUnit
  disposalMethod: DisposalMethod
  legalHold: boolean
}

export interface RetentionScheduleEditorProps {
  initialRule: RetentionRule
  /** Optional override of category options. */
  categoryOptions?: ReadonlyArray<string>
  onChange?: (rule: RetentionRule) => void
  className?: string
}

const DURATION_LABEL: Record<DurationUnit, string> = {
  days: "days",
  months: "months",
  years: "years",
}

const DISPOSAL_LABEL: Record<DisposalMethod, string> = {
  "secure-erase": "Secure erase (NIST 800-88)",
  "crypto-erase": "Crypto-erase (key destruction)",
  "physical-destruction": "Physical destruction",
  anonymisation: "Anonymisation",
  "archival-cold-storage": "Archival cold storage",
}

const DEFAULT_CATEGORIES: ReadonlyArray<string> = [
  "Customer identifiers",
  "Vehicle service history",
  "Payment + invoices",
  "Mechanic certifications",
  "CCTV (workshop bays)",
  "Telephony recordings",
]

export function RetentionScheduleEditor({
  initialRule,
  categoryOptions = DEFAULT_CATEGORIES,
  onChange,
  className,
}: RetentionScheduleEditorProps) {
  const [rule, setRule] = useState<RetentionRule>(initialRule)
  const fieldId = useId()

  const update = (patch: Partial<RetentionRule>) => {
    const next = { ...rule, ...patch }
    setRule(next)
    onChange?.(next)
  }

  const handleCategory = (event: ChangeEvent<HTMLSelectElement>) =>
    update({ category: event.target.value })

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = Number.parseInt(event.target.value, 10)
    const amount = Number.isNaN(raw) ? 0 : Math.max(0, raw)
    update({ durationAmount: amount })
  }

  const handleUnit = (event: ChangeEvent<HTMLSelectElement>) =>
    update({ durationUnit: event.target.value as DurationUnit })

  const handleDisposal = (event: ChangeEvent<HTMLSelectElement>) =>
    update({ disposalMethod: event.target.value as DisposalMethod })

  const toggleLegalHold = () =>
    update({ legalHold: !rule.legalHold })

  return (
    <section
      className={[styles.editor, className].filter(Boolean).join(" ")}
      aria-label={`Retention rule editor for ${rule.category}`}
    >
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>Retention schedule</span>
          <h3 className={styles.title}>Retention rule</h3>
          <code className={styles.recordId}>{rule.recordId}</code>
        </div>
        {rule.legalHold ? (
          <span className={styles.legalHold}>
            <span className={styles.legalHoldDot} aria-hidden="true" />
            Legal hold active — disposal suspended
          </span>
        ) : null}
      </header>

      <div className={styles.fieldRow}>
        <label className={styles.field} htmlFor={`${fieldId}-category`}>
          <span className={styles.label}>Data category</span>
          <select
            id={`${fieldId}-category`}
            className={styles.select}
            value={rule.category}
            onChange={handleCategory}
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.field}>
          <span className={styles.label}>Retention duration</span>
          <div className={styles.durationGroup}>
            <input
              type="number"
              className={styles.input}
              min={0}
              value={rule.durationAmount}
              onChange={handleAmount}
              aria-label="Duration amount"
            />
            <select
              className={styles.select}
              value={rule.durationUnit}
              onChange={handleUnit}
              aria-label="Duration unit"
            >
              {(Object.keys(DURATION_LABEL) as DurationUnit[]).map((u) => (
                <option key={u} value={u}>
                  {DURATION_LABEL[u]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className={styles.field} htmlFor={`${fieldId}-disposal`}>
          <span className={styles.label}>Disposal method</span>
          <select
            id={`${fieldId}-disposal`}
            className={styles.select}
            value={rule.disposalMethod}
            onChange={handleDisposal}
          >
            {(Object.keys(DISPOSAL_LABEL) as DisposalMethod[]).map((d) => (
              <option key={d} value={d}>
                {DISPOSAL_LABEL[d]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.toggleRow}>
        <div className={styles.toggleLabel}>
          <span className={styles.toggleLabelMain}>Legal hold</span>
          <span className={styles.toggleLabelSub}>
            Suspends disposal under court order or AUSTRAC investigation.
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={rule.legalHold}
          aria-label="Toggle legal hold"
          className={styles.toggle}
          onClick={toggleLegalHold}
        >
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span>{rule.legalHold ? "ON" : "OFF"}</span>
        </button>
      </div>

      <p className={styles.summary}>
        Retain <span className={styles.summaryStrong}>{rule.category}</span> for{" "}
        <span className={styles.summaryStrong}>
          {rule.durationAmount} {DURATION_LABEL[rule.durationUnit]}
        </span>
        , then dispose via{" "}
        <span className={styles.summaryStrong}>
          {DISPOSAL_LABEL[rule.disposalMethod]}
        </span>
        .
      </p>
    </section>
  )
}

export default RetentionScheduleEditor
