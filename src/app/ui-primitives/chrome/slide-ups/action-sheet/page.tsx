import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { ActionSheetDemo } from "./action-sheet-demo"

export const metadata: Metadata = {
  title: "Slide-up · Action sheet | UI Primitives — Chrome",
}

export default function SlideUpActionSheetRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Slide 15 / Chrome"
        title="Action sheet"
        description="iOS-style action sheet with grouped actions, descriptions and a cancel pill. Drag handle at the top, contextual list inside."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Action sheet" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live action sheet preview
          <span>Mobile · iOS-style</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 540 }}>
          <ActionSheetDemo />
        </div>
      </div>
    </main>
  )
}
