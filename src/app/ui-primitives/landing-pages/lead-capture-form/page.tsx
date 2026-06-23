import type { Metadata } from "next"

import { LeadCaptureForm } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Lead capture form | Landing Pages",
  description: "Primitive 09 — hero lead form with progressive reveal across three steps.",
}

const SERVICES = [
  { value: "muffler", label: "Direct-fit muffler swap" },
  { value: "catback", label: "Full catback install" },
  { value: "headers", label: "Headers / extractors" },
  { value: "diesel", label: "Diesel DPF-back" },
  { value: "audit", label: "Fleet audit + ADR sign-off" },
  { value: "noise", label: "Drone / noise tuning" },
] as const

const FLEET_SERVICES = [
  { value: "audit", label: "Quarterly fleet audit" },
  { value: "pickup", label: "Same-day pickup + drop-off" },
  { value: "tag", label: "ADR re-tagging across the roll" },
] as const

const DYNO_SERVICES = [
  { value: "dyno-pull", label: "30-minute Dyno Tuesday pull" },
  { value: "dyno-tune", label: "Full tune + chart" },
] as const

export default function LeadCaptureFormPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Lead capture"
        title="Lead capture form"
        description="Three-step progressive form — contact, vehicle, service — with stepper feedback. Three states: workshop quote, fleet quote, Dyno Tuesday booking."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Lead capture form" },
        ]}
      />

      <span className={styles.stageCaption}>State · Workshop quote (default)</span>
      <LeadCaptureForm
        kicker="Workshop quote"
        heading="Get a workshop quote in 24 hours."
        lede="Three short steps. We email a quote with line-item parts + labour within one business day."
        services={SERVICES}
      />

      <span className={styles.stageCaption}>State · Fleet enquiry</span>
      <LeadCaptureForm
        kicker="Fleet enquiry"
        heading="Talk to the foreman about a fleet contract."
        lede="Mufflermen runs council fleets and trade rolls of 10+. We'll send a foreman to scope on-site within 48 hours."
        services={FLEET_SERVICES}
        successMessage="Fleet enquiry received. Mufflermen foreman will call you to scope on-site within 48 hours."
      />

      <span className={styles.stageCaption}>State · Dyno Tuesday RSVP</span>
      <LeadCaptureForm
        kicker="Dyno Tuesday"
        heading="Reserve a Dyno Tuesday slot."
        lede="Tuesdays only · 9am-5pm. Bring the ute, get a power + torque chart emailed before you collect."
        services={DYNO_SERVICES}
        successMessage="Dyno slot held. Mufflermen reception will SMS the confirmed time before close of business."
      />
    </main>
  )
}
