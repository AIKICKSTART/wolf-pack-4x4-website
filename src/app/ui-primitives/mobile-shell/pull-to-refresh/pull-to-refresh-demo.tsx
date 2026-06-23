"use client"

import { useEffect, useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
  PullToRefresh,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

export function PullToRefreshDemo() {
  const [progress, setProgress] = useState<number>(0)
  const [state, setState] = useState<"idle" | "armed" | "loading">("idle")

  useEffect(() => {
    if (state !== "loading") {
      return
    }
    const timer = window.setTimeout(() => {
      setState("idle")
      setProgress(0)
    }, 1600)
    return () => window.clearTimeout(timer)
  }, [state])

  const trigger = () => {
    setProgress(1)
    setState("armed")
    window.setTimeout(() => setState("loading"), 360)
  }

  return (
    <div className={styles.split}>
      <MobileViewport label="Pull to refresh preview">
        <MobileStatusBar />
        <TopAppBar title="Today" subtitle="Live feed" />
        <div className={styles.previewBody}>
          <PullToRefresh progress={progress} state={state} />
          <p>Press the simulator button to play through the pull → armed → loading → reset cycle.</p>
          <ul className={styles.previewList}>
            <li className={styles.previewListItem}>
              <span className={styles.previewListIcon}>2415</span>
              <span className={styles.previewListPrimary}>
                <strong>Holden VE Ute</strong>
                <span className={styles.previewListMeta}>13:42 · Bay 2</span>
              </span>
              <span style={{ color: "var(--primitive-amber)" }}>In progress</span>
            </li>
            <li className={styles.previewListItem}>
              <span className={styles.previewListIcon}>2416</span>
              <span className={styles.previewListPrimary}>
                <strong>Mazda BT-50</strong>
                <span className={styles.previewListMeta}>14:10 · Bay 1</span>
              </span>
              <span style={{ color: "var(--primitive-teal)" }}>Booked</span>
            </li>
          </ul>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Trigger</h2>
          <span className={styles.helpLabel}>State: {state}</span>
        </div>
        <div className={styles.controlsRow}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={trigger}
            disabled={state !== "idle"}
          >
            Play cycle
          </button>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(progress * 100)}
            onChange={(event) => {
              const next = Number(event.target.value) / 100
              setProgress(next)
              setState(next >= 1 ? "armed" : "idle")
            }}
            aria-label="Manual pull progress"
            style={{ flex: 1, minWidth: 180 }}
          />
        </div>
      </div>
    </div>
  )
}
