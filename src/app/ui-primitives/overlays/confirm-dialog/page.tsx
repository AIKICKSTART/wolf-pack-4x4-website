import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { ConfirmDialogDemo } from "./confirm-dialog-demo"

export const metadata: Metadata = {
  title: "Confirm dialog | UI Primitives — Overlays",
}

export default function ConfirmDialogPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 02"
        title="Confirm dialog"
        description="Two-button confirmation with default and destructive variants. The destructive variant pairs a warning icon with a red CTA. Cancel returns focus to the trigger."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Confirm dialog" },
        ]}
      />
      <section className={styles.canvas} aria-label="Confirm dialog demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Destructive variant guards permanent actions — cancelling a job, refunding a deposit,
            voiding a quote. Default variant covers benign confirmations.
          </p>
        </div>
        <ConfirmDialogDemo />
      </section>
    </main>
  )
}
