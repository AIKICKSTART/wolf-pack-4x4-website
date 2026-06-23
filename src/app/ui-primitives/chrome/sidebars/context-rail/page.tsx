import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { ContextRailDemo } from "./context-rail-demo"

export const metadata: Metadata = {
  title: "Sidebar · Context rail | UI Primitives — Chrome",
}

export default function SidebarContextRailRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Side 22 / Chrome"
        title="Context rail"
        description="Right-side metadata rail showing current page meta, stat tiles, related items and primary actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Context rail" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live context rail preview
          <span>Context</span>
        </span>
        <div className={styles.demoFrameBody} style={{ display: "grid", gridTemplateColumns: "1fr auto", minHeight: 620 }}>
          <div style={{ padding: "var(--primitive-space-6)", color: "var(--primitive-body)", fontSize: "var(--primitive-text-sm)" }}>
            <p>Page content sits to the left.</p>
          </div>
          <ContextRailDemo />
        </div>
      </div>
    </main>
  )
}
