import type { Metadata } from "next"

import { EmptyTeamPrompt } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Empty team prompt | Onboarding",
  description:
    "Primitive 11 — empty-state prompt when no Mufflermen crew members exist, with a primary invite-team CTA and an import-from-CSV alternative.",
}

export default function EmptyTeamPromptScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Empty team"
        title="Empty team prompt"
        description="An empty-state surface for the crew screen when no team members have been added yet. Includes an SVG illustration of three crew silhouettes with one highlighted as the invite slot, a primary invite-team CTA, and a quieter import-from-CSV alternative."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Empty team prompt" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — invite Mufflermen crew</span>
        <EmptyTeamPrompt
          kicker="Crew"
          title="No Mufflermen crew yet"
          body="Invite bay leads, parts receivers, and front-desk staff to your Oak Flats workshop. They'll each get the right role-scoped dashboard and SafeWork induction."
          inviteHref="#invite"
          secondaryHref="#csv"
        />
      </section>
    </main>
  )
}
