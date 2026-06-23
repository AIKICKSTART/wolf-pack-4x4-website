import type { Metadata } from "next"

import { EmailDigestPreview } from "../../components/notifications"
import { PageHeader } from "../../components/page-header"

import styles from "../notifications.module.css"

export const metadata: Metadata = {
  title: "Email digest preview | Notifications",
  description:
    "Primitive 12 — realistic email digest card styled as an inbox preview (sender, subject, preheader, excerpt).",
}

export default function EmailDigestScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Email"
        title="Email digest preview"
        description="A compact email row styled like an inbox preview — sender avatar with initials, sender name, subject, preheader, excerpt, optional tags, and a star button on the right."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications", href: "/ui-primitives/notifications" },
          { label: "Email digest" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack} style={{ maxWidth: 620 }}>
          <EmailDigestPreview
            senderName="Mufflermen"
            senderEmail="bookings@mufflermen.com.au"
            subject="Your weekly workshop digest — 3 confirmed bookings"
            preheader="Bay 02 + Bay 03 fully scheduled · 2 quotes awaiting approval"
            excerpt="Hey Daniel — here's the week ahead. 3 confirmed bookings, 2 quotes awaiting customer sign-off, and 1 overdue invoice. Tap below for the full run sheet."
            timestamp="Today · 06:00"
            tags={["Digest", "Workshop"]}
            unread
            starred
          />
          <EmailDigestPreview
            senderName="Tradie Fleet Co"
            senderEmail="accounts@tradiefleet.com.au"
            subject="Payment received — INV-1043"
            preheader="$612.50 settled via direct debit. Receipt attached."
            timestamp="Yesterday"
            tags={["Billing"]}
          />
          <EmailDigestPreview
            senderName="Marcus Wells"
            subject="Re: quote Q-2415 — happy to proceed"
            preheader="Cheers — let's book it in for next Tuesday morning if Bay 02 is free."
            excerpt="Looks good mate, the cat-back deal works for me. Tuesday morning if you can squeeze us in, otherwise Thursday is fine too."
            timestamp="Tue · 14:22"
          />
        </div>
      </section>
    </main>
  )
}
