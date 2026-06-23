"use client"

import { useState } from "react"

import { SideSheet } from "../../components/overlays"
import styles from "../overlays.module.css"

interface SupplierLine {
  sku: string
  label: string
  cost: string
  margin: string
}

const SUPPLIER_LINES: ReadonlyArray<SupplierLine> = [
  { sku: "MF-2570-SS", label: "Magnaflow 14816 universal", cost: "A$284.40", margin: "31%" },
  { sku: "XF-CB-VFR", label: "XForce Holden VF cat-back", cost: "A$1,180.00", margin: "27%" },
  { sku: "PM-LSA-EXT", label: "Pacemaker LSA extractors", cost: "A$1,640.55", margin: "24%" },
  { sku: "RB-FORD-BA", label: "Redback Ford BA twin", cost: "A$842.10", margin: "29%" },
  { sku: "HP-MUF-3IN", label: "Hush Power 3in muffler", cost: "A$246.80", margin: "34%" },
]

export function SideSheetDemo() {
  const [rightOpen, setRightOpen] = useState<boolean>(false)
  const [leftOpen, setLeftOpen] = useState<boolean>(false)

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setRightOpen(true)}>
          Open supplier ledger (right)
        </button>
        <button type="button" className={styles.secondaryBtn} onClick={() => setLeftOpen(true)}>
          Open job filters (left)
        </button>
      </div>
      <span className={styles.stageHelp}>Trigger · click a button</span>

      <SideSheet
        open={rightOpen}
        onOpenChange={setRightOpen}
        title="Magnaflow ANZ"
        subtitle="Supplier S-104 · YTD spend A$184,220"
        side="right"
        width="md"
        footer={
          <div className={styles.stageRow}>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setRightOpen(false)}
            >
              Close
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => setRightOpen(false)}
            >
              Save line item
            </button>
          </div>
        }
      >
        <p style={{ marginTop: 0 }}>
          Latest contract negotiated 22 Mar 2026. 312 SKUs active across cat-backs, universals,
          tips, and clamps. Next price review locks 14 Jun.
        </p>
        <ul style={{ display: "grid", gap: "var(--primitive-space-2-5)", margin: "var(--primitive-space-3) 0 0", padding: 0, listStyle: "none" }}>
          {SUPPLIER_LINES.map((line) => (
            <li
              key={line.sku}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                rowGap: "var(--primitive-space-1)",
                padding: "var(--primitive-space-3) 14px",
                border: "1px solid var(--primitive-line)",
                borderRadius: 10,
                background: "var(--primitive-glass-soft)",
              }}
            >
              <strong style={{ color: "var(--primitive-text-strong)", fontSize: 14 }}>
                {line.label}
              </strong>
              <span
                style={{
                  color: "var(--primitive-amber)",
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: "var(--primitive-text-xs)",
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "right",
                }}
              >
                {line.cost}
              </span>
              <span style={{ color: "var(--primitive-muted)", fontFamily: "var(--primitive-font-mono)", fontSize: 11 }}>
                {line.sku}
              </span>
              <span
                style={{
                  color: "var(--primitive-green)",
                  fontFamily: "var(--primitive-font-mono)",
                  fontSize: 11,
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "right",
                }}
              >
                Margin {line.margin}
              </span>
            </li>
          ))}
        </ul>
      </SideSheet>

      <SideSheet
        open={leftOpen}
        onOpenChange={setLeftOpen}
        title="Job filters"
        subtitle="Bay 02–05 · 18 active tickets"
        side="left"
        width="sm"
      >
        <p style={{ marginTop: 0 }}>
          Filter the bay schedule by ticket stage, customer wait time, or part-arrival status.
        </p>
        <ul style={{ display: "grid", gap: "var(--primitive-space-2)", margin: "var(--primitive-space-3) 0 0", padding: 0, listStyle: "none" }}>
          {["Awaiting parts", "On the hoist", "Tuning", "Sign-off", "Picked up"].map((label) => (
            <li
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--primitive-space-2-5)",
                padding: "var(--primitive-space-2-5) var(--primitive-space-3)",
                border: "1px solid var(--primitive-line)",
                borderRadius: 10,
                background: "var(--primitive-glass-soft)",
                color: "var(--primitive-text-strong)",
                fontSize: "var(--primitive-text-sm)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--primitive-amber)",
                  boxShadow: "0 0 6px var(--primitive-amber)",
                }}
              />
              {label}
            </li>
          ))}
        </ul>
      </SideSheet>
    </div>
  )
}
