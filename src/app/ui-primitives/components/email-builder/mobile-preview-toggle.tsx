"use client"

import { useState } from "react"

import { Chip } from "../primitives/chip"

import type { PreviewDevice, PreviewMode } from "./email-builder-types"
import styles from "./mobile-preview-toggle.module.css"

interface MobilePreviewToggleProps {
  /** Initial device — defaults to "desktop". */
  defaultDevice?: PreviewDevice
  /** Initial preview mode — defaults to "light". */
  defaultMode?: PreviewMode
  /** Initial scale percent — defaults to 100. */
  defaultScale?: number
  className?: string
}

const DEVICES: ReadonlyArray<{ id: PreviewDevice; label: string; size: string }> = [
  { id: "mobile", label: "Mobile", size: "375px" },
  { id: "desktop", label: "Desktop", size: "600px" },
]

const SCALES: ReadonlyArray<number> = [75, 100, 125]

export function MobilePreviewToggle({
  defaultDevice = "desktop",
  defaultMode = "light",
  defaultScale = 100,
  className,
}: MobilePreviewToggleProps) {
  const [device, setDevice] = useState<PreviewDevice>(defaultDevice)
  const [mode, setMode] = useState<PreviewMode>(defaultMode)
  const [scale, setScale] = useState<number>(defaultScale)

  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Email preview controls">
      <div className={styles.group} role="tablist" aria-label="Preview device">
        <span className={styles.groupLabel}>Device</span>
        <div className={styles.chipRow}>
          {DEVICES.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={device === option.id}
              className={[styles.deviceBtn, device === option.id ? styles.deviceBtnOn : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setDevice(option.id)}
            >
              <span className={styles.deviceLabel}>{option.label}</span>
              <span className={styles.deviceSize}>{option.size}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.groupLabel}>Scale</span>
        <div className={styles.chipRow} role="radiogroup" aria-label="Preview scale">
          {SCALES.map((value) => (
            <Chip
              key={value}
              label={`${value}%`}
              tone={scale === value ? "teal" : "neutral"}
              selected={scale === value}
              onSelect={() => setScale(value)}
            />
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.groupLabel}>Dark mode</span>
        <button
          type="button"
          className={[styles.toggle, mode === "dark" ? styles.toggleOn : ""]
            .filter(Boolean)
            .join(" ")}
          role="switch"
          aria-checked={mode === "dark"}
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          <span className={styles.toggleThumb} />
          <span className={styles.toggleLabel}>
            {mode === "dark" ? "Dark client" : "Light client"}
          </span>
        </button>
      </div>
    </section>
  )
}
