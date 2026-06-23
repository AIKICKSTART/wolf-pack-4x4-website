import type { Metadata } from "next"

import { UnsubscribePageTemplate } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Unsubscribe template | Notifications",
  description:
    "Primitive 14 — post-link-click unsubscribe confirmation page with re-subscribe and manage CTAs.",
}

export default function UnsubscribeTemplateScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Unsubscribe"
        title="Unsubscribe page template"
        description="A compact template for the landing page someone reaches after clicking the unsubscribe link in an email. Confirms the action, shows context, and offers a re-subscribe and manage-preferences path."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Unsubscribe template" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <UnsubscribePageTemplate
          headline="You're unsubscribed"
          subline="You won't receive the Mufflermen weekly digest anymore. Other notifications about your bookings and invoices will keep coming through."
          listName="Mufflermen weekly workshop digest"
          recipientEmail="marcus.wells@example.com"
          resubscribeHref="#resubscribe"
          managePreferencesHref="#manage"
        />
      </section>
    </main>
  )
}
