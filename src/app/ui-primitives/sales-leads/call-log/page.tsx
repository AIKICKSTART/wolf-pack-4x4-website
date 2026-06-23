import type { Metadata } from "next"

import { PhoneCallLogRow } from "../../components/sales-leads"
import { PageHeader } from "../../components/page-header"

import styles from "../sales-leads.module.css"

export const metadata: Metadata = {
  title: "Phone call log row | Sales leads",
  description:
    "Primitive 06 — phone call log row with caller, duration, outcome chip, direction icon, and recording playback toggle.",
}

export default function PhoneCallLogScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Call log row"
        title="Phone call log row"
        description="One row per phone touch. Inbound and outbound directions, outcome chip, and an inline play button for the recording when available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Sales leads", href: "/ui-primitives/sales-leads" },
          { label: "Call log" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Today&apos;s calls</span>
        <div className={styles.callLogList}>
          <PhoneCallLogRow
            id="call-1"
            callerName="Mick Davis"
            callerNumber="0414 882 197"
            topic="Manta cat-back fitment day"
            durationSeconds={482}
            outcome="booked"
            direction="inbound"
            timestamp="Today 09:14"
            timestampIso="2026-05-29T09:14:00+10:00"
            recordingHref="#mick-call-rec"
          />
          <PhoneCallLogRow
            id="call-2"
            callerName="Sarah Pope"
            callerNumber="0438 102 554"
            topic="Quote follow-up for Ranger Wildtrak"
            durationSeconds={184}
            outcome="connected"
            direction="outbound"
            timestamp="Today 10:22"
            timestampIso="2026-05-29T10:22:00+10:00"
            recordingHref="#sarah-call-rec"
          />
          <PhoneCallLogRow
            id="call-3"
            callerName="Trent Williams"
            callerNumber="0407 661 099"
            topic="Patrol Y62 custom 3in"
            durationSeconds={42}
            outcome="voicemail"
            direction="outbound"
            timestamp="Yesterday 16:48"
            timestampIso="2026-05-28T16:48:00+10:00"
          />
          <PhoneCallLogRow
            id="call-4"
            callerName="Albion Park Couriers"
            callerNumber="(02) 4256 1180"
            topic="Fleet Hiace quote acceptance"
            durationSeconds={620}
            outcome="callback"
            direction="inbound"
            timestamp="Yesterday 11:02"
            timestampIso="2026-05-28T11:02:00+10:00"
            recordingHref="#apc-call-rec"
          />
          <PhoneCallLogRow
            id="call-5"
            callerName="Liam Schaefer"
            callerNumber="0421 558 902"
            topic="Triton MQ headers"
            durationSeconds={0}
            outcome="no-answer"
            direction="missed"
            timestamp="2 days ago"
            timestampIso="2026-05-27T15:14:00+10:00"
          />
        </div>
      </section>
    </main>
  )
}
