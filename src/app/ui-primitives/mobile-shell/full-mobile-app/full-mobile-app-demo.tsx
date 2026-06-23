"use client"

import {
  Bell,
  Briefcase,
  Calendar,
  ChevronRight,
  Home,
  Menu,
  Package,
  Plus,
  ScanLine,
  Settings,
  UserCircle2,
  Wrench,
} from "lucide-react"
import { useState } from "react"

import {
  BottomNavBar,
  type BottomNavItem,
  ChipFilterRow,
  type ChipFilterOption,
  Fab,
  MobileDrawer,
  MobileLoadingBar,
  MobileStatusBar,
  MobileToast,
  MobileViewport,
  TopAppBar,
} from "../../components/mobile-shell"
import styles from "../mobile-shell.module.css"

const NAV_ITEMS: ReadonlyArray<BottomNavItem> = [
  { id: "home", label: "Home", icon: <Home size={20} strokeWidth={2.2} /> },
  { id: "jobs", label: "Jobs", icon: <Briefcase size={20} strokeWidth={2.2} />, badge: 3 },
  { id: "parts", label: "Parts", icon: <Package size={20} strokeWidth={2.2} /> },
  { id: "account", label: "Me", icon: <UserCircle2 size={20} strokeWidth={2.2} /> },
]

const FILTERS: ReadonlyArray<ChipFilterOption> = [
  { id: "today", label: "Today", count: 4 },
  { id: "tomorrow", label: "Tomorrow", count: 5 },
  { id: "waiting", label: "Waiting", count: 2 },
  { id: "rush", label: "Rush" },
]

interface JobEntry {
  id: string
  rego: string
  vehicle: string
  bay: string
  state: string
  tone: "in-progress" | "queued" | "waiting"
  time: string
}

const JOBS: ReadonlyArray<JobEntry> = [
  {
    id: "2415",
    rego: "ABC123",
    vehicle: "Holden VE Ute",
    bay: "Bay 2",
    state: "On the hoist",
    tone: "in-progress",
    time: "13:42",
  },
  {
    id: "2416",
    rego: "JKL909",
    vehicle: "Mazda BT-50",
    bay: "Bay 1",
    state: "Booked",
    tone: "queued",
    time: "14:10",
  },
  {
    id: "2417",
    rego: "RT442R",
    vehicle: "Hyundai i30",
    bay: "Pickup",
    state: "Waiting on muffler",
    tone: "waiting",
    time: "15:00",
  },
  {
    id: "2418",
    rego: "GG2884",
    vehicle: "Toyota HiLux",
    bay: "Bay 1",
    state: "Booked",
    tone: "queued",
    time: "15:45",
  },
]

const TONE_COLOR: Record<JobEntry["tone"], string> = {
  "in-progress": "var(--primitive-amber)",
  queued: "var(--primitive-teal)",
  waiting: "var(--primitive-red)",
}

export function FullMobileAppDemo() {
  const [activeNav, setActiveNav] = useState<string>("jobs")
  const [filters, setFilters] = useState<ReadonlyArray<string>>(["today"])
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [toastOpen, setToastOpen] = useState<boolean>(false)

  return (
    <div className={styles.split}>
      <MobileViewport label="Mufflermen mobile app">
        <MobileStatusBar />
        <MobileLoadingBar active={false} mode="indeterminate" />
        <TopAppBar
          title="Workshop"
          subtitle="Mufflermen Oak Flats"
          leading={
            <button
              type="button"
              aria-label="Open drawer"
              onClick={() => setDrawerOpen(true)}
              style={iconBtnStyle}
            >
              <Menu size={16} strokeWidth={2.4} aria-hidden="true" />
            </button>
          }
          trailing={
            <button
              type="button"
              aria-label="Notifications"
              style={iconBtnStyle}
              onClick={() => setToastOpen(true)}
            >
              <Bell size={16} strokeWidth={2.4} aria-hidden="true" />
            </button>
          }
        />
        <ChipFilterRow
          options={FILTERS}
          active={filters}
          onToggle={(id) =>
            setFilters((current) =>
              current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id],
            )
          }
          onClear={() => setFilters([])}
        />
        <div className={styles.previewBody} style={{ paddingBottom: "var(--primitive-space-16)" }}>
          <MobileToast
            open={toastOpen}
            tone="success"
            title="Acme Exhausts confirmed"
            description="MX-2 muffler arriving 09:30 Wed"
            onDismiss={() => setToastOpen(false)}
          />
          <div className={styles.previewHeading}>
            <span className={styles.previewHeadingKicker}>Roo · {activeNav}</span>
            <h2 className={styles.previewHeadingTitle}>Today&apos;s bays</h2>
          </div>
          <ul className={styles.previewList}>
            {JOBS.map((job) => (
              <li key={job.id} className={styles.previewListItem}>
                <span className={styles.previewListIcon} aria-hidden="true">
                  <Wrench size={16} strokeWidth={2.2} />
                </span>
                <span className={styles.previewListPrimary}>
                  <strong>
                    {job.id} · {job.vehicle}
                  </strong>
                  <span className={styles.previewListMeta}>
                    {job.rego} · {job.bay} · {job.time}
                  </span>
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--primitive-space-1)",
                    color: TONE_COLOR[job.tone],
                    fontFamily: "var(--primitive-font-mono)",
                    fontSize: "var(--primitive-text-2xs)",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {job.state}
                  <ChevronRight size={14} strokeWidth={2.4} aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <Fab
          variant="extended"
          tone="red"
          icon={<Plus size={18} strokeWidth={2.6} />}
          label="New job"
          onClick={() => setToastOpen(true)}
        />
        <BottomNavBar items={NAV_ITEMS} activeId={activeNav} onSelect={setActiveNav} variant="pill" />
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title="Mufflermen"
          footer={
            <span
              style={{
                color: "var(--primitive-muted)",
                fontFamily: "var(--primitive-font-mono)",
                fontSize: "var(--primitive-text-2xs)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              v4.6.0 · build 2415
            </span>
          }
        >
          <ul style={{ display: "grid", gap: "var(--primitive-space-1-5)", margin: 0, padding: 0, listStyle: "none" }}>
            {(
              [
                { id: "home", label: "Workshop home", icon: Home },
                { id: "schedule", label: "Schedule", icon: Calendar },
                { id: "scan", label: "Scan VIN", icon: ScanLine },
                { id: "settings", label: "Settings", icon: Settings },
              ] as ReadonlyArray<{ id: string; label: string; icon: typeof Home }>
            ).map((entry) => {
              const Icon = entry.icon
              return (
                <li key={entry.id}>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    style={{
                      appearance: "none",
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "22px 1fr",
                      gap: "var(--primitive-space-2-5)",
                      alignItems: "center",
                      padding: "var(--primitive-space-2-5) var(--primitive-space-3)",
                      border: "1px solid transparent",
                      borderRadius: "var(--primitive-radius-lg)",
                      background: "transparent",
                      color: "var(--primitive-body)",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      fontSize: "var(--primitive-text-sm)",
                    }}
                  >
                    <Icon size={16} strokeWidth={2.2} aria-hidden="true" />
                    <span>{entry.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </MobileDrawer>
      </MobileViewport>
      <div className={styles.controls}>
        <div className={styles.controlsHead}>
          <h2 className={styles.controlsTitle}>Composition</h2>
          <span className={styles.helpLabel}>Status → loading → app bar → chips → list → FAB → bottom nav</span>
        </div>
        <div className={styles.controlsRow}>
          <button type="button" className={styles.secondaryBtn} onClick={() => setDrawerOpen(true)}>
            Open drawer
          </button>
          <button type="button" className={styles.primaryBtn} onClick={() => setToastOpen(true)}>
            Trigger toast
          </button>
          <span className={styles.statusPill}>Active: {activeNav}</span>
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
