"use client"

import { useState } from "react"

import { FullTakeover } from "../../components/overlays"
import styles from "../overlays.module.css"

const QC_CHECKS = [
  { id: "qc-01", label: "Heat shield bolted · torque to 22 Nm", status: "Verified" as const },
  { id: "qc-02", label: "Flange gasket seated · no daylight", status: "Verified" as const },
  { id: "qc-03", label: "Tip clearance · 14 mm rear bumper", status: "Verified" as const },
  { id: "qc-04", label: "Hanger rubbers · OEM spec", status: "Verified" as const },
  { id: "qc-05", label: "Dyno baseline + post · matched within 4 kW", status: "Pending" as const },
  { id: "qc-06", label: "Wheel torque · 110 Nm both sides", status: "Verified" as const },
]

export function FullTakeoverDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [minimisedAt, setMinimisedAt] = useState<string>("")

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Open pre-pickup QC reviewer
        </button>
        {minimisedAt && <span className={styles.statusPill}>Minimised at {minimisedAt}</span>}
      </div>
      <span className={styles.stageHelp}>Trigger · click the button</span>

      <FullTakeover
        open={open}
        onOpenChange={setOpen}
        eyebrow="QC reviewer · Job 2415"
        title="2017 Holden Commodore VFII SS"
        onMinimize={() => {
          setMinimisedAt(new Date().toLocaleTimeString("en-AU"))
          setOpen(false)
        }}
        toolbar={
          <span className={styles.stageHelp}>Auto-saved 14:08</span>
        }
      >
        <div style={{ display: "grid", gap: 18, maxWidth: 920, margin: "0 auto" }}>
          <p style={{ margin: 0, fontSize: "var(--primitive-text-base)", lineHeight: 1.6 }}>
            Final sign-off checklist for Bay 04. The customer arrives at 16:00 — close every line
            below before printing the invoice.
          </p>
          <ol style={{ display: "grid", gap: "var(--primitive-space-2-5)", margin: 0, padding: 0, listStyle: "none" }}>
            {QC_CHECKS.map((check, idx) => {
              const verified = check.status === "Verified"
              return (
                <li
                  key={check.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    border: "1px solid var(--primitive-line)",
                    borderRadius: 12,
                    background: "var(--primitive-glass-soft)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--primitive-font-mono)",
                      color: "var(--primitive-amber)",
                      fontSize: "var(--primitive-text-xs)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: "var(--primitive-text-strong)", fontSize: 14 }}>
                    {check.label}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "var(--primitive-space-1-5)",
                      padding: "var(--primitive-space-1) var(--primitive-space-2-5)",
                      borderRadius: 999,
                      border: `1px solid ${verified ? "color-mix(in oklab, var(--primitive-green) 42%, transparent)" : "color-mix(in oklab, var(--primitive-amber) 42%, transparent)"}`,
                      background: verified
                        ? "color-mix(in oklab, var(--primitive-green) 10%, transparent)"
                        : "color-mix(in oklab, var(--primitive-amber) 10%, transparent)",
                      color: verified ? "var(--primitive-green)" : "var(--primitive-amber)",
                      fontFamily: "var(--primitive-font-mono)",
                      fontSize: "var(--primitive-text-2xs)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {check.status}
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </FullTakeover>
    </div>
  )
}
