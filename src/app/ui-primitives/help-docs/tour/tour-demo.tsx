"use client"

import { useState } from "react"

import { TourController, type TourStep } from "../../components/help-docs"
import styles from "../help-docs.module.css"

const steps: ReadonlyArray<TourStep> = [
  {
    targetSelector: "#tour-target-jobs",
    title: "Active jobs",
    body: "Every job currently on a bay. Drag between bays to reschedule.",
    placement: "bottom",
  },
  {
    targetSelector: "#tour-target-quotes",
    title: "Quote inbox",
    body: "New quote requests land here. Triage them within an hour.",
    placement: "bottom",
  },
  {
    targetSelector: "#tour-target-stock",
    title: "Stock alerts",
    body: "Low-stock parts the Magnaflow rep should reorder.",
    placement: "top",
  },
  {
    targetSelector: "#tour-target-people",
    title: "Crew on shift",
    body: "Who's clocked in and which bay they're assigned to.",
    placement: "top",
  },
]

export function TourDemo() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className={styles.stage} style={{ minHeight: 360 }}>
      <span className={styles.stageHelp}>Click to launch the 4-step workshop tour</span>
      <div className={styles.stageRow} style={{ gap: 14 }}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Start tour
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 14,
          marginTop: 16,
        }}
      >
        <div
          id="tour-target-jobs"
          style={{
            padding: 18,
            border: "1px solid var(--primitive-line)",
            borderRadius: 12,
            background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
          }}
        >
          <strong style={{ color: "var(--primitive-text-strong)" }}>Active jobs · 12</strong>
          <p style={{ margin: "6px 0 0", color: "var(--primitive-body)", fontSize: 13 }}>
            8 in progress · 3 await sign-off · 1 stalled
          </p>
        </div>
        <div
          id="tour-target-quotes"
          style={{
            padding: 18,
            border: "1px solid var(--primitive-line)",
            borderRadius: 12,
            background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
          }}
        >
          <strong style={{ color: "var(--primitive-text-strong)" }}>Quote inbox · 7</strong>
          <p style={{ margin: "6px 0 0", color: "var(--primitive-body)", fontSize: 13 }}>
            4 new · 2 follow-ups · 1 booked-in
          </p>
        </div>
        <div
          id="tour-target-stock"
          style={{
            padding: 18,
            border: "1px solid var(--primitive-line)",
            borderRadius: 12,
            background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
          }}
        >
          <strong style={{ color: "var(--primitive-text-strong)" }}>Stock alerts · 4</strong>
          <p style={{ margin: "6px 0 0", color: "var(--primitive-body)", fontSize: 13 }}>
            Magnaflow 14816 · 12816 · 14156 · X-Force XHA
          </p>
        </div>
        <div
          id="tour-target-people"
          style={{
            padding: 18,
            border: "1px solid var(--primitive-line)",
            borderRadius: 12,
            background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
          }}
        >
          <strong style={{ color: "var(--primitive-text-strong)" }}>Crew on shift · 5</strong>
          <p style={{ margin: "6px 0 0", color: "var(--primitive-body)", fontSize: 13 }}>
            Bay 01 · 02 · 04 active. Bay 03 cleaning.
          </p>
        </div>
      </div>
      <TourController steps={steps} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
