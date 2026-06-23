"use client"

import { useEffect, useState } from "react"

import { LoadingOverlay } from "../../components/overlays"
import styles from "../overlays.module.css"

export function LoadingOverlayDemo() {
  const [panelLoading, setPanelLoading] = useState<boolean>(false)
  const [fullLoading, setFullLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!panelLoading) {
      return
    }
    const id = window.setTimeout(() => setPanelLoading(false), 3200)
    return () => window.clearTimeout(id)
  }, [panelLoading])

  useEffect(() => {
    if (!fullLoading) {
      return
    }
    const id = window.setTimeout(() => setFullLoading(false), 2400)
    return () => window.clearTimeout(id)
  }, [fullLoading])

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => setPanelLoading(true)}
        >
          Sync supplier pricelist (panel-scoped)
        </button>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => setFullLoading(true)}
        >
          Capture Stripe payment (full-viewport)
        </button>
      </div>
      <span className={styles.stageHelp}>
        Trigger · click a button (panel veil ~3.2s · viewport veil ~2.4s)
      </span>

      <div
        style={{
          position: "relative",
          minHeight: 220,
          padding: "18px var(--primitive-space-5)",
          border: "1px solid var(--primitive-line)",
          borderRadius: 12,
          background: "var(--primitive-glass-soft)",
          overflow: "hidden",
        }}
      >
        <strong
          style={{ color: "var(--primitive-text-strong)", display: "block", marginBottom: "var(--primitive-space-2)" }}
        >
          Magnaflow ANZ — pricelist
        </strong>
        <p style={{ margin: 0, color: "var(--primitive-body)", fontSize: "var(--primitive-text-sm)", lineHeight: 1.55 }}>
          312 SKUs · last sync 11 Mar 2026, 09:42. Click sync above to fetch the latest landed
          cost, freight, and supplier promo state.
        </p>
        <LoadingOverlay
          open={panelLoading}
          message="Syncing pricelist"
          detail="Magnaflow ANZ · 312 SKUs"
          tone="teal"
        />
      </div>

      <LoadingOverlay
        open={fullLoading}
        message="Capturing payment"
        detail="Stripe · job 2415 · A$320.00"
        tone="red"
        fixed
      />
    </div>
  )
}
