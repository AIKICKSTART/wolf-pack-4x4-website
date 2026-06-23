"use client"

import { Camera, Phone, Plus, ScanLine } from "lucide-react"
import { useState, type ReactNode } from "react"

import {
  Fab,
  type FabPosition,
  type FabTone,
  type FabVariant,
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const TONE_ICON: Record<FabTone, ReactNode> = {
  red: <Plus size={20} strokeWidth={2.6} />,
  amber: <ScanLine size={20} strokeWidth={2.4} />,
  teal: <Camera size={20} strokeWidth={2.4} />,
  neutral: <Phone size={20} strokeWidth={2.4} />,
}

const TONE_LABEL: Record<FabTone, string> = {
  red: "Create job",
  amber: "Scan VIN",
  teal: "Photo evidence",
  neutral: "Call customer",
}

export function FabDemo() {
  const [variant, setVariant] = useState<FabVariant>("extended")
  const [tone, setTone] = useState<FabTone>("red")
  const [position, setPosition] = useState<FabPosition>("bottom-right")
  const [presses, setPresses] = useState<number>(0)

  return (
    <div className={styles.split}>
      <MobileViewport label="FAB preview">
        <MobileStatusBar />
        <TopAppBar title="Jobs" />
        <div className={styles.previewBody} style={{ minHeight: 300 }}>
          <p>The FAB anchors the primary action on this screen.</p>
          <p style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>Presses: {presses}</p>
        </div>
        <Fab
          variant={variant}
          tone={tone}
          position={position}
          icon={TONE_ICON[tone]}
          label={TONE_LABEL[tone]}
          onClick={() => setPresses((value) => value + 1)}
        />
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Variant</h2>
          <span className={styles.helpLabel}>Extended carries a label, icon-only stays compact</span>
        </div>
        <div className={styles.controlsRow}>
          <button
            type="button"
            className={variant === "extended" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setVariant("extended")}
          >
            Extended
          </button>
          <button
            type="button"
            className={variant === "icon" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setVariant("icon")}
          >
            Icon only
          </button>
        </div>
        <div className={styles.controlsRow}>
          {(["red", "amber", "teal", "neutral"] as ReadonlyArray<FabTone>).map((entry) => (
            <button
              key={entry}
              type="button"
              className={tone === entry ? styles.primaryBtn : styles.secondaryBtn}
              onClick={() => setTone(entry)}
            >
              {entry}
            </button>
          ))}
        </div>
        <div className={styles.controlsRow}>
          {(
            [
              { id: "bottom-right", label: "Right" },
              { id: "bottom-center", label: "Center" },
              { id: "bottom-left", label: "Left" },
            ] as ReadonlyArray<{ id: FabPosition; label: string }>
          ).map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={position === entry.id ? styles.primaryBtn : styles.secondaryBtn}
              onClick={() => setPosition(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
