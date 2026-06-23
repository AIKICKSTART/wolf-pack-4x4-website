"use client"

import { useEffect, useState } from "react"

import {
  MobileStatusBar,
  MobileToast,
  type MobileToastTone,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const TONE_COPY: Record<MobileToastTone, { title: string; body: string }> = {
  info: { title: "Customer SMS sent", body: "Texted Dave on +61 4XX 220 991." },
  success: { title: "Job 2415 closed", body: "Invoice sent, payment received." },
  warning: { title: "Stock low", body: "Mufflermen MX-2 muffler · 1 unit left." },
  error: { title: "Sync failed", body: "Could not reach Acme Exhausts. Will retry." },
}

export function ToastDemo() {
  const [tone, setTone] = useState<MobileToastTone>("success")
  const [open, setOpen] = useState<boolean>(true)

  useEffect(() => {
    if (!open) {
      return
    }
    const timer = window.setTimeout(() => setOpen(false), 4200)
    return () => window.clearTimeout(timer)
  }, [open, tone])

  return (
    <div className={styles.split}>
      <MobileViewport label="Mobile toast preview">
        <MobileStatusBar />
        <TopAppBar title="Workshop" />
        <div className={styles.previewBody}>
          <MobileToast
            open={open}
            tone={tone}
            title={TONE_COPY[tone].title}
            description={TONE_COPY[tone].body}
            onDismiss={() => setOpen(false)}
          />
          <p>Toast lands from above the notch. aria-live polite — screen readers announce without interrupting.</p>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Tone</h2>
          <span className={styles.helpLabel}>Auto-dismisses after 4.2s in this demo</span>
        </div>
        <div className={styles.controlsRow}>
          {(["info", "success", "warning", "error"] as ReadonlyArray<MobileToastTone>).map((entry) => (
            <button
              key={entry}
              type="button"
              className={entry === tone ? styles.primaryBtn : styles.secondaryBtn}
              onClick={() => {
                setTone(entry)
                setOpen(true)
              }}
            >
              {entry}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
