import type { Metadata } from "next"

import { ProfileCompletionMeter } from "../../components/onboarding"
import { PageHeader } from "../../components/page-header"

import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Profile completion meter | Onboarding",
  description:
    "Primitive 10 — profile completion meter showing N of M fields filled, percent fill, missing-field chips and a complete-profile CTA.",
}

export default function ProfileCompletionScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Profile meter"
        title="Profile completion meter"
        description="A simple meter that tells the user how complete their workshop profile is. Two orientations — horizontal for inline placement and vertical for a dashboard tile. Missing fields render as amber chips below the bar; when nothing remains, a friendly green confirmation shows instead."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Profile completion" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Horizontal — Oak Flats workshop profile, 6 / 9 filled</span>
        <ProfileCompletionMeter
          kicker="Workshop profile"
          title="Oak Flats workshop profile"
          fields={[
            { id: "name", label: "Workshop name", filled: true },
            { id: "abn", label: "ABN", filled: true },
            { id: "address", label: "Postal address", filled: true },
            { id: "hours", label: "Opening hours", filled: true },
            { id: "bays", label: "Bay layout", filled: true },
            { id: "logo", label: "Logo", filled: true },
            { id: "adr", label: "ADR settings", filled: false },
            { id: "stripe", label: "Stripe payouts", filled: false },
            { id: "tax", label: "GST registration", filled: false },
          ]}
          completeHref="#complete"
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Vertical — compact dashboard tile</span>
        <div style={{ maxWidth: 280 }}>
          <ProfileCompletionMeter
            kicker="Crew profile"
            title="Bay lead profile"
            orientation="vertical"
            fields={[
              { id: "name", label: "Full name", filled: true },
              { id: "rego", label: "Licence", filled: true },
              { id: "phone", label: "Mobile", filled: true },
              { id: "emergency", label: "Emergency contact", filled: false },
              { id: "saftety", label: "SafeWork induction", filled: false },
            ]}
            completeHref="#crew"
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>All filled — green confirmation</span>
        <ProfileCompletionMeter
          kicker="Front desk"
          title="Front desk profile"
          fields={[
            { id: "name", label: "Full name", filled: true },
            { id: "rego", label: "Licence", filled: true },
            { id: "phone", label: "Mobile", filled: true },
            { id: "shift", label: "Shift", filled: true },
          ]}
        />
      </section>
    </main>
  )
}
