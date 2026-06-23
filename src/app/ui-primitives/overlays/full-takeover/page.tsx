import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { FullTakeoverDemo } from "./full-takeover-demo"

export const metadata: Metadata = {
  title: "Full takeover | UI Primitives — Overlays",
}

export default function FullTakeoverPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 07"
        title="Full takeover"
        description="Full-viewport modal that hides the dashboard chrome entirely. Includes a minimise affordance for returning to compact mode without losing state. Use for focus-mode review or in-depth editors."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Full takeover" },
        ]}
      />
      <section className={styles.canvas} aria-label="Full takeover demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Pre-pickup quality-control reviewer, full-screen dyno comparison, or annotated photo
            walkaround. The minimise control returns the operator to the dashboard.
          </p>
        </div>
        <FullTakeoverDemo />
      </section>
    </main>
  )
}
