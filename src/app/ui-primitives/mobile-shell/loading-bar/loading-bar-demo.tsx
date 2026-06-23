"use client"

import { useEffect, useState } from "react"

import {
  MobileLoadingBar,
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

type Mode = "indeterminate" | "determinate"

export function LoadingBarDemo() {
  const [mode, setMode] = useState<Mode>("indeterminate")
  const [progress, setProgress] = useState<number>(0)
  const [active, setActive] = useState<boolean>(true)

  useEffect(() => {
    if (mode !== "determinate" || !active) {
      return
    }
    let raf: number
    const tick = () => {
      setProgress((prev) => {
        const next = prev + 0.01
        if (next >= 1) {
          return 1
        }
        return next
      })
      raf = window.requestAnimationFrame(tick)
    }
    raf = window.requestAnimationFrame(tick)
    return () => {
      window.cancelAnimationFrame(raf)
    }
  }, [mode, active])

  return (
    <div className={styles.split}>
      <MobileViewport label="Loading bar preview">
        <MobileStatusBar />
        <MobileLoadingBar mode={mode} progress={progress} active={active} />
        <TopAppBar title="Sync · Acme Exhausts" />
        <div className={styles.previewBody}>
          <p>Hairline bar lives under the status bar. Indeterminate for unknown duration, determinate when total progress is known.</p>
          <p style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>
            mode: {mode} · progress: {Math.round(progress * 100)}%
          </p>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Mode</h2>
          <span className={styles.helpLabel}>Hairline at 2px keeps body content unblocked</span>
        </div>
        <div className={styles.controlsRow}>
          <button
            type="button"
            className={mode === "indeterminate" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => {
              setMode("indeterminate")
              setProgress(0)
            }}
          >
            Indeterminate
          </button>
          <button
            type="button"
            className={mode === "determinate" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => {
              setMode("determinate")
              setProgress(0)
            }}
          >
            Determinate
          </button>
          <button
            type="button"
            className={active ? styles.secondaryBtn : styles.primaryBtn}
            onClick={() => setActive((value) => !value)}
          >
            {active ? "Pause" : "Resume"}
          </button>
        </div>
      </div>
    </div>
  )
}
