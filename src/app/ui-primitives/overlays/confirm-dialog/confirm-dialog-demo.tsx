"use client"

import { useState } from "react"

import { ConfirmDialog } from "../../components/overlays"
import styles from "../overlays.module.css"

export function ConfirmDialogDemo() {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false)
  const [destructiveOpen, setDestructiveOpen] = useState<boolean>(false)
  const [result, setResult] = useState<string>("")

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => setConfirmOpen(true)}
        >
          Mark Bay 04 ready
        </button>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => setDestructiveOpen(true)}
        >
          Cancel job 2415
        </button>
        {result && <span className={styles.statusPill}>{result}</span>}
      </div>
      <span className={styles.stageHelp}>Trigger · click a button</span>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Mark Bay 04 ready?"
        description="The customer will be SMS-ed and the bay reopens for the next ticket. You can still log additional notes after sign-off."
        confirmLabel="Confirm sign-off"
        variant="default"
        onConfirm={() => {
          setResult("Bay 04 signed off · SMS sent")
          setConfirmOpen(false)
        }}
      />

      <ConfirmDialog
        open={destructiveOpen}
        onOpenChange={setDestructiveOpen}
        title="Cancel job 2415?"
        description="The customer deposit (A$320) will be queued for refund. The bay slot opens up for re-booking. This cannot be undone."
        confirmLabel="Cancel job · refund deposit"
        variant="destructive"
        onConfirm={() => {
          setResult("Job 2415 cancelled · refund queued")
          setDestructiveOpen(false)
        }}
      />
    </div>
  )
}
