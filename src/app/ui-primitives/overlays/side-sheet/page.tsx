import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { SideSheetDemo } from "./side-sheet-demo"

export const metadata: Metadata = {
  title: "Side sheet | UI Primitives — Overlays",
}

export default function SideSheetPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 04"
        title="Side sheet"
        description="Right or left side sheet with sticky header, scrollable body, and sticky footer actions. Three width tiers (sm / md / lg) and full keyboard support including Esc-to-close and focus restoration."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Side sheet" },
        ]}
      />
      <section className={styles.canvas} aria-label="Side sheet demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Detail editor for supplier records, customer cars, parts pricelines, or audit trail
            entries. Keeps the underlying list visible so context is never lost.
          </p>
        </div>
        <SideSheetDemo />
      </section>
    </main>
  )
}
