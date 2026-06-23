"use client"

import { useCallback, useRef, useState } from "react"

import { ToastTray } from "../../components/overlays"
import type { ToastTrayItem, ToastTrayTone } from "../../components/overlays"
import styles from "../overlays.module.css"

interface ToastSeed {
  tone: ToastTrayTone
  title: string
  description: string
  actionLabel?: string
}

const TOAST_SEEDS: ToastSeed[] = [
  {
    tone: "success",
    title: "Quote 2415 saved",
    description: "Customer SMS sent · A$2,180.50 · awaiting deposit.",
    actionLabel: "Open",
  },
  {
    tone: "info",
    title: "Magnaflow stock update",
    description: "32 universals arrived this morning · SKUs synced to the pricelist.",
  },
  {
    tone: "warning",
    title: "Bay 02 hoist lockout",
    description: "Hydraulic seep flagged. On-call mechanic en route.",
    actionLabel: "Re-bay",
  },
  {
    tone: "danger",
    title: "Stripe payment failed",
    description: "Card declined on job 2391 · retry or contact the customer.",
    actionLabel: "Retry",
  },
]

export function ToastTrayDemo() {
  const [toasts, setToasts] = useState<ToastTrayItem[]>([])
  const counterRef = useRef<number>(0)

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const fireSeed = (seed: ToastSeed) => {
    counterRef.current += 1
    const id = `toast-${counterRef.current}`
    setToasts((current) => [
      ...current,
      {
        id,
        tone: seed.tone,
        title: seed.title,
        description: seed.description,
        actionLabel: seed.actionLabel,
        onAction: seed.actionLabel ? () => dismiss(id) : undefined,
        duration: 6000,
      },
    ])
  }

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        {TOAST_SEEDS.map((seed) => (
          <button
            key={seed.title}
            type="button"
            className={seed.tone === "danger" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => fireSeed(seed)}
          >
            Fire {seed.tone} toast
          </button>
        ))}
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => setToasts([])}
        >
          Clear all
        </button>
      </div>
      <span className={styles.stageHelp}>
        Trigger · click a tone (each toast auto-dismisses after 6s)
      </span>

      <ToastTray toasts={toasts} onDismiss={dismiss} placement="top-right" />
    </div>
  )
}
