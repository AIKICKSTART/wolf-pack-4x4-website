import type { Metadata } from "next"

import { TestEquipmentStatus } from "../../components/adr-compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../adr-compliance.module.css"

export const metadata: Metadata = {
  title: "Test equipment status | ADR compliance",
  description:
    "Primitive 14 — workshop instrument status panel showing sound meter, accelerometer and microphone calibration state.",
}

export default function TestEquipmentStatusScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Calibration"
        title="Test equipment status"
        description="Composed inside a DashboardCard. Tracks every test instrument and its calibration state so a customer can be confident the meter signing their compliance cert is itself in date."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance", href: "/ui-primitives/adr-compliance" },
          { label: "Equipment status" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Workshop instruments</span>
        <TestEquipmentStatus
          items={[
            {
              id: "slm-01",
              code: "SLM",
              name: "Class 2 sound level meter",
              meta: "Brüel & Kjær 2240 · SN 218812",
              lastChecked: "2 days ago",
              status: "ok",
            },
            {
              id: "mic-01",
              code: "MIC",
              name: "1/2″ free-field microphone",
              meta: "B&K 4189 · SN 47218",
              lastChecked: "1 week ago",
              status: "due-soon",
            },
            {
              id: "acc-01",
              code: "ACC",
              name: "Triaxial accelerometer",
              meta: "PCB 356A24 · SN 9912",
              lastChecked: "9 days ago",
              status: "ok",
            },
            {
              id: "tach-01",
              code: "RPM",
              name: "Optical tachometer",
              meta: "Extech RPM44 · SN 71422",
              lastChecked: "32 days ago",
              status: "overdue",
            },
          ]}
        />
      </section>
    </main>
  )
}
