import type { Metadata } from "next"

import { NotificationPreviewModal } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Preview modal | Notifications",
  description:
    "Primitive 13 — cross-channel preview modal showing email, SMS, push, and in-app side by side.",
}

export default function PreviewModalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Preview modal"
        title="Cross-channel preview modal"
        description="A modal layout that renders a notification simultaneously across email, SMS, push, and in-app. Useful inside rule editors and template designers so authors see every surface at once."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Preview modal" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <NotificationPreviewModal
          content={{
            emailSenderName: "Mufflermen",
            emailSenderEmail: "bookings@mufflermen.com.au",
            emailSubject: "Quote Q-2415 approved — let's get you booked",
            emailPreheader: "Stage 2 cat-back · $1,840 incl. labour",
            emailExcerpt:
              "Hey Marcus — your Stage 2 cat-back upgrade quote is locked in. Reply with a day and we'll slot Bay 02 in for you.",
            emailTimestamp: "Today · 08:42",
            smsFrom: "Mufflermen",
            smsBody:
              "Mufflermen: Quote Q-2415 approved. Reply YES to book Bay 02 next Tue 09:30. Reply STOP to opt out.",
            pushAppName: "Mufflermen",
            pushTitle: "Quote Q-2415 approved",
            pushBody: "Marcus signed off the Stage 2 cat-back. Tap to book a bay.",
            pushTimestamp: "now",
            inappTitle: "Quote Q-2415 approved by Marcus Wells",
            inappTimestamp: "Just now",
          }}
        />
      </section>
    </main>
  )
}
