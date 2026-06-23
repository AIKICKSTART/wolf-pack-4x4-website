"use client"

import { PopoverRich } from "../../components/overlays"
import styles from "../overlays.module.css"

export function PopoverRichDemo() {
  return (
    <div className={styles.stage}>
      <span className={styles.stageHelp}>Trigger · click a chip to anchor the popover</span>
      <div className={styles.stageRow} style={{ gap: 18, paddingTop: "var(--primitive-space-1-5)", paddingBottom: "var(--primitive-space-1-5)" }}>
        <PopoverRich
          placement="bottom"
          align="start"
          trigger={
            <button type="button" className={styles.secondaryBtn}>
              Part · MF-2570-SS
            </button>
          }
          header="Magnaflow 14816 universal"
          footer={
            <button type="button" className={styles.primaryBtn}>
              Add to quote
            </button>
          }
        >
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--primitive-text-strong)" }}>SUS304</strong> ·
            2.5&quot; inlet · 18&quot; body · 6&quot; tip · spun cone.
          </p>
          <p style={{ margin: "var(--primitive-space-2) 0 0", color: "var(--primitive-muted)" }}>
            Cost A$284.40 · margin 31% · 12 in stock at Magnaflow ANZ.
          </p>
        </PopoverRich>

        <PopoverRich
          placement="top"
          align="center"
          trigger={
            <button type="button" className={styles.secondaryBtn}>
              Customer · Sarah O.
            </button>
          }
          header="Sarah O&apos;Brien"
          footer={
            <button type="button" className={styles.primaryBtn}>
              View profile
            </button>
          }
        >
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--primitive-text-strong)" }}>
              2017 Holden Commodore VFII SS
            </strong>{" "}
            · CHV-184 · 142,860 km
          </p>
          <p style={{ margin: "var(--primitive-space-2) 0 0", color: "var(--primitive-muted)" }}>
            Lifetime spend A$8,420 · 3 prior jobs · NPS 9. Last visit 14 Mar 2026.
          </p>
        </PopoverRich>

        <PopoverRich
          placement="right"
          align="start"
          trigger={
            <button type="button" className={styles.secondaryBtn}>
              Bay 04 status
            </button>
          }
          header="Bay 04"
        >
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--primitive-amber)" }}>Sign-off pending</strong> on
            ticket 2415. ETA 16:00.
          </p>
          <p style={{ margin: "var(--primitive-space-2) 0 0", color: "var(--primitive-muted)" }}>
            Hoist 04 · ratings up to 3.5 t · TIG bay adjacent.
          </p>
        </PopoverRich>
      </div>
    </div>
  )
}
