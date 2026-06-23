import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"

import styles from "../../chrome.module.css"

import { DetailCardDemo } from "./detail-card-demo"

export const metadata: Metadata = {
  title: "Slide-up · Detail card | UI Primitives — Chrome",
}

export default function SlideUpDetailCardRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Slide 17 / Chrome"
        title="Detail card"
        description="Half-sheet quote summary with stat tiles, status chips and primary/secondary action buttons."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Detail card" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live detail card preview
          <span>Half · sheet</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 540 }}>
          <DetailCardDemo />
        </div>
      </div>
    </main>
  )
}
