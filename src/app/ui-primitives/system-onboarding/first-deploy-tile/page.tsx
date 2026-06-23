import type { Metadata } from "next"

import { FirstDeployTile } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  DEPLOY_CHECKLIST_LIVE,
  DEPLOY_CHECKLIST_PENDING,
  DEPLOY_CHECKLIST_READY,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "First deploy | System onboarding",
  description:
    "Primitive 07 — first-deploy gauge with checklist. Three states: pending checklist, fully ready to launch, and live (post-deploy).",
}

export default function FirstDeployTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / First deploy"
        title="First-deploy tile"
        description="The final step before going live — a deploy readiness gauge over a checklist of pre-launch items, the workshop URL and a tone-shifting launch CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "First deploy" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Pending — 3 of 5 items ready, launch blocked</span>
        <FirstDeployTile
          kicker="Step 6 of 6 · Deploy"
          title="Launch your workshop"
          description="A few items still pending. Hermes will fast-track the Twilio sender and remind you to send the team invites before we light the bay doors."
          checklist={DEPLOY_CHECKLIST_PENDING}
          targetUrl="https://illawarra-tb.mufflermen.com.au"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Ready — all checks green, launch button live</span>
        <FirstDeployTile
          kicker="Step 6 of 6 · Deploy"
          title="Launch your workshop"
          description="All checks green. Hit Launch to flip the workshop live — quotes will go out branded as Illawarra TB and your phone number will start ringing through to Hermes."
          checklist={DEPLOY_CHECKLIST_READY}
          targetUrl="https://illawarra-tb.mufflermen.com.au"
          deployHref="#launch"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Live — workshop is shipped, post-deploy view</span>
        <FirstDeployTile
          kicker="Live · v1.0.0"
          title="Illawarra TB is live"
          description="Everything is up. Your bay schedule is open for bookings and Hermes is answering the phone after-hours. Bay 1 is already booked for tomorrow at 09:00."
          checklist={DEPLOY_CHECKLIST_LIVE}
          targetUrl="https://illawarra-tb.mufflermen.com.au"
          environment="production · au-east-1"
          deployLabel="Open workshop dashboard"
          deployHref="#dashboard"
        />
      </section>
    </main>
  )
}
