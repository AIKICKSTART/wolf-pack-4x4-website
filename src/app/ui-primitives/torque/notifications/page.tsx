import type { Metadata } from "next"

import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { MetricBlock } from "@/app/ui-primitives/components/data-display/metric-block"
import { StatusBadge } from "@/app/ui-primitives/components/data-display/status-badge-grid"

import { NotificationsInbox } from "./_notifications-inbox"
import { INBOX_METRICS, INBOX_STATUS_CHIPS } from "./_demo-data"
import styles from "./notifications.module.css"

export const metadata: Metadata = {
  title: "Torque notifications inbox | UI Primitives — Torque",
  description:
    "Torque keeps the Oak Flats Muffler Men owner informed — grouped alerts for sign-off, system, agent activity, social and SEO, with mark-read, dismiss and mark-all-read.",
}

export default function TorqueNotificationsPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Torque.00 / Notifications inbox"
        title="Torque — notifications inbox"
        description="One place for everything Torque, your Oak Flats Muffler Men business assistant, wants you to see — Illawarra NSW exhausts, custom fabrication and servicing. Alerts are grouped by lane (sign-off, system & site, Torque activity, social & reviews, SEO), tone-coded at a glance, and clearable in a tap: mark read, dismiss, or mark a whole lane done."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Torque", href: "/ui-primitives/torque" },
          { label: "Notifications inbox" },
        ]}
      />

      <div className={styles.canvas}>
        <section className={styles.hero} aria-labelledby="torque-inbox-heading">
          <div className={styles.heroIdentity}>
            {/* Placeholder Torque avatar — the real mascot lands later. */}
            <span className={styles.avatar} aria-hidden="true">
              T
            </span>
            <div className={styles.heroCopy}>
              <span className={styles.kicker}>Your Mufflermen business assistant</span>
              <h2 id="torque-inbox-heading" className={styles.heroTitle}>
                Here&rsquo;s what needs you
              </h2>
              <p className={styles.heroSub}>
                Torque triages every signal across the workshop and the site, then
                surfaces only what&rsquo;s worth your attention. Three actions are waiting
                on your sign-off this morning — the rest is handled.
              </p>
            </div>
          </div>
          <div className={styles.heroStatus} role="status" aria-label="Inbox status">
            {INBOX_STATUS_CHIPS.map((chip) => (
              <StatusBadge
                key={chip.label}
                tone={chip.tone}
                size="md"
                shape="pill"
                label={chip.label}
              />
            ))}
          </div>
        </section>

        <section className={styles.metricStrip} aria-label="Inbox at a glance">
          <MetricBlock metrics={INBOX_METRICS} />
        </section>

        <section className={styles.inboxWrap} aria-label="Grouped notifications">
          <NotificationsInbox />
        </section>

        <div className={styles.note}>
          <span>Composition notes</span>
          <p>
            One screen composed entirely from existing primitives — the
            notification card (tone glyph, read-state toggle and inline actions),
            status badges for lane chips, and the metric strip — wrapped in a
            client inbox that groups alerts by lane and owns the read / dismiss /
            mark-all-read state. Realistic Oak Flats Muffler Men demo data; light +
            dark, mobile-first responsive, and accessible end to end.
          </p>
        </div>
      </div>
    </main>
  )
}
