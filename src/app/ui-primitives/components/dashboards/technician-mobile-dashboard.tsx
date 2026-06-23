"use client"

import { useState } from "react"
import {
  Bell,
  Briefcase,
  Camera,
  Home,
  Package,
  UserCircle2,
} from "lucide-react"

import {
  BottomNavBar,
  MobileStatusBar,
  MobileViewport,
  TopAppBar,
} from "../mobile-shell"
import type { BottomNavItem } from "../mobile-shell"
import { JobTicket } from "../workshop-scenes/job-ticket"

import styles from "./technician-mobile-dashboard.module.css"

const NAV_ITEMS: ReadonlyArray<BottomNavItem> = [
  { id: "home", label: "Home", icon: <Home size={20} strokeWidth={2.2} /> },
  { id: "jobs", label: "Jobs", icon: <Briefcase size={20} strokeWidth={2.2} />, badge: 3 },
  { id: "scan", label: "Scan", icon: <Camera size={20} strokeWidth={2.2} /> },
  { id: "parts", label: "Parts", icon: <Package size={20} strokeWidth={2.2} /> },
  { id: "me", label: "Me", icon: <UserCircle2 size={20} strokeWidth={2.2} /> },
]

interface ChecklistItem {
  id: string
  label: string
  qty?: string
  done: boolean
}

const MATERIALS: ReadonlyArray<ChecklistItem> = [
  { id: "m-1", label: "XForce twin 2.5\" stainless cat-back", qty: "1 kit", done: true },
  { id: "m-2", label: "Bosal flex pipe — 2.5\"", qty: "2", done: true },
  { id: "m-3", label: "Mild steel hangers — 8mm", qty: "4", done: true },
  { id: "m-4", label: "Stainless V-band clamps — 2.5\"", qty: "2", done: false },
  { id: "m-5", label: "Mil-spec exhaust paste — 200g", qty: "1", done: false },
  { id: "m-6", label: "Black ceramic tip · ID 80mm", qty: "2", done: false },
]

export function TechnicianMobileDashboard() {
  const [activeNav, setActiveNav] = useState<string>("jobs")

  return (
    <div className={styles.surface}>
      <div className={styles.frame}>
        <MobileViewport label="Technician daily focus">
          <MobileStatusBar />
          <TopAppBar
            title="Bay 2 · Iris H."
            subtitle="On the rack · 14:20"
            trailing={<Bell size={18} strokeWidth={2.2} aria-hidden="true" />}
          />
          <div className={styles.screen}>
            <div className={styles.greeting}>
              <span className={styles.greetingKicker}>Active job · 2.5h logged</span>
              <h2 className={styles.greetingTitle}>JOB-2026-0411 · WRX STI</h2>
              <span className={styles.greetingMeta}>
                Cat-back install + sound check · due 16:00
              </span>
            </div>

            <div className={styles.scroll}>
              <JobTicket
                jobNumber="JOB-2026-0411"
                customerName="Sienna Voss"
                customerSuburb="Albion Park, NSW"
                vehicleYear={2019}
                vehicleMake="Subaru"
                vehicleModel="WRX STI"
                vehicleRego="S2V-001"
                vehicleEngine="2.5L EJ257 turbo"
                services={[
                  { id: "s1", label: "Turbo-back stainless", tone: "red" },
                  { id: "s2", label: "Downpipe gasket", tone: "amber" },
                  { id: "s3", label: "Sound check", tone: "teal" },
                ]}
                status="in-progress"
                weldBay="Bay 2"
                timeSpentMin={150}
                timeBudgetMin={240}
                photos={[
                  { id: "p-1", label: "Pre · u/side" },
                  { id: "p-2", label: "Mid · weld" },
                  { id: "p-3", label: "Tip mock" },
                ]}
              />

              <div className={styles.checklist}>
                <span className={styles.checklistTitle}>Materials checklist · 3/6</span>
                {MATERIALS.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.checklistItem} ${item.done ? styles.checklistItemDone : ""}`}
                  >
                    <span
                      className={`${styles.tick} ${item.done ? styles.tickDone : ""}`}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item.label}</span>
                    {item.qty ? <span className={styles.qty}>{item.qty}</span> : null}
                  </div>
                ))}
              </div>

              <a className={styles.linkRow} href="#" aria-label="Open handover checklist">
                <span className={styles.linkLabel}>Open handover checklist</span>
                <span className={styles.linkArrow}>Step 4 / 4 →</span>
              </a>
            </div>

            <BottomNavBar items={NAV_ITEMS} activeId={activeNav} onSelect={setActiveNav} />
          </div>
        </MobileViewport>
      </div>
    </div>
  )
}

export default TechnicianMobileDashboard
