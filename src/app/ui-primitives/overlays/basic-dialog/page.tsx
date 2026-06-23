import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { BasicDialogDemo } from "./basic-dialog-demo"

export const metadata: Metadata = {
  title: "Basic dialog | UI Primitives — Overlays",
}

export default function BasicDialogPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 01"
        title="Basic dialog"
        description="Centered modal dialog with title, scroll body, and action footer. Built on @base-ui/react Dialog with custom GlassSurface-style background, blur backdrop, focus trap, and Esc-to-close."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Basic dialog" },
        ]}
      />
      <section className={styles.canvas} aria-label="Basic dialog demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Daily-driver dialog for confirming a part order, editing a quote line item, or
            attaching workshop notes. Click outside or press Esc to dismiss.
          </p>
        </div>
        <BasicDialogDemo />
      </section>
    </main>
  )
}
