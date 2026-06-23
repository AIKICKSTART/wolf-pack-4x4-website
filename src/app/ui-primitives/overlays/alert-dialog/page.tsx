import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { AlertDialogDemo } from "./alert-dialog-demo"

export const metadata: Metadata = {
  title: "Alert dialog | UI Primitives — Overlays",
}

export default function AlertDialogPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 03"
        title="Alert dialog"
        description="Hard alert built on @base-ui/react AlertDialog. Pulsing warning ring, single OK button, no outside-click dismiss. Use for blocking system messages that demand explicit acknowledgement."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Alert dialog" },
        ]}
      />
      <section className={styles.canvas} aria-label="Alert dialog demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Stops the operator. WorkCover-mandated lockout reminders, hoist failure notices,
            shop-wide gas-line shut-off. Cannot be dismissed without explicit acknowledgement.
          </p>
        </div>
        <AlertDialogDemo />
      </section>
    </main>
  )
}
