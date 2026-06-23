"use client"

import { useId, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { Megaphone, Search } from "lucide-react"

import { Chip } from "../primitives/chip"

import {
  DTC_SEVERITY_LABEL,
  DTC_SEVERITY_TONE,
  RECALL_STATUS_LABEL,
  RECALL_STATUS_TONE,
  formatIsoDate,
  type DtcSeverity,
  type RecallStatus,
} from "./vehicle-data-types"
import styles from "./recall-lookup-card.module.css"

export interface RecallRecord {
  id: string
  /** Manufacturer recall reference (e.g. "NHTSA 23V-441"). */
  reference: string
  manufacturer: string
  headline: string
  /** Severity of the affected condition. */
  severity: DtcSeverity
  /** Manufacturer / regulator status. */
  status: RecallStatus
  /** ISO date the recall was issued. */
  issuedISO: string
  /** Affected components. */
  affectedComponents: ReadonlyArray<string>
}

interface RecallLookupCardProps {
  defaultVin?: string
  results: ReadonlyArray<RecallRecord>
  onLookup?: (vin: string) => ReadonlyArray<RecallRecord>
  className?: string
}

export function RecallLookupCard({
  defaultVin = "",
  results,
  onLookup,
  className,
}: RecallLookupCardProps) {
  const inputId = useId()
  const [draft, setDraft] = useState(defaultVin)
  const [records, setRecords] = useState<ReadonlyArray<RecallRecord>>(results)

  const classes = useMemo(
    () => [styles.card, className].filter(Boolean).join(" "),
    [className],
  )

  const activeCount = useMemo(
    () => records.filter((r) => r.status === "active").length,
    [records],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value.toUpperCase().slice(0, 17))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onLookup) {
      setRecords(onLookup(draft.trim()))
      return
    }
    setRecords(results)
  }

  return (
    <section className={classes} aria-label="Recall lookup">
      <header className={styles.head}>
        <span className={styles.glyph} aria-hidden="true">
          <Megaphone size={18} strokeWidth={2.2} />
        </span>
        <div className={styles.headCopy}>
          <span className={styles.kicker}>Recall lookup · NHTSA · ACCC PROD</span>
          <h2 className={styles.title}>Open campaigns by VIN</h2>
        </div>
        <Chip
          label={activeCount > 0 ? `${activeCount} active` : "All clear"}
          tone={activeCount > 0 ? "red" : "green"}
        />
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor={inputId} className={styles.label}>
          Search by VIN
        </label>
        <div className={styles.field}>
          <Search size={16} strokeWidth={2.2} aria-hidden="true" className={styles.fieldIcon} />
          <input
            id={inputId}
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            maxLength={17}
            value={draft}
            onChange={handleChange}
            placeholder="JT12ZBR45N0028894"
            className={styles.input}
          />
          <button type="submit" className={styles.submit}>
            Run lookup
          </button>
        </div>
      </form>

      {records.length === 0 ? (
        <p className={styles.empty}>
          No open campaigns recorded against this VIN — clear to invoice.
        </p>
      ) : (
        <ul className={styles.list}>
          {records.map((record) => (
            <li
              key={record.id}
              className={[styles.row, styles[`severity-${record.severity}`]].join(" ")}
            >
              <div className={styles.rowHead}>
                <span className={styles.reference}>{record.reference}</span>
                <Chip
                  label={DTC_SEVERITY_LABEL[record.severity]}
                  tone={DTC_SEVERITY_TONE[record.severity]}
                />
                <Chip
                  label={RECALL_STATUS_LABEL[record.status]}
                  tone={RECALL_STATUS_TONE[record.status]}
                />
                <time className={styles.issued} dateTime={record.issuedISO}>
                  Issued {formatIsoDate(record.issuedISO)}
                </time>
              </div>
              <h3 className={styles.rowTitle}>{record.headline}</h3>
              <p className={styles.rowManufacturer}>
                {record.manufacturer} · affecting{" "}
                <span>{record.affectedComponents.join(", ")}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default RecallLookupCard
