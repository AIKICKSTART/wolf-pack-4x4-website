"use client"

import { useId, useState, type ChangeEvent } from "react"

import { Chip } from "../primitives/chip"
import {
  LEAVE_TYPE_LABEL,
  type LeaveType,
} from "./roster-types"
import styles from "./time-off-request-form.module.css"

export interface TimeOffSubmission {
  leaveType: LeaveType
  startDate: string
  endDate: string
  reason: string
}

interface TimeOffRequestFormProps {
  /** Initial leave type — defaults to "annual". */
  initialType?: LeaveType
  onSubmit: (payload: TimeOffSubmission) => void
  className?: string
}

const LEAVE_TYPES: ReadonlyArray<LeaveType> = [
  "annual",
  "sick",
  "long-service",
  "rdo",
  "carer",
]

export function TimeOffRequestForm({
  initialType = "annual",
  onSubmit,
  className,
}: TimeOffRequestFormProps) {
  const startId = useId()
  const endId = useId()
  const reasonId = useId()
  const groupId = useId()

  const [leaveType, setLeaveType] = useState<LeaveType>(initialType)
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [reason, setReason] = useState<string>("")

  const handleStart = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value)
  }

  const handleEnd = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value)
  }

  const handleReason = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value)
  }

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      return
    }
    onSubmit({ leaveType, startDate, endDate, reason })
  }

  const classes = [styles.form, className].filter(Boolean).join(" ")

  return (
    <form
      className={classes}
      aria-label="Time off request"
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit()
      }}
    >
      <fieldset className={styles.fieldset}>
        <legend id={groupId} className={styles.kicker}>
          Leave type
        </legend>
        <div
          className={styles.chipRow}
          role="radiogroup"
          aria-labelledby={groupId}
        >
          {LEAVE_TYPES.map((type) => (
            <Chip
              key={type}
              label={LEAVE_TYPE_LABEL[type]}
              tone={leaveType === type ? "amber" : "neutral"}
              selected={leaveType === type}
              onSelect={() => setLeaveType(type)}
            />
          ))}
        </div>
      </fieldset>

      <div className={styles.dateRow}>
        <label className={styles.field} htmlFor={startId}>
          <span className={styles.kicker}>Start date</span>
          <input
            id={startId}
            type="date"
            value={startDate}
            onChange={handleStart}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.field} htmlFor={endId}>
          <span className={styles.kicker}>End date</span>
          <input
            id={endId}
            type="date"
            value={endDate}
            onChange={handleEnd}
            className={styles.input}
            required
          />
        </label>
      </div>

      <label className={styles.field} htmlFor={reasonId}>
        <span className={styles.kicker}>Reason</span>
        <textarea
          id={reasonId}
          value={reason}
          onChange={handleReason}
          rows={3}
          className={styles.textarea}
          placeholder="Optional context for the manager"
        />
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.btnPrimary}>
          Submit for approval
        </button>
      </div>
    </form>
  )
}

export default TimeOffRequestForm
