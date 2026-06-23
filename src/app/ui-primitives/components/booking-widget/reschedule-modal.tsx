"use client"

import { X } from "lucide-react"
import { useId } from "react"

import { BookingDateSelector } from "./booking-date-selector"
import styles from "./reschedule-modal.module.css"
import { TimeSlotGrid } from "./time-slot-grid"
import type { BookingDateOption, TimeSlot } from "./booking-widget-types"

export type RescheduleReason =
  | "scheduling-conflict"
  | "vehicle-not-ready"
  | "parts-delayed"
  | "weather"
  | "other"

interface OriginalBooking {
  dateLabel: string
  timeLabel: string
  serviceLabel: string
}

interface RescheduleModalProps {
  open: boolean
  onDismiss?: () => void
  onConfirm?: (payload: {
    iso: string | null
    slotId: string | null
    reason: RescheduleReason
  }) => void
  originalBooking: OriginalBooking
  dates: ReadonlyArray<BookingDateOption>
  slots: ReadonlyArray<TimeSlot>
  selectedIso: string | null
  selectedSlot: string | null
  reason: RescheduleReason
  onSelectDate?: (iso: string) => void
  onSelectSlot?: (id: string) => void
  onReasonChange?: (reason: RescheduleReason) => void
}

const REASONS: ReadonlyArray<{ id: RescheduleReason; label: string }> = [
  { id: "scheduling-conflict", label: "Scheduling conflict" },
  { id: "vehicle-not-ready", label: "Vehicle not ready" },
  { id: "parts-delayed", label: "Parts delayed" },
  { id: "weather", label: "Weather" },
  { id: "other", label: "Other" },
]

export function RescheduleModal({
  open,
  onDismiss,
  onConfirm,
  originalBooking,
  dates,
  slots,
  selectedIso,
  selectedSlot,
  reason,
  onSelectDate,
  onSelectSlot,
  onReasonChange,
}: RescheduleModalProps) {
  const titleId = useId()
  const reasonId = useId()

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={styles.backdrop}
    >
      <div className={styles.panel}>
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Reschedule booking</span>
            <h2 id={titleId} className={styles.title}>
              Pick a new date and time
            </h2>
          </div>
          <button
            type="button"
            className={styles.close}
            aria-label="Close reschedule dialog"
            onClick={onDismiss}
          >
            <X size={16} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </header>

        <section className={styles.original} aria-label="Original booking">
          <span className={styles.originalLabel}>Original</span>
          <span>
            <strong>{originalBooking.dateLabel}</strong> · {originalBooking.timeLabel}
          </span>
          <span className={styles.muted}>{originalBooking.serviceLabel}</span>
        </section>

        <BookingDateSelector
          dates={dates}
          selectedIso={selectedIso}
          onSelect={onSelectDate}
          label="New date"
        />

        <TimeSlotGrid
          slots={slots}
          selectedId={selectedSlot}
          onSelect={onSelectSlot}
        />

        <fieldset className={styles.reasonGroup}>
          <legend id={reasonId} className={styles.legend}>
            Reason
          </legend>
          <div className={styles.reasonChips} aria-labelledby={reasonId}>
            {REASONS.map((item) => {
              const isSelected = item.id === reason
              return (
                <button
                  key={item.id}
                  type="button"
                  className={[styles.chip, isSelected && styles.chipSelected]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={isSelected}
                  onClick={() => onReasonChange?.(item.id)}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <footer className={styles.foot}>
          <button type="button" className={styles.ghost} onClick={onDismiss}>
            Keep original
          </button>
          <button
            type="button"
            className={styles.primary}
            onClick={() =>
              onConfirm?.({ iso: selectedIso, slotId: selectedSlot, reason })
            }
            disabled={selectedIso === null || selectedSlot === null}
          >
            Confirm reschedule
          </button>
        </footer>
      </div>
    </div>
  )
}

export default RescheduleModal
