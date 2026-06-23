import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NewsletterCta } from "../../components/marketing/newsletter-cta"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Newsletter CTA | Marketing Blocks",
  description:
    "Primitive 09 — conversion-focused newsletter sign-up with email + submit + privacy note.",
}

export default function NewsletterCtaPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Newsletter CTA"
        title="Newsletter CTA"
        description="Single-field, single-button newsletter section with status feedback and a small privacy line."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Newsletter CTA" },
        ]}
      />

      <NewsletterCta
        kicker="Workshop dispatch"
        heading="Get the next Manta drop in your inbox."
        body="One email a month — what's landed in the cage upstairs, what's on the dyno, and any Illawarra trade nights coming up."
        ctaLabel="Subscribe"
        privacyNote="No spam, no upsells. Unsubscribe in one click from any email."
      />
    </main>
  )
}
