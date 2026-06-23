"use client"

import { useState } from "react"

import { ConfettiModal } from "../../components/overlays"
import styles from "../overlays.module.css"

export function ConfettiModalDemo() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Mark job 2415 signed off
        </button>
      </div>
      <span className={styles.stageHelp}>
        Trigger · click the button (confetti fires after the modal lands)
      </span>

      <ConfettiModal
        open={open}
        onOpenChange={setOpen}
        title="Job 2415 · signed off"
        description="2017 Holden Commodore VFII SS · cat-back replacement · 4h 12m. Customer SMS sent, invoice queued, bay 04 reopens."
        mode="cannon"
        actions={
          <>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => setOpen(false)}
            >
              Print invoice
            </button>
          </>
        }
      />
    </div>
  )
}
