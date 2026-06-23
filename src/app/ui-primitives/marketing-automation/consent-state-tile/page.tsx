import type { Metadata } from "next"

import { ConsentStateTile } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Consent state tile | Marketing automation",
  description:
    "Primitive 12 — opt-in status tile with double-confirm timeline and an unsubscribe-link CTA.",
}

export default function ConsentStateTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Consent state tile"
        title="Consent state tile"
        description="Per-contact consent panel — Spam Act / GDPR friendly. Surfaces the opt-in audit trail, double-confirmation status and a working unsubscribe link."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Consent state tile" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Double opt-in confirmed</h2>
        <ConsentStateTile
          name="Dazza Whittaker"
          email="dazza.w@bigpond.com"
          status="double-opt-in"
          optedInAt="2024-11-12 · 09:42"
          confirmedAt="2024-11-12 · 09:48"
          lastSentAt="2026-05-21 · 18:30"
          unsubscribeHref="/unsubscribe?token=demo-token-dazza"
          note="Confirmed via Spam-Act-compliant double opt-in flow."
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Pending confirmation</h2>
        <ConsentStateTile
          name="Aletheia Sako"
          email="aletheia.sako@gmail.com"
          status="pending"
          optedInAt="2026-05-28 · 12:14"
          unsubscribeHref="/unsubscribe?token=demo-token-aletheia"
          note="Awaiting double-opt-in click. Suppressed from broadcasts until confirmed."
        />
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Unsubscribed (hard suppression)</h2>
        <ConsentStateTile
          name="Brendan Crowe"
          email="brendan.crowe@illawarrasteel.com.au"
          status="unsubscribed"
          optedInAt="2023-08-04 · 14:22"
          confirmedAt="2023-08-04 · 14:25"
          lastSentAt="2025-12-18 · 10:08"
          unsubscribeHref="/unsubscribe?token=demo-token-brendan"
          note="Suppressed indefinitely. Re-subscribe requires fresh double opt-in."
        />
      </section>
    </main>
  )
}
