"use client"

import { useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
  ModalSheet,
  type ModalSheetSnap,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const SNAP_COPY: Record<ModalSheetSnap, string> = {
  peek: "Peek — quick preview, leaves the workshop visible.",
  half: "Half — shows the full quote summary with room to scan.",
  full: "Full — gives the entire form including parts, labour, GST notes.",
}

export function ModalSheetDemo() {
  const [snap, setSnap] = useState<ModalSheetSnap>("half")
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.split}>
      <MobileViewport label="Modal sheet preview">
        <MobileStatusBar />
        <TopAppBar title="Quote · 2415" />
        <div className={styles.previewBody}>
          <p>Bottom-rounded sheet with drag handle. Drag is visual only — tap a snap preset below.</p>
          <p style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>{SNAP_COPY[snap]}</p>
        </div>
        <ModalSheet
          open={open}
          onClose={() => setOpen(false)}
          snap={snap}
          title="Quote 2415"
          description="Mufflermen Oak Flats — Bay 2 · Holden VE Ute"
          footer={
            <div style={{ display: "flex", gap: "var(--primitive-space-2)" }}>
              <button type="button" className={styles.secondaryBtn} onClick={() => setOpen(false)} style={{ flex: 1 }}>
                Discard
              </button>
              <button type="button" className={styles.primaryBtn} onClick={() => setOpen(false)} style={{ flex: 1 }}>
                Send to customer
              </button>
            </div>
          }
        >
          <ul style={{ display: "grid", gap: "var(--primitive-space-2-5)", margin: 0, padding: 0, listStyle: "none" }}>
            <li style={listItemStyle}>
              <span>Inspection · 30 min labour</span>
              <span style={{ fontFamily: "var(--primitive-font-mono)" }}>$66.00</span>
            </li>
            <li style={listItemStyle}>
              <span>Muffler · MX-2 stainless</span>
              <span style={{ fontFamily: "var(--primitive-font-mono)" }}>$320.00</span>
            </li>
            <li style={listItemStyle}>
              <span>Manifold gasket</span>
              <span style={{ fontFamily: "var(--primitive-font-mono)" }}>$48.00</span>
            </li>
            <li style={{ ...listItemStyle, borderColor: "color-mix(in oklab, var(--primitive-amber) 40%, transparent)", color: "var(--primitive-amber)" }}>
              <strong>Subtotal</strong>
              <strong style={{ fontFamily: "var(--primitive-font-mono)" }}>$434.00</strong>
            </li>
          </ul>
        </ModalSheet>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Snap preset</h2>
          <span className={styles.helpLabel}>Visual snap — drag handle is decorative</span>
        </div>
        <div className={styles.controlsRow}>
          {(["peek", "half", "full"] as ReadonlyArray<ModalSheetSnap>).map((entry) => (
            <button
              key={entry}
              type="button"
              className={snap === entry ? styles.primaryBtn : styles.secondaryBtn}
              onClick={() => {
                setSnap(entry)
                setOpen(true)
              }}
            >
              {entry}
            </button>
          ))}
          <button type="button" className={styles.secondaryBtn} onClick={() => setOpen((value) => !value)}>
            {open ? "Close" : "Open"}
          </button>
        </div>
      </div>
    </div>
  )
}

const listItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "var(--primitive-space-2-5) var(--primitive-space-3)",
  border: "1px solid var(--primitive-line)",
  borderRadius: "var(--primitive-radius-lg)",
  background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
  color: "var(--primitive-text-strong)",
  fontSize: "var(--primitive-text-sm)",
}
