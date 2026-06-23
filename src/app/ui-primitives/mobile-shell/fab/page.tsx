import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { FabDemo } from "./fab-demo"

export const metadata: Metadata = {
  title: "FAB | UI Primitives — Mobile Shell"
,
}

export default function FabPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 12"
        title="Floating action button"
        description="Icon-only or extended FAB. Four tones, three corner positions, press-down state. aria-label on icon-only, visible label when extended."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "FAB" },
        ]}
      />
      <section className={styles.canvas} aria-label="FAB demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Anchors the primary action on a screen — Create job, Scan VIN, Photo evidence, Call
            customer. Stays above the bottom nav.
          </p>
        </div>
        <FabDemo />
      </section>
    </main>
  )
}
