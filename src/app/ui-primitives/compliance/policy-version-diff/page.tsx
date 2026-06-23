import type { Metadata } from "next"

import { PolicyVersionDiff } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Policy version diff | Compliance",
  description:
    "Primitive 12 — side-by-side or unified policy version diff with added/removed/changed lines and effective-date.",
}

export default function PolicyVersionDiffScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Diff"
        title="Policy version diff"
        description="Side-by-side or unified diff of a published policy between two versions — added (green), removed (red), and changed (amber) lines are tone-highlighted. Includes version chips and the effective-date so legal review can confirm what shipped and when. Stateful view-toggle switches split / unified."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Policy version diff" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · privacy policy v3.2 → v3.3</span>
        <PolicyVersionDiff
          policyName="Privacy policy"
          previousVersion="v3.2"
          currentVersion="v3.3"
          effectiveDate="2026-06-01"
          lines={[
            {
              id: "1",
              kind: "equal",
              previousText: "Oak Flats Mufflermen Pty Ltd (ACN 654 321 098) collects personal information",
              currentText: "Oak Flats Mufflermen Pty Ltd (ACN 654 321 098) collects personal information",
            },
            {
              id: "2",
              kind: "changed",
              previousText: "in accordance with the Australian Privacy Principles.",
              currentText: "in accordance with the Australian Privacy Principles (Privacy Act 1988 Cth).",
            },
            {
              id: "3",
              kind: "equal",
              previousText: "",
              currentText: "",
            },
            {
              id: "4",
              kind: "removed",
              previousText: "We retain telephony recordings for 12 months.",
            },
            {
              id: "5",
              kind: "added",
              currentText: "We retain telephony recordings for 31 days, then crypto-erase them.",
            },
            {
              id: "6",
              kind: "added",
              currentText: "Recordings under legal hold are exempt from disposal until released.",
            },
            {
              id: "7",
              kind: "equal",
              previousText: "Contact privacy@mufflermen.com.au to lodge a DSR.",
              currentText: "Contact privacy@mufflermen.com.au to lodge a DSR.",
            },
            {
              id: "8",
              kind: "changed",
              previousText: "We respond within 30 days of verified request.",
              currentText: "We respond within 30 days of verified request as required by OAIC guidance.",
            },
          ]}
        />
      </section>
    </main>
  )
}
