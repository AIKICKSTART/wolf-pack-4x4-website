import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { LoadingOverlayDemo } from "./loading-overlay-demo"

export const metadata: Metadata = {
  title: "Loading overlay | UI Primitives — Overlays",
}

export default function LoadingOverlayPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 14"
        title="Loading overlay"
        description="Translucent veil with brand-tinted spinner and optional descriptive message. Can be scoped to a single panel (absolute) or take over the viewport (fixed)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Loading overlay" },
        ]}
      />
      <section className={styles.canvas} aria-label="Loading overlay demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Wraps the panel that&apos;s actively loading — pricelist sync, dyno-sheet upload,
            Stripe intent creation. Pair the message with a verb that names the operation.
          </p>
        </div>
        <LoadingOverlayDemo />
      </section>
    </main>
  )
}
