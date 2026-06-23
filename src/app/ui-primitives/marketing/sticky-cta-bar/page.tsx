import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StickyCtaBar } from "../../components/marketing/sticky-cta-bar"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Sticky CTA bar | Marketing Blocks",
  description:
    "Primitive 13 — top/bottom sticky CTA bar that auto-hides on scroll down and reveals on scroll up.",
}

export default function StickyCtaBarPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Sticky CTA bar"
        title="Sticky CTA bar"
        description="Pinned top bar with a single conversion message and a primary/secondary action. Auto-hides on scroll down, reveals on scroll up."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Sticky CTA bar" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Sticky CTA bar demo">
        <span className={styles.stageCaption}>
          Scroll up and down to watch the bar pinned at the top of the viewport reveal and hide.
        </span>
        <div style={{ minHeight: 1400 }} />
      </section>

      <StickyCtaBar
        message="End-of-month catback specials — save on Manta installs."
        badge="Limited"
        primaryAction={{ label: "Book a bay", href: "#book" }}
        secondaryAction={{ label: "See pricing", href: "#pricing" }}
      />
    </main>
  )
}
