import type { Metadata } from "next"

import { TeamInvitePanel } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  TEAM_INVITES_FRESH,
  TEAM_INVITES_MIXED,
  TEAM_INVITES_SENT,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Team invite | System onboarding",
  description:
    "Primitive 05 — bulk-invite the workshop crew. Three states: drafts only, all invites sent, and a mixed state with a failure.",
}

export default function TeamInvitePanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Team"
        title="Team invite panel"
        description="Bulk-invite the workshop crew. Owner row is pinned. Each row carries a role chip and a tone-shifting invite status pill. The bulk-add row sits below the list."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Team invite" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Drafts — 3 invites queued, none sent yet</span>
        <TeamInvitePanel
          kicker="Step 4 of 6 · Team"
          title="Bring on the crew"
          description="Mechanics get assigned to bays. Front-desk staff get the inbox. Apprentices get supervised access. You can change anyone's role from settings later."
          rows={TEAM_INVITES_FRESH}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Sent — 3 invites sent, 1 accepted</span>
        <TeamInvitePanel
          kicker="Step 4 of 6 · Team"
          title="Crew invites are out"
          description="Hermes will let you know when each mechanic accepts. You can resend or revoke any invite from settings."
          rows={TEAM_INVITES_SENT}
          sendLabel="Send more invites"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Mixed — 1 failed delivery, 1 queued</span>
        <TeamInvitePanel
          kicker="Step 4 of 6 · Team"
          title="Bring on the crew"
          description="Hermes is retrying the failed delivery. We'll throttle SMS reminders for queued invites until the user lands in the inbox."
          rows={TEAM_INVITES_MIXED}
          bulkAddHint="Tip — dean@illawarra-tb.com.au bounced. Double-check the spelling before retrying."
        />
      </section>
    </main>
  )
}
