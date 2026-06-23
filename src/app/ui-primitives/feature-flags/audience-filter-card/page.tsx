import type { Metadata } from "next"

import { AudienceFilterCard } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Audience filter card | Feature flags",
  description:
    "Primitive 06 — audience card with member-count, criteria chips and edit/duplicate/archive actions.",
}

export default function AudienceFilterCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Audiences"
        title="Audience filter card"
        description="Reusable saved-audience card. Shows the audience name, total member count formatted as 12.5k / 1.2M, a list of tone-coded criteria chips summarising the underlying rule set, and three action buttons (Edit / Duplicate / Archive — the last in destructive red)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Audience filter card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three saved audiences</span>
        <div className={styles.demoSplit}>
          <AudienceFilterCard
            name="Oak Flats counter staff"
            description="Service-advisor + front-desk roles in the Oak Flats workshop."
            memberCount={42}
            criteria={[
              { label: "workspace = oak-flats", tone: "teal" },
              { label: "role IN advisor + reception", tone: "amber" },
            ]}
          />
          <AudienceFilterCard
            name="NSW mobile beta"
            description="Customers running the Mufflermen mobile app inside NSW."
            memberCount={12450}
            criteria={[
              { label: "geo = AU-NSW", tone: "green" },
              { label: "device IN ios + android", tone: "teal" },
              { label: "version >= 4.6.0", tone: "amber" },
            ]}
          />
          <AudienceFilterCard
            name="Internal Mufflermen team"
            description="All Verridian + Mufflermen staff email domains."
            memberCount={108}
            criteria={[
              { label: "user.email ends mufflermen.com.au", tone: "red" },
              { label: "user.email ends verridian.ai", tone: "red" },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
