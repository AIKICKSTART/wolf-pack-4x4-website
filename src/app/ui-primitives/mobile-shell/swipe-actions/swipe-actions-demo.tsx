"use client"

import { Archive, Check, Flag, Phone, Trash2 } from "lucide-react"
import { useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
  SwipeActionRow,
  type SwipeRowState,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

export function SwipeActionsDemo() {
  const [state, setState] = useState<SwipeRowState>("demo-trailing")

  return (
    <div className={styles.split}>
      <MobileViewport label="Swipe action row preview">
        <MobileStatusBar />
        <TopAppBar title="Inbox" />
        <div className={styles.previewMain}>
          <SwipeActionRow
            primary="Dave — Holden VE Ute"
            secondary="Asks if the muffler is ready for pickup"
            meta="2m"
            state={state}
            leading={[
              { id: "complete", label: "Done", icon: <Check size={16} strokeWidth={2.6} />, tone: "green" },
              { id: "flag", label: "Flag", icon: <Flag size={16} strokeWidth={2.6} />, tone: "amber" },
            ]}
            trailing={[
              { id: "call", label: "Call", icon: <Phone size={16} strokeWidth={2.6} />, tone: "teal" },
              { id: "archive", label: "Archive", icon: <Archive size={16} strokeWidth={2.6} />, tone: "neutral" },
              { id: "delete", label: "Delete", icon: <Trash2 size={16} strokeWidth={2.6} />, tone: "red" },
            ]}
          />
          <SwipeActionRow
            primary="Acme Exhausts — restock alert"
            secondary="MX-2 muffler · 2 in transit, ETA Wed AM"
            meta="9m"
            state="rest"
            trailing={[
              { id: "delete", label: "Delete", icon: <Trash2 size={16} strokeWidth={2.6} />, tone: "red" },
            ]}
          />
          <SwipeActionRow
            primary="Job 2402 — Mazda BT-50"
            secondary="Invoice paid · receipt sent"
            meta="42m"
            state="rest"
            leading={[
              { id: "archive", label: "Archive", icon: <Archive size={16} strokeWidth={2.6} />, tone: "neutral" },
            ]}
          />
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Demo state</h2>
          <span className={styles.helpLabel}>Visual only — real swipe handlers belong to consumers</span>
        </div>
        <div className={styles.controlsRow}>
          {(
            [
              { id: "rest", label: "Rest" },
              { id: "demo-leading", label: "Demo leading" },
              { id: "demo-trailing", label: "Demo trailing" },
            ] as ReadonlyArray<{ id: SwipeRowState; label: string }>
          ).map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={state === entry.id ? styles.primaryBtn : styles.secondaryBtn}
              onClick={() => setState(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
