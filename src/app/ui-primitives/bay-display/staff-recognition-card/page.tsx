import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { StaffRecognitionCard } from "../../components/bay-display"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Staff recognition card | UI Primitives — Bay Display",
}

export default function StaffRecognitionCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.10 / Bay display"
        title="Staff recognition card"
        description="Employee-of-the-week card for the front-of-house wall — large avatar with amber halo, name in Anton, reason quote in italic Fraunces for editorial warmth."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Staff recognition card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.row}>
          <StaffRecognitionCard
            name="Sophie Tan"
            role="Lead fitter"
            tenureLabel="5 years at Oak Flats"
            reason="Saved the McKinnon Patrol tune by spotting a cracked manifold on the third pull. Pulled it apart on her own time and had it back together by close."
          />
          <StaffRecognitionCard
            periodLabel="Apprentice of the month"
            name="Jordan Pace"
            role="Apprentice Y3"
            tenureLabel="2.5 years at Oak Flats"
            reason="Owned every Hilux N80 cat-back fit this month — Aleksic's was the cleanest weld this side of Wollongong."
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Avatar falls back to coloured initials when photoSrc is absent.
            Period label, role and tenure all overrideable so the same
            primitive renders Employee of the Week, Apprentice of the Month or
            Long-Service callouts.
          </p>
        </div>
      </section>
    </main>
  )
}
