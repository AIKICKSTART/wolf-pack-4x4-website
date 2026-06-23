"use client"

import { useState } from "react"

import { BottomSheet } from "../../components/overlays"
import styles from "../overlays.module.css"

const COURTESY_CARS = [
  { id: "C-01", name: "Hyundai i30 — silver", availability: "Available · keys at bay 02" },
  { id: "C-02", name: "Mazda CX-3 — red", availability: "Out · returning 14:00" },
  { id: "C-04", name: "Toyota Yaris — white", availability: "Available · fuel low" },
  { id: "C-05", name: "Holden Astra — grey", availability: "Service due in 240 km" },
]

export function BottomSheetDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [pick, setPick] = useState<string>("")

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Pick courtesy car
        </button>
        {pick && <span className={styles.statusPill}>{pick}</span>}
      </div>
      <span className={styles.stageHelp}>Trigger · click the button (tablet-style)</span>

      <BottomSheet
        open={open}
        onOpenChange={setOpen}
        title="Pick a courtesy car"
        description="Assigns the car to job 2415. Customer gets an SMS with the rego and where to find the keys."
        height="auto"
        footer={
          <div className={styles.stageRow}>
            <button type="button" className={styles.secondaryBtn} onClick={() => setOpen(false)}>
              Skip
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => {
                setOpen(false)
                setPick("No car picked")
              }}
            >
              Confirm
            </button>
          </div>
        }
      >
        <ul style={{ display: "grid", gap: "var(--primitive-space-2-5)", margin: 0, padding: 0, listStyle: "none" }}>
          {COURTESY_CARS.map((car) => (
            <li key={car.id}>
              <button
                type="button"
                onClick={() => {
                  setPick(`${car.id} · ${car.name}`)
                  setOpen(false)
                }}
                style={{
                  appearance: "none",
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "var(--primitive-space-3)",
                  alignItems: "center",
                  padding: "var(--primitive-space-3) 14px",
                  border: "1px solid var(--primitive-line)",
                  borderRadius: 10,
                  background: "var(--primitive-glass-soft)",
                  color: "var(--primitive-text-strong)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontFamily: "var(--primitive-font-mono)", fontSize: 11, color: "var(--primitive-amber)" }}>
                  {car.id}
                </span>
                <span style={{ display: "grid", gap: "var(--primitive-space-0-5)" }}>
                  <strong>{car.name}</strong>
                  <span style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>{car.availability}</span>
                </span>
                <span aria-hidden="true" style={{ color: "var(--primitive-amber)" }}>
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>
    </div>
  )
}
