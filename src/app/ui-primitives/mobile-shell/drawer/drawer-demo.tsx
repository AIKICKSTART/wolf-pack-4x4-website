"use client"

import { Briefcase, Calendar, HelpCircle, Home, Package, Settings } from "lucide-react"
import { useState } from "react"

import {
  MobileDrawer,
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

interface DrawerLink {
  id: string
  label: string
  icon: typeof Home
}

const LINKS: ReadonlyArray<DrawerLink> = [
  { id: "home", label: "Workshop home", icon: Home },
  { id: "jobs", label: "Active jobs", icon: Briefcase },
  { id: "parts", label: "Parts catalogue", icon: Package },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help", icon: HelpCircle },
]

export function DrawerDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [active, setActive] = useState<string>("jobs")

  return (
    <div className={styles.split}>
      <MobileViewport label="Mobile drawer preview">
        <MobileStatusBar />
        <TopAppBar
          title="Mufflermen"
          leading={
            <button
              type="button"
              aria-label="Open drawer"
              onClick={() => setOpen(true)}
              style={iconBtnStyle}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "grid",
                  gap: "var(--primitive-space-1)",
                  width: 16,
                }}
              >
                <span style={{ height: 2, background: "currentColor", borderRadius: "var(--primitive-radius-xs)" }} />
                <span style={{ height: 2, background: "currentColor", borderRadius: "var(--primitive-radius-xs)" }} />
                <span style={{ height: 2, background: "currentColor", borderRadius: "var(--primitive-radius-xs)" }} />
              </span>
            </button>
          }
        />
        <div className={styles.previewBody}>
          <p>Press the menu button (top left) — the drawer slides in from the left.</p>
          <p style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)" }}>Active: {active}</p>
        </div>
        <MobileDrawer
          open={open}
          onClose={() => setOpen(false)}
          title="Mufflermen"
          footer={
            <span style={{ color: "var(--primitive-muted)", fontSize: "var(--primitive-text-xs)", fontFamily: "var(--primitive-font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              v4.6.0 · build 2415
            </span>
          }
        >
          <ul style={{ display: "grid", gap: "var(--primitive-space-1-5)", margin: 0, padding: 0, listStyle: "none" }}>
            {LINKS.map((link) => {
              const Icon = link.icon
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActive(link.id)
                      setOpen(false)
                    }}
                    style={{
                      appearance: "none",
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "22px 1fr",
                      gap: "var(--primitive-space-2-5)",
                      alignItems: "center",
                      padding: "var(--primitive-space-2-5) var(--primitive-space-3)",
                      border: "1px solid",
                      borderColor: isActive ? "color-mix(in oklab, var(--primitive-red) 45%, transparent)" : "transparent",
                      borderRadius: "var(--primitive-radius-lg)",
                      background: isActive ? "color-mix(in oklab, var(--primitive-red) 14%, transparent)" : "transparent",
                      color: isActive ? "var(--primitive-text-strong)" : "var(--primitive-body)",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      fontSize: "var(--primitive-text-sm)",
                    }}
                  >
                    <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
                    <span>{link.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </MobileDrawer>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Open</h2>
          <span className={styles.helpLabel}>Trigger from the burger icon or this control</span>
        </div>
        <div className={styles.controlsRow}>
          <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
            Open drawer
          </button>
          <button type="button" className={styles.secondaryBtn} onClick={() => setOpen(false)}>
            Close drawer
          </button>
          <span className={styles.statusPill}>{open ? "open" : "closed"}</span>
        </div>
      </div>
    </div>
  )
}

const iconBtnStyle = {
  appearance: "none" as const,
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center" as const,
  borderRadius: "var(--primitive-radius-lg)",
  border: "1px solid var(--primitive-line)",
  background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
  color: "var(--primitive-text-strong)",
  cursor: "pointer" as const,
}
