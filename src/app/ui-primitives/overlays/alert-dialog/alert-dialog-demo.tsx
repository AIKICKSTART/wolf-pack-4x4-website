"use client"

import { useState } from "react"

import { AlertDialog } from "../../components/overlays"
import styles from "../overlays.module.css"

export function AlertDialogDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [acknowledged, setAcknowledged] = useState<number>(0)

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          Trigger hoist lockout alert
        </button>
        {acknowledged > 0 && (
          <span className={styles.statusPill}>Acknowledged · {acknowledged}</span>
        )}
      </div>
      <span className={styles.stageHelp}>Trigger · click the button</span>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Hoist 02 lockout active"
        description="WorkCover lockout is engaged on Bay 02 hoist after the morning safety check flagged a hydraulic seep. Do not power up until the on-call mechanic clears the tag."
        okLabel="I acknowledge"
        onOk={() => setAcknowledged((value) => value + 1)}
      />
    </div>
  )
}
