import type { Metadata } from "next"

import { PushNotificationPreview } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Push preview | Notifications",
  description:
    "Primitive 11 — realistic iOS / Android / lockscreen push notification mock with tone toggle.",
}

export default function PushPreviewScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Push"
        title="Push notification preview"
        description="A realistic mock of a push notification with iOS dark, Android dark, and lockscreen variants. Use it inside rule editors and template previews so authors can see exactly what lands on a phone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Push preview" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 420 }}>
          <PushNotificationPreview
            content={{
              appName: "Mufflermen",
              title: "Booking confirmed — Bay 02",
              body: "Holden Commodore VZ scheduled for 09:30 with Marcus Wells. Tap to view the run sheet.",
              timestamp: "now",
            }}
          />
        </div>
      </section>
    </main>
  )
}
