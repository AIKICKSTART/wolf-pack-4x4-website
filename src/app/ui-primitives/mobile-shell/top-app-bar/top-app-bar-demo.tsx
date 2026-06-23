"use client"

import { Bell, Filter, MoreHorizontal } from "lucide-react"
import { useState } from "react"

import {
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

export function TopAppBarDemo() {
  const [variant, setVariant] = useState<"solid" | "transparent">("solid")
  const [count, setCount] = useState<number>(0)

  return (
    <div className={styles.split}>
      <MobileViewport label="Top app bar preview">
        <MobileStatusBar />
        <TopAppBar
          title="Job 2415"
          subtitle="Holden VE Ute · Bay 2"
          variant={variant}
          onBack={() => setCount((value) => value + 1)}
          trailing={
            <>
              <button
                type="button"
                aria-label="Notifications"
                style={iconBtnStyle}
              >
                <Bell size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
              <button type="button" aria-label="More" style={iconBtnStyle}>
                <MoreHorizontal size={16} strokeWidth={2.4} aria-hidden="true" />
              </button>
            </>
          }
        />
        <div className={styles.previewBody}>
          <p>Sticky bar with title, subtitle, back chevron and trailing icon row.</p>
          <p style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>
            Back chevron presses: {count}
          </p>
        </div>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Variant</h2>
          <span className={styles.helpLabel}>Switch the surface to see contrast against content</span>
        </div>
        <div className={styles.controlsRow}>
          <button
            type="button"
            className={variant === "solid" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setVariant("solid")}
          >
            Solid
          </button>
          <button
            type="button"
            className={variant === "transparent" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setVariant("transparent")}
          >
            Transparent
          </button>
          <span className={styles.statusPill}>
            <Filter size={10} strokeWidth={2.4} aria-hidden="true" />
            {variant}
          </span>
        </div>
      </div>
    </div>
  )
}

const iconBtnStyle = {
  appearance: "none" as const,
  width: 32,
  height: 32,
  display: "grid",
  placeItems: "center" as const,
  borderRadius: "var(--primitive-radius-lg)",
  border: "1px solid var(--primitive-line)",
  background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
  color: "var(--primitive-text-strong)",
  cursor: "pointer" as const,
}
