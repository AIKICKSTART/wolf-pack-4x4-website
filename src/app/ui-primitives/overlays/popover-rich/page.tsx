import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { PopoverRichDemo } from "./popover-rich-demo"

export const metadata: Metadata = {
  title: "Rich popover | UI Primitives — Overlays",
}

export default function PopoverRichPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 12"
        title="Rich popover"
        description="Anchored popover with header / body / footer slots. Repositions around the viewport using @base-ui/react Popover. Closes on outside click or Esc."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Rich popover" },
        ]}
      />
      <section className={styles.canvas} aria-label="Rich popover demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Hover-anchored detail cards for parts, customers, or workshop bays. Use the footer
            for a single primary action that closes the popover.
          </p>
        </div>
        <PopoverRichDemo />
      </section>
    </main>
  )
}
