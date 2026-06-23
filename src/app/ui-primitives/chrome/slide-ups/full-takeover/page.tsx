import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { FullTakeoverDemo } from "./full-takeover-demo"

export const metadata: Metadata = {
  title: "Slide-up · Full takeover | UI Primitives — Chrome",
}

export default function SlideUpFullTakeoverRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Slide 16 / Chrome"
        title="Full takeover"
        description="Edge-to-edge slide-up that fills the viewport. Includes a header with kicker, breadcrumb in the body, and a footer slot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Full takeover" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live full takeover preview
          <span>Takeover</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 540 }}>
          <FullTakeoverDemo />
        </div>
      </div>
    </main>
  )
}
