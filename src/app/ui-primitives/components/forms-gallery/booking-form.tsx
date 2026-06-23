"use client"

import { useId, useMemo, useState, type FormEvent } from "react"

import styles from "./booking-form.module.css"

export type BookingSlot = "morning" | "midday" | "afternoon"
export type BookingDropMode = "drop" | "wait"

export interface BookingFormValues {
  rego: string
  date: string
  slot: BookingSlot
  mode: BookingDropMode
  callback: boolean
}

interface BookingFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<BookingFormValues>
}

const SLOTS: ReadonlyArray<{ id: BookingSlot; time: string; label: string }> = [
  { id: "morning", time: "08:00 – 11:00", label: "Morning" },
  { id: "midday", time: "11:30 – 14:00", label: "Midday" },
  { id: "afternoon", time: "14:30 – 17:00", label: "Afternoon" },
]

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const

interface CalendarCell {
  iso: string
  day: number
  inMonth: boolean
  isPast: boolean
}

function buildMonth(year: number, month: number): CalendarCell[] {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startDow = (first.getDay() + 6) % 7
  const cells: CalendarCell[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = startDow; i > 0; i -= 1) {
    const d = new Date(year, month, 1 - i)
    cells.push({
      iso: d.toISOString().slice(0, 10),
      day: d.getDate(),
      inMonth: false,
      isPast: d < today,
    })
  }
  for (let d = 1; d <= last.getDate(); d += 1) {
    const date = new Date(year, month, d)
    cells.push({
      iso: date.toISOString().slice(0, 10),
      day: d,
      inMonth: true,
      isPast: date < today,
    })
  }
  while (cells.length % 7 !== 0) {
    const next = cells.length - (startDow + last.getDate()) + 1
    const date = new Date(year, month + 1, next)
    cells.push({
      iso: date.toISOString().slice(0, 10),
      day: date.getDate(),
      inMonth: false,
      isPast: date < today,
    })
  }
  return cells
}

export function BookingForm({ onSubmit, defaultValues }: BookingFormProps) {
  const regoId = useId()
  const callbackId = useId()
  const datePickerLabelId = useId()

  const now = new Date()
  const [viewYear, setViewYear] = useState<number>(now.getFullYear())
  const [viewMonth, setViewMonth] = useState<number>(now.getMonth())
  const [selectedDate, setSelectedDate] = useState<string>(
    defaultValues?.date ?? "",
  )
  const [slot, setSlot] = useState<BookingSlot>(defaultValues?.slot ?? "morning")
  const [mode, setMode] = useState<BookingDropMode>(defaultValues?.mode ?? "drop")
  const [submitted, setSubmitted] = useState<boolean>(false)

  const cells = useMemo(() => buildMonth(viewYear, viewMonth), [viewYear, viewMonth])

  const handlePrev = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const handleNext = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit?.(data)
    setSubmitted(true)
  }

  const monthAtStart =
    viewYear === now.getFullYear() && viewMonth === now.getMonth()

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>02 / Booking</span>
        <h2 className={styles.title}>Book a workshop bay</h2>
        <p className={styles.lede}>
          Reserve a slot at Oak Flats. Confirmation is sent by text within the hour.
        </p>
      </header>

      {submitted ? (
        <div className={styles.success} role="status">
          <span className={styles.successTick} aria-hidden="true">
            ✓
          </span>
          <span className={styles.successCopy}>
            <strong>Booking received</strong>
            <span>We will text confirmation once a bay is matched to your slot.</span>
          </span>
        </div>
      ) : null}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={regoId} className={styles.label}>
            Vehicle rego
          </label>
          <input
            id={regoId}
            name="rego"
            type="text"
            required
            maxLength={6}
            placeholder="OFM 042"
            defaultValue={defaultValues?.rego}
            className={styles.input}
          />
          <span className={styles.help}>NSW or any state plate — 6 characters max.</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Drop off mode</span>
          <div className={styles.toggleRow} role="radiogroup" aria-label="Drop off mode">
            <button
              type="button"
              role="radio"
              aria-checked={mode === "drop"}
              className={`${styles.toggle} ${mode === "drop" ? styles.toggleOn : ""}`}
              onClick={() => setMode("drop")}
            >
              Drop off
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={mode === "wait"}
              className={`${styles.toggle} ${mode === "wait" ? styles.toggleOn : ""}`}
              onClick={() => setMode("wait")}
            >
              Wait in lounge
            </button>
          </div>
          <input type="hidden" name="mode" value={mode} />
        </div>
      </div>

      <div className={styles.field}>
        <span id={datePickerLabelId} className={styles.label}>
          Preferred date
        </span>
        <div className={styles.datePicker} role="group" aria-labelledby={datePickerLabelId}>
          <div className={styles.dpHead}>
            <span className={styles.dpTitle}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <div className={styles.dpNavRow}>
              <button
                type="button"
                className={styles.dpNav}
                onClick={handlePrev}
                disabled={monthAtStart}
                aria-label="Previous month"
              >
                ‹
              </button>
              <button
                type="button"
                className={styles.dpNav}
                onClick={handleNext}
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          <div className={styles.dpGrid} aria-label="Available booking dates">
            {DOW.map((d) => (
              <span key={d} className={styles.dpDow}>
                {d}
              </span>
            ))}
            {cells.map((cell) => {
              const isSelected = cell.iso === selectedDate
              return (
                <button
                  key={cell.iso}
                  type="button"
                  className={`${styles.dpDay} ${cell.inMonth ? "" : styles.dpDayMuted} ${isSelected ? styles.dpDayOn : ""}`}
                  onClick={() => setSelectedDate(cell.iso)}
                  disabled={cell.isPast}
                  aria-pressed={isSelected}
                  aria-label={cell.iso}
                >
                  {cell.day}
                </button>
              )
            })}
          </div>
        </div>
        <input type="hidden" name="date" value={selectedDate} />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Preferred slot</span>
        <div className={styles.slotRow} role="radiogroup" aria-label="Preferred slot">
          {SLOTS.map((option) => {
            const isOn = slot === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isOn}
                className={`${styles.slot} ${isOn ? styles.slotOn : ""}`}
                onClick={() => setSlot(option.id)}
              >
                <span className={styles.slotLabel}>{option.label}</span>
                <span className={styles.slotTime}>{option.time}</span>
              </button>
            )
          })}
        </div>
        <input type="hidden" name="slot" value={slot} />
      </div>

      <label htmlFor={callbackId} className={styles.callback}>
        <input
          id={callbackId}
          name="callback"
          type="checkbox"
          defaultChecked={defaultValues?.callback ?? true}
        />
        <span>Call me first to confirm the slot before locking the booking.</span>
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn}>
          Reserve bay
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
