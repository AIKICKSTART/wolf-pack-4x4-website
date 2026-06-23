"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

import styles from "./booking-date-selector.module.css"
import type { BookingDateOption } from "./booking-widget-types"

interface BookingDateSelectorProps {
  dates: ReadonlyArray<BookingDateOption>
  /** ISO of the selected date, or null when nothing is picked. */
  selectedIso: string | null
  onSelect?: (iso: string) => void
  /** Optional accessible label, default "Pick a date". */
  label?: string
}

const SCROLL_STEP = 220

export function BookingDateSelector({
  dates,
  selectedIso,
  onSelect,
  label = "Pick a date",
}: BookingDateSelectorProps) {
  const stripRef = useRef<HTMLDivElement | null>(null)

  const scroll = (direction: -1 | 1) => {
    const node = stripRef.current
    if (!node) return
    node.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" })
  }

  return (
    <div className={styles.wrap} aria-label={label}>
      <button
        type="button"
        className={styles.nav}
        aria-label="Earlier dates"
        onClick={() => scroll(-1)}
      >
        <ChevronLeft size={16} strokeWidth={2.4} aria-hidden="true" />
      </button>
      <div className={styles.strip} ref={stripRef}>
        {dates.map((date) => {
          const isSelected = date.iso === selectedIso
          const isFew = !date.isClosed && date.availableSlots > 0 && date.availableSlots <= 3
          const isFull = !date.isClosed && date.availableSlots === 0
          const disabled = date.isClosed || isFull
          return (
            <button
              key={date.iso}
              type="button"
              className={[
                styles.tile,
                isSelected && styles.tileSelected,
                disabled && styles.tileDisabled,
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={isSelected}
              aria-label={`${date.weekday} ${date.day} ${date.month}, ${
                date.isClosed
                  ? "closed"
                  : `${date.availableSlots} of ${date.totalSlots} slots`
              }`}
              disabled={disabled}
              onClick={() => onSelect?.(date.iso)}
            >
              <span className={styles.weekday}>{date.weekday}</span>
              <span className={styles.day}>{date.day}</span>
              <span className={styles.month}>{date.month}</span>
              <span
                className={[
                  styles.meta,
                  isFew && styles.metaFew,
                  isFull && styles.metaFull,
                  date.isClosed && styles.metaClosed,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {date.isClosed
                  ? "Closed"
                  : isFull
                    ? "Full"
                    : `${date.availableSlots} left`}
              </span>
            </button>
          )
        })}
      </div>
      <button
        type="button"
        className={styles.nav}
        aria-label="Later dates"
        onClick={() => scroll(1)}
      >
        <ChevronRight size={16} strokeWidth={2.4} aria-hidden="true" />
      </button>
    </div>
  )
}

export default BookingDateSelector
