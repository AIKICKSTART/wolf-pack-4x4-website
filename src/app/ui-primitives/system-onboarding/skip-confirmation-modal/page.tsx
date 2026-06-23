import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import {
  SKIP_CONSEQUENCES_BRAND,
  SKIP_CONSEQUENCES_TEAM,
  SKIP_CONSEQUENCES_WORKSHOP,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

import { SkipModalDemo } from "./skip-modal-demo"

export const metadata: Metadata = {
  title: "Skip confirmation | System onboarding",
  description:
    "Primitive 13 — skip-step confirmation modal. Three states: severe (workshop), mild (team), and brand setup with a remind-later option.",
}

export default function SkipConfirmationModalScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Skip confirmation"
        title="Skip confirmation modal"
        description="A protective modal that opens when the user tries to skip a step. Lists exactly what breaks, with severe items highlighted. Offers back / remind-later / skip."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Skip confirmation" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Severe — skipping workshop config breaks bay scheduling</span>
        <SkipModalDemo
          buttonLabel="Open · skip workshop"
          kicker="Skip step / Workshop"
          title="Skip workshop setup?"
          description="The workshop step locks in your ABN, address and bay count. Without these, quotes carry placeholder details and the bay scheduler is disabled."
          consequences={SKIP_CONSEQUENCES_WORKSHOP}
          remindLaterLabel="Remind me at noon"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Mild — skipping team invites is fine, you can do it later</span>
        <SkipModalDemo
          buttonLabel="Open · skip team invites"
          kicker="Skip step / Team"
          title="Skip team invites?"
          description="You can invite the crew anytime from settings. Only you will be able to log in until invites go out."
          consequences={SKIP_CONSEQUENCES_TEAM}
          remindLaterLabel="Remind me tomorrow"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Brand — skipping uses Mufflermen Red defaults</span>
        <SkipModalDemo
          buttonLabel="Open · skip brand setup"
          kicker="Skip step / Brand"
          title="Skip brand setup?"
          description="You can upload your logo and lock your palette anytime later. We'll fall back to the Mufflermen Red default until you do."
          consequences={SKIP_CONSEQUENCES_BRAND}
          confirmLabel="Use Mufflermen defaults"
          cancelLabel="Keep customising"
        />
      </section>
    </main>
  )
}
