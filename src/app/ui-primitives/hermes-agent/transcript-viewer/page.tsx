import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TranscriptViewer } from "../../components/hermes-agent"
import type { TranscriptTurn } from "../../components/hermes-agent"

import { HERMES_TRANSCRIPT_TURNS } from "../_mock-data"
import styles from "../hermes-agent.module.css"

export const metadata: Metadata = {
  title: "Transcript viewer | Hermes",
  description:
    "Primitive 14 — Hermes transcript viewer with collapsible tool calls and citation chips.",
}

const SMS_TRANSCRIPT: ReadonlyArray<TranscriptTurn> = [
  {
    id: "sms01",
    speaker: "system",
    authorName: "Session",
    timestamp: "07:42:00",
    text: "After-hours channel · sms · Karen W.",
  },
  {
    id: "sms02",
    speaker: "customer",
    authorName: "Karen W.",
    timestamp: "07:42:11",
    text: "Hi, can you fit a new muffler on the Sunday open day?",
  },
  {
    id: "sms03",
    speaker: "agent",
    authorName: "Hermes",
    timestamp: "07:42:13",
    text: "Hey Karen — we're closed Sundays. Saturday 8 am to noon is the next slot. Want me to book you 9 am?",
    citations: [
      {
        index: 1,
        title: "Workshop hours · Oak Flats NSW",
        url: "https://docs.mufflermen.com.au/policies/hours",
      },
    ],
  },
  {
    id: "sms04",
    speaker: "customer",
    authorName: "Karen W.",
    timestamp: "07:42:48",
    text: "9 am Sat works. Cheers.",
  },
  {
    id: "sms05",
    speaker: "agent",
    authorName: "Hermes",
    timestamp: "07:42:50",
    text: "Locked in. Confirmation SMS on its way. Thanks Karen.",
  },
]

const SHORT_TRANSCRIPT: ReadonlyArray<TranscriptTurn> = [
  {
    id: "s1",
    speaker: "system",
    authorName: "Session",
    timestamp: "11:08:00",
    text: "Channel = phone-voice · 28 second call.",
  },
  {
    id: "s2",
    speaker: "customer",
    authorName: "Anonymous",
    timestamp: "11:08:04",
    text: "[Caller hung up before stating intent — voicemail not left.]",
  },
]

export default function TranscriptViewerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Transcript"
        title="Transcript viewer"
        description="Read-only transcript reader for any past Hermes conversation. Speaker-coloured turns, expandable tool calls and citation chips below agent responses."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Transcript viewer" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · Mick Davis · 7 turns</span>
        <TranscriptViewer
          conversationId="conv_44521"
          customerName="Mick Davis"
          channel="web-chat"
          duration="8m 14s"
          outcomeLabel="Booked · Bay 2"
          turns={HERMES_TRANSCRIPT_TURNS}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · Karen · SMS after-hours</span>
        <TranscriptViewer
          conversationId="conv_44522"
          customerName="Karen W."
          channel="sms"
          duration="1m 04s"
          outcomeLabel="Booked · Sat 9am"
          turns={SMS_TRANSCRIPT}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · short call · abandoned</span>
        <TranscriptViewer
          conversationId="conv_44523"
          customerName="Anonymous caller"
          channel="phone-voice"
          duration="28s"
          outcomeLabel="Abandoned"
          turns={SHORT_TRANSCRIPT}
        />
      </section>
    </main>
  )
}
