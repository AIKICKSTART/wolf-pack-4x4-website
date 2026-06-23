import type { Metadata } from "next"

import { NotificationRuleRow } from "../../components/forms-platform"
import { PageHeader } from "../../components/page-header"

import { NOTIFICATION_RULES } from "../fixtures"
import styles from "../forms-platform.module.css"

export const metadata: Metadata = {
  title: "Notification rule row | Forms platform",
  description:
    "Primitive 10 — the on-submit notification rule row across email, SMS, Slack, and webhook channels.",
}

export default function NotificationRuleRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Notification rule row"
        title="Notification rule row"
        description="Four notification rules — workshop digest by email, owner deposit SMS, Slack #bookings ping, and the Hermes rejection webhook (currently disabled). The toggle row controls armed state without leaving the inbox."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform", href: "/ui-primitives/forms-platform" },
          { label: "Notification rule row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — Mufflermen forms notifications
        </span>
        <div className={styles.demoRowList}>
          {NOTIFICATION_RULES.map((rule) => (
            <NotificationRuleRow key={rule.id} rule={rule} />
          ))}
        </div>
      </section>
    </main>
  )
}
