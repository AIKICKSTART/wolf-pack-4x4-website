import type { Metadata } from "next"

import { CrmActivityRow } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Activity row | CRM"
,
  description:
    "Primitive 05 — single CRM activity log entry with actor, verb chip, duration, timestamp, and inline-expand transcript.",
}

export default function CrmActivityRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Activity row"
        title="CRM activity row"
        description="One actor, one verb, one summary, one timestamp. Click expand to read the full call note or message transcript inline."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Activity row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <CrmActivityRow
            id="act-1"
            actorName="Jordan Pham"
            verb="called"
            summary="Outbound — confirmed Hilux turbo-back booking, walked Mick through dyno-tune timing."
            timestamp="Today 11:02"
            timestampIso="2026-05-28T11:02:00+10:00"
            durationMinutes={14}
            transcript="Mick is happy with the aluminised system quote. He'll drop the Hilux off at 7:30 Tue 4 Jun and pick up Wed afternoon. Wants a single back-box (no twin) to keep the bash plate clearance. Will pay in full on collection. Followup: confirm hardware kit by Mon."
          />
          <CrmActivityRow
            id="act-2"
            actorName="Marcus Wells"
            verb="quoted"
            summary="Sent Q-2207 — Hilux SR5 turbo-back, $2,400 incl. fitment."
            timestamp="22 May 09:00"
            timestampIso="2026-05-22T09:00:00+10:00"
          />
          <CrmActivityRow
            id="act-3"
            actorName="Sarah Pope"
            verb="emailed"
            summary="Customer reply — wants to add the Hiace fleet quote on top of Ranger DPF job."
            timestamp="2 days ago"
            timestampIso="2026-05-26T11:00:00+10:00"
            transcript="Hi team, can you also quote a muffler swap on six Hiace vans? They're all 2019-2021. Happy to bring them in two at a time over a fortnight. Cheers, Sarah."
          />
          <CrmActivityRow
            id="act-4"
            actorName="Jordan Pham"
            verb="met"
            summary="Walk-in — Trent dropped by to look at Patrol cat-back options on display."
            timestamp="18 May"
            timestampIso="2026-05-18T14:30:00+10:00"
            durationMinutes={32}
          />
          <CrmActivityRow
            id="act-5"
            actorName="Marcus Wells"
            verb="noted"
            summary="Mick mentioned he might bring his mate's Patrol Y62 in — flag as referral lead."
            timestamp="23 May"
            timestampIso="2026-05-23T10:30:00+10:00"
          />
          <CrmActivityRow
            id="act-6"
            actorName="Jordan Pham"
            verb="booked"
            summary="Booked Hilux turbo-back fitment — Bay 02, Tue 4 Jun 07:30."
            timestamp="Today 11:18"
            timestampIso="2026-05-28T11:18:00+10:00"
          />
        </div>
      </section>
    </main>
  )
}
