import type { Metadata } from "next"

import { SubscribeToggle } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Subscribe toggle | Notifications",
  description:
    "Primitive 10 — subscribe/unsubscribe button with bell-shake animation on opt-in.",
}

export default function SubscribeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Subscribe"
        title="Subscribe toggle"
        description="A pill-shaped toggle for subscribing to a notification source. The bell glyph shakes briefly when a user opts in, and the pressed state shifts to brand red with a soft shadow."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Subscribe" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoInline}>
          <SubscribeToggle subscribed controlled={false} defaultSubscribed size="sm" />
          <SubscribeToggle subscribed={false} controlled={false} size="md" />
          <SubscribeToggle subscribed controlled={false} defaultSubscribed size="lg" />
        </div>
      </section>
    </main>
  )
}
