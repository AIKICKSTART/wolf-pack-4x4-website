import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../mobile-shell.module.css"

import { SwipeActionsDemo } from "./swipe-actions-demo"

export const metadata: Metadata = {
  title: "Swipe action row | UI Primitives — Mobile Shell",
}

export default function SwipeActionsPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Mobile / Shell · 15"
        title="Swipe action row"
        description="List row with leading and trailing action lanes revealed via CSS keyframe demo. Tone-tinted lanes for done, flag, call, archive, delete. Visual only — consumers wire touch handlers."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Mobile Shell", href: "/ui-primitives/mobile-shell" },
          { label: "Swipe actions" },
        ]}
      />
      <section className={styles.canvas} aria-label="Swipe action row demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Inbox triage on the workshop tablet — swipe right to clear, swipe left to call the
            customer or archive.
          </p>
        </div>
        <SwipeActionsDemo />
      </section>
    </main>
  )
}
