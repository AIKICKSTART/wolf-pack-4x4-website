import type { Metadata } from "next"

import { MentorChatCard } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  MENTOR_SUGGESTIONS,
  MENTOR_TRANSCRIPT_LONG,
  MENTOR_TRANSCRIPT_MID,
  MENTOR_TRANSCRIPT_WELCOME,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Mentor chat | System onboarding",
  description:
    "Primitive 11 — onboarding mentor chat card with Hermes. Three states: opening message only, mid-conversation, and Hermes typing.",
}

export default function MentorChatCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Hermes / Mentor"
        title="Mentor chat card"
        description="A side-rail chat with Hermes, the onboarding mentor agent. Surfaces suggested next-step chips, a transcript with the user, and a typing indicator while Hermes thinks."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Mentor chat" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Opening message — Hermes introduces themselves</span>
        <MentorChatCard
          kicker="Hermes · Mentor"
          title="Hermes is on standby"
          mentorName="Hermes"
          mentorRole="Onboarding mentor · here to nudge you through the 6 steps"
          messages={MENTOR_TRANSCRIPT_WELCOME}
          suggestions={MENTOR_SUGGESTIONS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Mid-conversation — workshop step settled</span>
        <MentorChatCard
          kicker="Hermes · Mentor"
          title="Hermes has the workshop locked in"
          mentorName="Hermes"
          mentorRole="Onboarding mentor"
          messages={MENTOR_TRANSCRIPT_MID}
          suggestions={MENTOR_SUGGESTIONS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Typing — Hermes is composing the next nudge</span>
        <MentorChatCard
          kicker="Hermes · Mentor"
          title="Hermes is drafting your team invites"
          mentorName="Hermes"
          mentorRole="Onboarding mentor"
          messages={MENTOR_TRANSCRIPT_LONG}
          suggestions={MENTOR_SUGGESTIONS}
          typing
        />
      </section>
    </main>
  )
}
