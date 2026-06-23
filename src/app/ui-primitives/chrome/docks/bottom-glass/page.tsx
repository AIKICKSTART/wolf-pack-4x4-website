import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { BottomGlassDemo } from "./bottom-glass-demo"

export const metadata: Metadata = {
  title: "Dock · Bottom glass | UI Primitives — Chrome",
}

export default function DockBottomGlassRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Dock 11 / Chrome"
        title="Bottom glass"
        description="Bottom-center floating glass dock with 5 primary actions and tooltip labels on hover."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Bottom glass" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live dock preview
          <span>Bottom · glass</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 180, padding: "var(--primitive-space-7)", display: "grid", placeItems: "center" }}>
          <BottomGlassDemo />
        </div>
      </div>
    </main>
  )
}
