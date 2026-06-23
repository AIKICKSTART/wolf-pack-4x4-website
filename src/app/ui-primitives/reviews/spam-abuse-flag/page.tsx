import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SpamAbuseFlag } from "../../components/reviews"

import styles from "../reviews.module.css"

export const metadata: Metadata = {
  title: "Spam / abuse flag | Reviews",
  description:
    "Primitive 12 — flag a review action with reason chips and optional context note.",
}

export default function SpamAbuseFlagScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Flag"
        title="Spam & abuse flag"
        description="Report-this-review surface — reason chips (Spam / Off-topic / Hateful / Personal info), optional context textarea, send-report CTA, and a confirmation receipt with a tracked report ID."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reviews", href: "/ui-primitives/reviews" },
          { label: "Spam flag" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Reporting a suspected spam review</span>
        <SpamAbuseFlag reviewId="rev-spam-001" />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Custom heading for an Albion Park complaint</span>
        <SpamAbuseFlag
          reviewId="rev-personal-info-001"
          title="Tell us what’s wrong with this review"
          label="Pick the closest reason"
        />
      </section>
    </main>
  )
}
