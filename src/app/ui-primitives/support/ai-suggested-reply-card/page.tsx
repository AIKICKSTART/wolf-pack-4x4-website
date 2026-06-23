import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AiSuggestedReplyCard } from "../../components/support"

import styles from "../support.module.css"

export const metadata: Metadata = {
  title: "AI suggested reply card | Support",
  description:
    "Primitive 14 — AI suggested reply with confidence chip and Use / Refine / Reject actions.",
}

export default function AiSuggestedReplyCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Assist"
        title="AI suggested reply card"
        description="Suggested reply surfaced by the workshop's AI assist. Confidence chip is colour-coded — green for high, amber for medium, neutral for low. Rationale explains why it picked this one. Three actions: Use, Refine (kicks back to the composer), Reject (records a thumbs-down signal)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Support", href: "/ui-primitives/support" },
          { label: "AI suggested reply" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Three confidence levels</span>
        <div className={styles.demoStack}>
          <AiSuggestedReplyCard
            confidence="high"
            suggestion={`G'day Mick, the Manta DPF-back is plug-and-play if your tip is the 4in rolled angle. We can do a Bay 2 install Friday 13:00, 90 min, $1,840 fitted incl. drive-on dyno verify. Want me to lock it in?`}
            rationale="Matches the workshop's confirmed fitment template for the Hilux SR5 rolled-angle tip."
            source="Trained on 412 similar tickets · last 90 days"
          />
          <AiSuggestedReplyCard
            confidence="medium"
            suggestion={`Hey Wayne, on the Patrol Y62 twin 3in build, we're looking at roughly $4,200 fitted with the dyno verify. Happy to firm up once you confirm cat-back vs DPF-back direction.`}
            rationale="Quote band sits within historical Patrol Y62 builds, but exact spec varies by selected resonators."
            source="Trained on 38 Patrol Y62 quotes"
          />
          <AiSuggestedReplyCard
            confidence="low"
            suggestion={`Cheers for flagging the SMS delay. We're investigating with the upstream carrier. You should still get pickup-ready confirmations via email in the meantime.`}
            rationale="Few prior tickets reference the upstream SMS carrier — keep human in the loop."
          />
        </div>
      </section>
    </main>
  )
}
