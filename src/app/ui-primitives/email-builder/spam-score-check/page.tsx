import type { Metadata } from "next"

import { SpamScoreCheck } from "../../components/email-builder"
import { PageHeader } from "../../components/page-header"

import { SAMPLE_SUBJECT, SPAM_WARNINGS } from "../fixtures"
import styles from "../email-builder.module.css"

export const metadata: Metadata = {
  title: "Spam score check | Email builder",
  description:
    "Primitive 10 — 0–10 deliverability gauge and a tone-coded warnings list with ignore + restore controls.",
}

export default function SpamScoreCheckScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Spam score check"
        title="Spam score check"
        description="A 0–10 deliverability gauge tone-shifted by severity, with the subject and body excerpt that fed it. Warnings render as severity-toned rows with Ignore / Restore controls. High-severity warnings flip the alert strip via role=alert."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder", href: "/ui-primitives/email-builder" },
          { label: "Spam score check" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Winter newsletter score</span>
        <div className={styles.demoInline}>
          <SpamScoreCheck
            score={4.2}
            subject={SAMPLE_SUBJECT}
            bodyExcerpt="Hi {{first_name}} — here's what's new in Oak Flats this month. Your last quote, {{quote.total}}, is still on the bench…"
            warnings={SPAM_WARNINGS}
          />
        </div>
      </section>
    </main>
  )
}
