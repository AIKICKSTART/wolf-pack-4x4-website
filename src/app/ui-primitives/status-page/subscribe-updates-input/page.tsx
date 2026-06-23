import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SubscribeUpdatesInput } from "../../components/status-page"

import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Subscribe updates | Status page",
  description:
    "Primitive 07 — inline subscribe form with email/SMS toggle and frequency picker.",
}

export default function SubscribeUpdatesInputScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Form"
        title="Subscribe updates input"
        description="The footer form on a public status page. Channel toggle (email / SMS), endpoint input that swaps placeholder and input type with channel, frequency picker (instant / hourly / daily) and a short privacy note. Stateful client component."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Subscribe updates input" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · form interaction</span>
        <SubscribeUpdatesInput
          initialChannel="email"
          initialFrequency="instant"
          privacyNote="We only use this address for Mufflermen status updates. Never shared, never marketed to."
        />
      </section>
    </main>
  )
}
