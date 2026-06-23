import type { Metadata } from "next"

import { SmsConversationThread } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"
import type { SmsMessage } from "../../components/workshop-ops"

import { SMS_MESSAGES, SMS_TEMPLATES } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "SMS conversation thread | Workshop ops",
  description:
    "Primitive 06 — workshop SMS thread with quick-reply templates and character count — three states.",
}

const NEW_LEAD: ReadonlyArray<SmsMessage> = [
  {
    id: "lead-1",
    direction: "in",
    body: "Hey, looking at an X-Force cat-back for my Ranger Raptor. Got time this week to fit one? Cheers, Trent",
    sentAt: "Tue 26 May · 13:42",
    status: "delivered",
  },
]

const FAILED_REPLY: ReadonlyArray<SmsMessage> = [
  {
    id: "fail-1",
    direction: "out",
    body: "Hi Lou — your AU ute is ready, total is $640 cash or card. Pick up before 17:30 mate.",
    sentAt: "Mon 25 May · 16:22",
    status: "failed",
    templateUsed: "Ready for pickup",
  },
  {
    id: "fail-2",
    direction: "out",
    body: "Looks like that text bounced — retrying via Telstra short code.",
    sentAt: "Mon 25 May · 16:23",
    status: "sent",
  },
]

export default function SmsConversationThreadScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / SMS conversation thread"
        title="Workshop SMS thread"
        description="Two-way SMS thread with quick-reply templates the front-counter uses every day. Three states — Mick's live job update thread (dyno result), a brand-new lead from Trent on a Ranger Raptor enquiry, and a failed-then-retried delivery to Lou."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "SMS conversation thread" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <SmsConversationThread
            contactName="Mick Davis"
            contactPhone="0412 884 920"
            vehicleLabel="Hilux N80 SR5"
            rego="BX1-8RT"
            messages={SMS_MESSAGES}
            templates={SMS_TEMPLATES}
          />
          <SmsConversationThread
            contactName="Trent Calloway"
            contactPhone="0488 192 040"
            vehicleLabel="Ranger Raptor"
            rego="TC-2RR"
            messages={NEW_LEAD}
            templates={SMS_TEMPLATES}
            defaultComposer="Hi Trent — yes, can pencil you in Thursday morning. Pop by for a fitting sound test first?"
          />
          <SmsConversationThread
            contactName="Lou Whitford"
            contactPhone="0432 770 884"
            vehicleLabel="AU Falcon ute"
            rego="LOU-AU"
            messages={FAILED_REPLY}
            templates={SMS_TEMPLATES}
          />
        </div>
      </section>
    </main>
  )
}
