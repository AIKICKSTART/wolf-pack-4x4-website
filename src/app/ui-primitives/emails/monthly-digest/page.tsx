import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  EmailMonthlyDigest,
  EmailPreviewFrame,
} from "../../components/emails"

import styles from "../emails.module.css"

export const metadata: Metadata = {
  title: "Monthly digest email | Email Templates",
  description:
    "Template 08 — Mufflermen monthly workshop digest with 4 stat cards and the top 3 articles of the month.",
}

export default function MonthlyDigestEmailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Template 08 / Monthly digest"
        title="Monthly digest"
        description="A monthly workshop wrap-up — four highlight stats, the three most-read articles, and a clear opt-out in the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Emails", href: "/ui-primitives/emails" },
          { label: "Monthly digest" },
        ]}
      />
      <EmailPreviewFrame
        meta={{
          from: "Oak Flats Mufflermen <news@mufflermen.com.au>",
          to: "jordan.harris@example.com.au",
          subject: "May 2026 at the bay",
        }}
        email={
          <EmailMonthlyDigest
            recipientFirstName="Jordan"
            monthLabel="May 2026"
            stats={[
              { label: "Jobs completed", value: "184", delta: "+12% MoM" },
              { label: "Avg turnaround", value: "3.4d", delta: "-0.6d MoM" },
              { label: "Parts shipped", value: "612", delta: "+8% MoM" },
              { label: "Customer rating", value: "4.9", delta: "+0.1 MoM" },
            ]}
            articles={[
              {
                tag: "How-to",
                title: "When to upgrade your factory mid-pipe",
                blurb:
                  "Mid-pipes wear differently to mufflers — here's what to look for under the car.",
                url: "https://mufflermen.com.au/journal/upgrade-mid-pipe",
              },
              {
                tag: "Build",
                title: "VL Commodore turbo · full custom 3\" stainless",
                blurb:
                  "Walking through a top-to-tail custom system built in the Oak Flats bay this month.",
                url: "https://mufflermen.com.au/journal/vl-3in-build",
              },
              {
                tag: "Workshop",
                title: "We hired a third tech — meet Mitch",
                blurb:
                  "Bay 3 just got faster. Mitch joins us from a heavy-diesel shop in Wollongong.",
                url: "https://mufflermen.com.au/journal/welcome-mitch",
              },
            ]}
            workshopAddress="Unit 4, 132 Central Ave, Oak Flats NSW 2529"
            workshopPhone="(02) 4256 1972"
            unsubscribeUrl="https://mufflermen.com.au/email/preferences"
          />
        }
      />
    </main>
  )
}
