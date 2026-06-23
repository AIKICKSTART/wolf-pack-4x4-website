import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { SideMagneticDemo } from "./side-magnetic-demo"

export const metadata: Metadata = {
  title: "Dock · Side magnetic | UI Primitives — Chrome",
}

export default function DockSideMagneticRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Dock 12 / Chrome"
        title="Side magnetic"
        description="Right-side vertical dock with magnetic hover lift and label tooltips."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Side magnetic" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live dock preview
          <span>Side · magnetic</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 480, padding: "var(--primitive-space-6)", display: "grid", placeItems: "center" }}>
          <SideMagneticDemo />
        </div>
      </div>
    </main>
  )
}
