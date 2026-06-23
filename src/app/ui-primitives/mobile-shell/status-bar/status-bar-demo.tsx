"use client"

import { useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
  type StatusBarCarrier,
  type StatusBarTone,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

export function StatusBarDemo() {
  const [tone, setTone] = useState<StatusBarTone>("light")
  const [carrier, setCarrier] = useState<StatusBarCarrier>("5G")
  const [battery, setBattery] = useState<number>(72)

  return (
    <div className={styles.split}>
      <MobileViewport tone={tone === "light" ? "dark" : "light"} label="Status bar preview">
        <MobileStatusBar tone={tone} battery={battery} carrier={carrier} />
        <TopAppBar title="Workshop" />
        <div className={styles.previewBody}>
          <p>Status bar is presentational only — the simulator background switches so contrast stays honest.</p>
          <p style={{ color: tone === "light" ? "var(--primitive-muted)" : "color-mix(in oklab, var(--primitive-canvas) 60%, transparent)", fontSize: "var(--primitive-text-xs)" }}>
            tone: {tone} · carrier: {carrier} · battery: {battery}%
          </p>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Settings</h2>
          <span className={styles.helpLabel}>Tone follows app surface luminance</span>
        </div>
        <div className={styles.controlsRow}>
          <button
            type="button"
            className={tone === "light" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setTone("light")}
          >
            Light text
          </button>
          <button
            type="button"
            className={tone === "dark" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setTone("dark")}
          >
            Dark text
          </button>
        </div>
        <div className={styles.controlsRow}>
          {(["5G", "4G", "LTE", "Wi-Fi"] as ReadonlyArray<StatusBarCarrier>).map((entry) => (
            <button
              key={entry}
              type="button"
              className={entry === carrier ? styles.primaryBtn : styles.secondaryBtn}
              onClick={() => setCarrier(entry)}
            >
              {entry}
            </button>
          ))}
        </div>
        <div className={styles.controlsRow}>
          <label className={styles.helpLabel} htmlFor="status-battery">Battery</label>
          <input
            id="status-battery"
            type="range"
            min={5}
            max={100}
            value={battery}
            onChange={(event) => setBattery(Number(event.target.value))}
            style={{ flex: 1, minWidth: 180 }}
          />
          <span className={styles.statusPill}>{battery}%</span>
        </div>
      </div>
    </div>
  )
}
