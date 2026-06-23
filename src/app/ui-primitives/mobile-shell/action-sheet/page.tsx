import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { ActionSheetDemo } from "./action-sheet-demo"

export const metadata: Metadata = {
  title: "Action sheet | UI Primitives — Mobile Shell",
}

export default function ActionSheetPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 06"
        title="Action sheet"
        description="iOS-style sectioned action sheet. Title and description optional, destructive tone for delete, separate cancel button card. Esc and backdrop dismiss."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Action sheet" },
        ]}
      />
      <section className={styles.canvas} aria-label="Action sheet demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Per-job menu. Faster than a popover when you need 3 to 6 ordered actions with a clear
            destructive option at the bottom.
          </p>
        </div>
        <ActionSheetDemo />
      </section>
    </main>
  )
}
