import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuotaMeter } from "../../components/api-console"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Quota meter | API Console",
  description:
    "Primitive 08 — monthly call quota meter with overage tracking and tone-shifting progress.",
}

export default function QuotaMeterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Quota meter"
        title="Quota meter"
        description="Monthly call quota — used versus included limit, with an overage band that appears when the workshop has spilled into pay-as-you-go territory. Tone shifts from calm to over as utilisation climbs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Quota meter" },
        ]}
      />
      <section className={styles.stack} aria-label="Quota meter states">
        <QuotaMeter
          used={48_412}
          limit={100_000}
          overage={0}
          period="May 2026"
          overageRate="$0.002 / call"
        />
        <QuotaMeter
          used={92_120}
          limit={100_000}
          overage={0}
          period="April 2026"
          overageRate="$0.002 / call"
        />
        <QuotaMeter
          used={118_540}
          limit={100_000}
          overage={18_540}
          period="March 2026"
          overageRate="$0.002 / call"
        />
      </section>
    </main>
  )
}
