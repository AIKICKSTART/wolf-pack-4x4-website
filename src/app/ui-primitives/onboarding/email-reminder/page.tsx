import type { Metadata } from "next"

import { OnboardingEmailReminder } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Email reminder | Onboarding",
  description:
    "Primitive 12 — inline reminder card showing the next onboarding email Mufflermen will receive, with subject, sender, preview snippet and send-time chip.",
}

export default function EmailReminderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Email reminder"
        title="Onboarding email reminder"
        description="An inline card surfaced in-app that previews the next email the onboarding sequence will send. Shows the sender, subject, a snippet of the body, and the scheduled send time. Includes a pause-reminders link for users who don't need the nudges."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Email reminder" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Wednesday morning nudge</span>
        <OnboardingEmailReminder
          sendsAt="Sends Wednesday · 9 AM AEST"
          subject="One more thing — connect your Stripe payouts"
          from="onboarding@mufflermen.com.au"
          preview="G'day Daniel, just a quick nudge — connecting Stripe now means Bay 1's first muffler swap can take card payment without leaving the front desk."
          pauseHref="#pause"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Friday digest variant</span>
        <OnboardingEmailReminder
          kicker="Up next in your inbox"
          sendsAt="Sends Friday · 4 PM AEST"
          subject="Your Oak Flats week — 12 jobs, 4 quotes"
          from="weekly@mufflermen.com.au"
          preview="Recap of Bay 1 + Bay 2 throughput, parts movement, and three customer follow-ups that need closing out before the weekend."
          pauseHref="#pause-digest"
        />
      </section>
    </main>
  )
}
