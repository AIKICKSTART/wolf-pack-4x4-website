import type { Metadata } from "next"

import { AccountSetupForm } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  ACCOUNT_TIMEZONES,
  ACCOUNT_VALUES_BLANK,
  ACCOUNT_VALUES_FRESH,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Account setup | System onboarding",
  description:
    "Primitive 02 — admin profile capture step for a new Mufflermen tenant. Three states: pre-populated, blank, and with validation errors.",
}

export default function AccountSetupFormScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Account setup"
        title="Account setup form"
        description="Captures the admin profile for the new tenant — full name, work email, role, timezone and a marketing opt-in. Pre-populated where possible from the signup form."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Account setup" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Pre-populated — values carried from signup form</span>
        <AccountSetupForm
          kicker="Step 1 of 6 · Account"
          title="Set up your admin account"
          description="Owner accounts are the people who can bill, deploy and invite. You can promote teammates to owner later if you like."
          values={ACCOUNT_VALUES_FRESH}
          timezones={ACCOUNT_TIMEZONES}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Blank — first ever load</span>
        <AccountSetupForm
          kicker="Step 1 of 6 · Account"
          title="Set up your admin account"
          description="Tell us who's running point on your Mufflermen workspace. Owner accounts can promote teammates later."
          values={ACCOUNT_VALUES_BLANK}
          timezones={ACCOUNT_TIMEZONES}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Validation errors — surfaces field-level guidance</span>
        <AccountSetupForm
          kicker="Step 1 of 6 · Account"
          title="Set up your admin account"
          description="Owner accounts are the people who can bill, deploy and invite. You can promote teammates to owner later if you like."
          values={{ ...ACCOUNT_VALUES_FRESH, email: "sarah@illawarra-tb" }}
          timezones={ACCOUNT_TIMEZONES}
          errors={[
            { field: "email", message: "Work email needs a domain — try sarah@illawarra-tb.com.au." },
            { field: "timezone", message: "Timezone is locked while Hermes finishes detecting your IP." },
          ]}
        />
      </section>
    </main>
  )
}
