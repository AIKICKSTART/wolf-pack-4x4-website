"use client"

import { useState } from "react"

import { RescheduleModal } from "../../components/booking-widget"
import type { RescheduleReason } from "../../components/booking-widget"
import { SAMPLE_DATES, SAMPLE_SLOTS } from "../sample-data"
import styles from "../booking-widget.module.css"

export function RescheduleModalShowcase() {
  const [open, setOpen] = useState<boolean>(true)
  const [date, setDate] = useState<string | null>("2026-06-08")
  const [slot, setSlot] = useState<string | null>("10:30")
  const [reason, setReason] = useState<RescheduleReason>("scheduling-conflict")

  return (
    <div className={styles.frame}>
      {!open ? (
        <button
          type="button"
          className={styles.thumbFoot}
          onClick={() => setOpen(true)}
          style={{
            border: "1px solid var(--primitive-line)",
            borderRadius: "10px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Reopen modal
        </button>
      ) : null}
      <RescheduleModal
        open={open}
        onDismiss={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        originalBooking={{
          dateLabel: "Thursday 4 Jun 2026",
          timeLabel: "08:00 AM",
          serviceLabel: "Custom exhaust install · Bay 2",
        }}
        dates={SAMPLE_DATES}
        slots={SAMPLE_SLOTS}
        selectedIso={date}
        selectedSlot={slot}
        reason={reason}
        onSelectDate={setDate}
        onSelectSlot={setSlot}
        onReasonChange={setReason}
      />
    </div>
  )
}
