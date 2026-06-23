import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { BottomSheetDemo } from "./bottom-sheet-demo"

export const metadata: Metadata = {
  title: "Bottom sheet | UI Primitives — Overlays",
}

export default function BottomSheetPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 05"
        title="Bottom sheet"
        description="Mobile-style sheet that animates up from the bottom. Visual drag handle, optional auto / half / full heights, sticky title and footer. Closes on outside click or Esc."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Bottom sheet" },
        ]}
      />
      <section className={styles.canvas} aria-label="Bottom sheet demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Quick actions on the workshop tablet — booking a courtesy car, picking up a customer
            signature, selecting parts from a long picker list.
          </p>
        </div>
        <BottomSheetDemo />
      </section>
    </main>
  )
}
