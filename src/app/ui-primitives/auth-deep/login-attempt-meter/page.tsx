import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LoginAttemptMeter } from "../../components/auth-deep"

import {
  LOGIN_METER_LOCKED,
  LOGIN_METER_OPEN,
  LOGIN_METER_WARNING,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Login attempt meter | Auth deep",
  description:
    "Primitive 09 — failed-login attempt meter with lockout countdown and admin clear actions.",
}

export default function LoginAttemptMeterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Guard"
        title="Login attempt meter"
        description="Brute-force guard meter with threshold ticks — open, warning and locked-out tracks, plus admin clear-counter and clear-lockout controls."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Login attempt meter" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Open · 1 of 5</span>
        <LoginAttemptMeter {...LOGIN_METER_OPEN} />

        <span className={styles.stageCaption}>Warning · 4 of 5 — last chance</span>
        <LoginAttemptMeter {...LOGIN_METER_WARNING} />

        <span className={styles.stageCaption}>Locked · 5m 12s cooldown</span>
        <LoginAttemptMeter {...LOGIN_METER_LOCKED} />
      </section>
    </main>
  )
}
