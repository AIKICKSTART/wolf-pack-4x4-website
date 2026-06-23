import type { Metadata } from "next"

import { MobilePreviewToggle } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Mobile preview toggle | Email builder",
  description:
    "Primitive 04 — device chips for mobile and desktop, a scale toggle, and a dark-mode preview switch.",
}

export default function MobilePreviewToggleScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Mobile preview toggle"
        title="Mobile preview toggle"
        description="A compact control bar that drives the preview surface — mobile vs desktop with the canonical pixel widths, a 75/100/125% scale toggle, and a dark-mode switch for verifying behaviour in dark inbox clients."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Mobile preview toggle" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — preview control bar</span>
        <MobilePreviewToggle />
      </section>
    </main>
  )
}
