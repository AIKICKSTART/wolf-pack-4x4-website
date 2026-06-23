import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { TabRailDemo } from "./tab-rail-demo"

export const metadata: Metadata = {
  title: "Dock · Tab rail | UI Primitives — Chrome",
}

export default function DockTabRailRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Dock 14 / Chrome"
        title="Tab rail"
        description="App-scoped bottom tab rail with an animated active indicator pill. Different from the mobile-shell bottom-nav-bar by being page-bound, not viewport-bound."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Tab rail" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live tab rail preview
          <span>Tab · rail</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 160, padding: "var(--primitive-space-7)", display: "grid", placeItems: "center" }}>
          <TabRailDemo />
        </div>
      </div>
    </main>
  )
}
