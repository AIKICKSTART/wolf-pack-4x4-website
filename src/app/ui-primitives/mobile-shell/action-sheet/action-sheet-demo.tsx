"use client"

import { Archive, Copy, Edit3, Share2, Trash2 } from "lucide-react"
import { useState } from "react"

import {
  ActionSheet,
  type ActionSheetItem,
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

export function ActionSheetDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [lastAction, setLastAction] = useState<string>("")

  const items: ReadonlyArray<ActionSheetItem> = [
    {
      id: "edit",
      label: "Edit job",
      description: "Update VIN, parts list, and notes",
      icon: <Edit3 size={18} strokeWidth={2.4} />,
      onSelect: () => setLastAction("Edit job"),
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: <Copy size={18} strokeWidth={2.4} />,
      onSelect: () => setLastAction("Duplicate"),
    },
    {
      id: "share",
      label: "Send to customer",
      icon: <Share2 size={18} strokeWidth={2.4} />,
      onSelect: () => setLastAction("Send to customer"),
    },
    {
      id: "archive",
      label: "Archive",
      icon: <Archive size={18} strokeWidth={2.4} />,
      onSelect: () => setLastAction("Archive"),
    },
    {
      id: "delete",
      label: "Delete job",
      description: "Cannot be undone",
      icon: <Trash2 size={18} strokeWidth={2.4} />,
      tone: "destructive",
      onSelect: () => setLastAction("Delete job"),
    },
  ]

  return (
    <div className={styles.split}>
      <MobileViewport label="Action sheet preview">
        <MobileStatusBar />
        <TopAppBar title="Job 2415" subtitle="Holden VE Ute" />
        <div className={styles.previewBody}>
          <p>Trigger from the more menu — the action sheet slides up from the bottom.</p>
          <p style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>
            Last action: {lastAction || "—"}
          </p>
        </div>
        <ActionSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Job 2415 actions"
          description="Quick actions for this job. Destructive actions sit at the bottom."
          items={items}
        />
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Trigger</h2>
          <span className={styles.helpLabel}>Esc and backdrop tap both dismiss</span>
        </div>
        <div className={styles.controlsRow}>
          <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
            Open action sheet
          </button>
          <span className={styles.statusPill}>{open ? "open" : "closed"}</span>
        </div>
      </div>
    </div>
  )
}
