import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { SegmentedDemo } from "./segmented-demo"

export const metadata: Metadata = {
  title: "Segmented (iOS) | UI Primitives — Mobile Shell",
}

export default function SegmentedPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 13"
        title="Segmented (iOS)"
        description="iOS-style segmented control. Shared layout pill slides between segments. role=radiogroup with aria-checked on the active segment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Segmented" },
        ]}
      />
      <section className={styles.canvas} aria-label="Segmented demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Three-way job status filter. Tighter than the tab strip when there are only 2 to 4
            mutually exclusive views.
          </p>
        </div>
        <SegmentedDemo />
      </section>
    </main>
  )
}
