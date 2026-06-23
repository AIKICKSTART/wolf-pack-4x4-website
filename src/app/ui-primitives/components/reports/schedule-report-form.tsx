"use client"

import { useCallback, useState, type KeyboardEvent } from "react"

import type { ExportFormat, ScheduleFrequency } from "./reports-types"
import styles from "./schedule-report-form.module.css"

interface FrequencyOption {
  id: ScheduleFrequency
  label: string
}

interface FormatOption {
  id: ExportFormat
  label: string
}

const FREQUENCIES: ReadonlyArray<FrequencyOption> = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "custom-cron", label: "Custom cron" },
]

const FORMATS: ReadonlyArray<FormatOption> = [
  { id: "pdf", label: "PDF" },
  { id: "csv", label: "CSV" },
  { id: "excel", label: "Excel" },
  { id: "json", label: "JSON" },
]

interface ScheduleReportFormProps {
  initialFrequency?: ScheduleFrequency
  initialFormat?: ExportFormat
  initialRecipients?: ReadonlyArray<string>
  initialCron?: string
  initialAttachData?: boolean
  className?: string
}

export function ScheduleReportForm({
  initialFrequency = "weekly",
  initialFormat = "pdf",
  initialRecipients = [],
  initialCron = "0 6 * * 1",
  initialAttachData = true,
  className,
}: ScheduleReportFormProps) {
  const [frequency, setFrequency] = useState<ScheduleFrequency>(initialFrequency)
  const [format, setFormat] = useState<ExportFormat>(initialFormat)
  const [recipients, setRecipients] = useState<string[]>([...initialRecipients])
  const [cron, setCron] = useState<string>(initialCron)
  const [attachData, setAttachData] = useState<boolean>(initialAttachData)
  const [draft, setDraft] = useState<string>("")

  const handleAddRecipient = useCallback(
    (raw: string) => {
      const trimmed = raw.trim().replace(/,$/, "")
      if (trimmed.length === 0 || recipients.includes(trimmed)) {
        setDraft("")
        return
      }
      setRecipients((current) => [...current, trimmed])
      setDraft("")
    },
    [recipients],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      handleAddRecipient(draft)
    } else if (event.key === "Backspace" && draft.length === 0 && recipients.length > 0) {
      event.preventDefault()
      setRecipients((current) => current.slice(0, -1))
    }
  }

  const removeRecipient = (target: string) => {
    setRecipients((current) => current.filter((recipient) => recipient !== target))
  }

  const classes = [styles.form, className].filter(Boolean).join(" ")

  return (
    <form className={classes} onSubmit={(event) => event.preventDefault()}>
      <div className={styles.row}>
        <span className={styles.label}>Frequency</span>
        <div className={styles.segments} role="radiogroup" aria-label="Schedule frequency">
          {FREQUENCIES.map((option) => {
            const active = option.id === frequency
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`${styles.segment} ${active ? styles.segmentActive : ""}`}
                onClick={() => setFrequency(option.id)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      {frequency === "custom-cron" && (
        <div className={styles.cronField}>
          <label className={styles.label} htmlFor="schedule-cron">
            Cron expression
          </label>
          <input
            id="schedule-cron"
            className={styles.cronInput}
            value={cron}
            onChange={(event) => setCron(event.target.value)}
            placeholder="0 6 * * 1"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      )}

      <div className={styles.tagInputShell}>
        <span className={styles.label}>Recipients</span>
        <div className={styles.tagField}>
          {recipients.map((recipient) => (
            <span key={recipient} className={styles.tag}>
              {recipient}
              <button
                type="button"
                className={styles.tagRemove}
                aria-label={`Remove ${recipient}`}
                onClick={() => removeRecipient(recipient)}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className={styles.tagInput}
            value={draft}
            placeholder={
              recipients.length === 0 ? "name@mufflermen.com.au" : "Add another…"
            }
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => {
              if (draft.trim().length > 0) {
                handleAddRecipient(draft)
              }
            }}
            aria-label="Recipient email"
          />
        </div>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Format</span>
        <div className={styles.formatRow} role="radiogroup" aria-label="Delivery format">
          {FORMATS.map((option) => {
            const active = option.id === format
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`${styles.formatChip} ${active ? styles.formatChipActive : ""}`}
                onClick={() => setFormat(option.id)}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <strong>Attach data file</strong>
          <span>Embed raw data alongside the rendered report.</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={attachData}
          aria-label="Attach raw data"
          className={styles.toggleSwitch}
          onClick={() => setAttachData((current) => !current)}
        />
      </div>
    </form>
  )
}

export default ScheduleReportForm
