import type { Metadata } from "next"

import { SendTimeOptimizer } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import { DEMO_SEND_TIME_RECIPIENTS } from "../_mock-data"
import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Send-time optimizer | Marketing automation",
  description:
    "Primitive 10 — per-recipient best-time predictor with confidence chip and previous-send delta.",
}

const COLD_START_RECIPIENTS = [
  {
    id: "c1",
    name: "Mateusz Andrzej",
    email: "mateusz.a@outlook.com.au",
    bestSlot: "Default · Tue 6:30pm",
    confidence: 12,
  },
  {
    id: "c2",
    name: "Selita Mafi",
    email: "selita.mafi@gmail.com",
    bestSlot: "Default · Tue 6:30pm",
    confidence: 8,
  },
]

const TUNED_RECIPIENTS = [
  ...DEMO_SEND_TIME_RECIPIENTS,
  {
    id: "r5",
    name: "Helmut Pfisterer",
    email: "helmut.pfisterer@web.de",
    bestSlot: "Fri 5:42pm",
    previousSlot: "Sat 9:00am",
    confidence: 89,
  },
]

export default function SendTimeOptimizerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Send-time optimizer"
        title="Send-time optimizer"
        description="Per-recipient best-time predictor backed by historical opens. Confidence chip surfaces low-data warnings; previous-send context anchors recommendations against what was tried before."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Send-time optimizer" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Mixed-confidence cohort</h2>
        <SendTimeOptimizer
          title="Winter exhaust deals · cohort A"
          band="medium"
          recipients={DEMO_SEND_TIME_RECIPIENTS}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Tuned high-confidence cohort</h2>
        <SendTimeOptimizer
          title="Bay 2 dyno follow-up · power users"
          band="high"
          recipients={TUNED_RECIPIENTS}
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Cold start (low confidence)</h2>
        <SendTimeOptimizer
          title="Cold-start cohort · new sign-ups"
          band="low"
          recipients={COLD_START_RECIPIENTS}
        />
      </section>
    </main>
  )
}
