"use client"

import { useState } from "react"

import { BasicDialog } from "../../components/overlays"
import styles from "../overlays.module.css"

export function BasicDialogDemo() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Attach workshop note
        </button>
        <span className={styles.statusPill}>Quote 2415 · Bay 04</span>
      </div>
      <span className={styles.stageHelp}>Trigger · click the button</span>

      <BasicDialog
        open={open}
        onOpenChange={setOpen}
        title="Attach workshop note"
        description="Notes appear on the printed quote and the customer SMS thread."
        size="md"
        actions={
          <>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => setOpen(false)}
            >
              Save note
            </button>
          </>
        }
      >
        <p style={{ marginTop: 0 }}>
          <strong style={{ color: "var(--primitive-text-strong)" }}>
            Bay 04 · 2017 Holden Commodore VFII SS
          </strong>
          <br />
          Mandrel-bent 2.5&quot; cat-back with twin 4&quot; polished tips. Dyno booked Thursday
          at 14:30 — customer signed off on the supplier substitution to Magnaflow.
        </p>
        <p>
          Add any extra context for the workshop floor or for the printed invoice. Saved notes
          attach to the job ticket and appear in the customer&apos;s status SMS.
        </p>
      </BasicDialog>
    </div>
  )
}
