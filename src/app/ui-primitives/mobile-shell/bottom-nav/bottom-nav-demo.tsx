"use client"

import { Briefcase, Home, Package, ScanLine, UserCircle2 } from "lucide-react"
import { useState } from "react"

import {
  BottomNavBar,
  type BottomNavItem,
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const NAV_ITEMS: ReadonlyArray<BottomNavItem> = [
  { id: "home", label: "Home", icon: <Home size={20} strokeWidth={2.2} /> },
  { id: "jobs", label: "Jobs", icon: <Briefcase size={20} strokeWidth={2.2} />, badge: 3 },
  { id: "scan", label: "Scan", icon: <ScanLine size={20} strokeWidth={2.2} /> },
  { id: "parts", label: "Parts", icon: <Package size={20} strokeWidth={2.2} /> },
  { id: "account", label: "Me", icon: <UserCircle2 size={20} strokeWidth={2.2} /> },
]

export function BottomNavDemo() {
  const [variant, setVariant] = useState<"pill" | "underline">("pill")
  const [active, setActive] = useState<string>("home")

  return (
    <div className={styles.split}>
      <MobileViewport label="Bottom nav preview">
        <MobileStatusBar />
        <TopAppBar title="Workshop" subtitle="Mufflermen Oak Flats" />
        <div className={styles.previewBody}>
          <div className={styles.previewHeading}>
            <span className={styles.previewHeadingKicker}>Current tab</span>
            <h2 className={styles.previewHeadingTitle}>{active}</h2>
          </div>
          <p>Tap a tab to see the {variant === "pill" ? "pill" : "underline"} slide.</p>
        </div>
        <BottomNavBar
          items={NAV_ITEMS}
          activeId={active}
          onSelect={setActive}
          variant={variant}
        />
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Variant</h2>
          <span className={styles.helpLabel}>The pill carries weight, the underline stays quiet</span>
        </div>
        <div className={styles.controlsRow}>
          <button
            type="button"
            className={variant === "pill" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setVariant("pill")}
          >
            Pill
          </button>
          <button
            type="button"
            className={variant === "underline" ? styles.primaryBtn : styles.secondaryBtn}
            onClick={() => setVariant("underline")}
          >
            Underline
          </button>
          <span className={styles.statusPill}>{active}</span>
        </div>
      </div>
    </div>
  )
}
