import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AnnouncementCard } from "../../components/product-tours"
import { DismissableAnnouncementDemos } from "../_interactive-demos"

import styles from "../product-tours.module.css"

export const metadata: Metadata = {
  title: "Announcement card | Product tours",
  description:
    "Primitive 08 — in-app announcement card with image, title, body, dismiss, and CTA.",
}

export default function AnnouncementCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Announcement"
        title="Announcement card"
        description="In-app announcement card. Image + title + body + dismiss × + CTA. Compact bar variant for top-of-dashboard product news."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Announcement card" },
        ]}
      />

      <DismissableAnnouncementDemos />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>What&apos;s new · loyalty milestones</span>
        <AnnouncementCard
          kicker="What's new · 12 May"
          title="Loyalty milestones now visible in every quote"
          body="Customers see exactly how many services until the next unlock — free pre-inspection at 4, free dyno-tune at 12."
          ctaLabel="View milestones"
          tone="green"
        />
      </section>
    </main>
  )
}
