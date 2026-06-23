import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { CornerQuickDemo } from "./corner-quick-demo"

export const metadata: Metadata = {
  title: "Dock · Corner quick | UI Primitives — Chrome",
}

export default function DockCornerQuickRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Dock 13 / Chrome"
        title="Corner quick"
        description="Bottom-right composer FAB with chat, back-to-top and theme toggle satellite buttons."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Corner quick" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live dock preview
          <span>Corner · FAB</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 360, padding: "var(--primitive-space-7)", display: "grid", placeItems: "end" }}>
          <CornerQuickDemo />
        </div>
      </div>
    </main>
  )
}
