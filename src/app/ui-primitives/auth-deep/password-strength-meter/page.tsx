import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PasswordStrengthMeter } from "../../components/auth-deep"

import { PASSWORD_SAMPLES } from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Password strength meter | Auth deep",
  description:
    "Primitive 10 — password strength meter with HIBP breach chip and rule checklist.",
}

export default function PasswordStrengthMeterPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Strength"
        title="Password strength meter"
        description="Five-rule strength meter (length, mixed-case, digit, symbol, no-common). Plug HIBP k-anonymity result in via breachHits to flag known-compromised passwords."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Password strength meter" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Empty · before typing</span>
        <PasswordStrengthMeter
          value={PASSWORD_SAMPLES[0].value}
        />

        <span className={styles.stageCaption}>Weak · only length+lowercase</span>
        <PasswordStrengthMeter
          value={PASSWORD_SAMPLES[1].value}
        />

        <span className={styles.stageCaption}>Fair · adds digit + symbol</span>
        <PasswordStrengthMeter
          value={PASSWORD_SAMPLES[2].value}
        />

        <span className={styles.stageCaption}>Strong · 24+ chars, full rule set</span>
        <PasswordStrengthMeter
          value={PASSWORD_SAMPLES[3].value}
        />

        <span className={styles.stageCaption}>Breached · HIBP hit (21.3M)</span>
        <PasswordStrengthMeter
          value={PASSWORD_SAMPLES[4].value}
          breachHits={PASSWORD_SAMPLES[4].breachHits}
        />

        <span className={styles.stageCaption}>HIBP check pending</span>
        <PasswordStrengthMeter
          value={PASSWORD_SAMPLES[5].value}
          breachCheckPending={PASSWORD_SAMPLES[5].breachCheckPending}
        />
      </section>
    </main>
  )
}
