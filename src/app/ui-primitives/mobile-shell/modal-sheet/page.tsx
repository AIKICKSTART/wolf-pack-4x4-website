import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { ModalSheetDemo } from "./modal-sheet-demo"

export const metadata: Metadata = {
  title: "Modal sheet | UI Primitives — Mobile Shell",
}

export default function ModalSheetPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 10"
        title="Modal sheet"
        description="Bottom-rounded sheet with drag handle and peek / half / full snap presets. Scrollable body, sticky header and footer. Esc and backdrop dismiss."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Modal sheet" },
        ]}
      />
      <section className={styles.canvas} aria-label="Modal sheet demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Quote send sheet — peek to glance at the subtotal, half to scan the line items, full to
            edit labour and parts before sending.
          </p>
        </div>
        <ModalSheetDemo />
      </section>
    </main>
  )
}
