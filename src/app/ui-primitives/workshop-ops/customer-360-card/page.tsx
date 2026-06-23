import type { Metadata } from "next"

import { Customer360Card } from "../../components/workshop-ops"
import { PageHeader } from "../../components/page-header"
import type { CustomerProfile } from "../../components/workshop-ops"

import { CUSTOMER_MICK } from "../_mock-data"
import styles from "../workshop-ops.module.css"

export const metadata: Metadata = {
  title: "Customer 360 card | Workshop ops",
  description:
    "Primitive 05 — customer profile card with vehicles, history, lifetime value, and a comms timeline — three states.",
}

const FIRST_TIMER: CustomerProfile = {
  id: "cu-aliana",
  name: "Aliana Romeo",
  initials: "AR",
  phone: "0405 117 084",
  email: "aliana.romeo@gmail.com",
  suburb: "Shellharbour · 2529",
  joinedAt: "May 2026",
  lifetimeValueAud: 240,
  visitsCount: 1,
  loyaltyTier: "first-timer",
  vehicles: [
    {
      id: "v-aliana-1",
      label: "2017 Mazda 3 sport",
      rego: "AR-22M",
      bodyColour: "Soul red",
      yearMade: 2017,
    },
  ],
  comms: [
    {
      id: "co-aliana-1",
      channel: "sms",
      when: "Tue 26 May · 09:42",
      summary: "Confirmed 10:30 alignment slot.",
      inbound: true,
    },
    {
      id: "co-aliana-2",
      channel: "email",
      when: "Mon 25 May · 14:08",
      summary: "Sent online booking confirmation + ADR 49 brochure.",
      inbound: false,
    },
  ],
}

const LIFER: CustomerProfile = {
  id: "cu-karen",
  name: "Karen Wallis",
  initials: "KW",
  phone: "0421 605 372",
  email: "karen@wallisautomotive.com.au",
  suburb: "Kembla Grange · 2526",
  joinedAt: "Aug 2014",
  lifetimeValueAud: 86420,
  visitsCount: 64,
  loyaltyTier: "lifer",
  vehicles: [
    { id: "v-karen-1", label: "1976 Falcon GT XB", rego: "GT-460", bodyColour: "Wild plum", yearMade: 1976 },
    { id: "v-karen-2", label: "2024 Ranger XLT daily", rego: "WAL-22", bodyColour: "Aurora blue", yearMade: 2024 },
    { id: "v-karen-3", label: "1968 Mustang 390 Fastback", rego: "MUST68", bodyColour: "Dark grey", yearMade: 1968 },
  ],
  comms: [
    {
      id: "co-karen-1",
      channel: "in-person",
      when: "Wed 27 May · 11:34",
      summary: "Karen took GT keys, paid balance via Stripe.",
      mechanicId: "mech-tim",
      inbound: true,
    },
    {
      id: "co-karen-2",
      channel: "call",
      when: "Tue 26 May · 16:08",
      summary: "Discussed glasspack tone preference for final QC.",
      mechanicId: "mech-tim",
      inbound: true,
    },
    {
      id: "co-karen-3",
      channel: "sms",
      when: "Mon 25 May · 09:18",
      summary: "Sent thumbs-up after seeing fab progress photo.",
      inbound: true,
    },
  ],
}

export default function Customer360CardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Customer 360 card"
        title="Customer 360 profile"
        description="Single-pane view of a customer — phone, email, suburb, lifetime spend, visit count, garage, and recent comms. Three states — a champion-tier regular (Mick Davis), a brand-new first-timer (Aliana), and a 12-year lifer with three vehicles in the garage (Karen)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop ops", href: "/ui-primitives/workshop-ops" },
          { label: "Customer 360 card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <Customer360Card
            customer={CUSTOMER_MICK}
            monthlySpendTrend={[180, 220, 0, 410, 0, 0, 280, 0, 0, 1240, 320, 1842]}
          />
          <Customer360Card customer={FIRST_TIMER} />
          <Customer360Card
            customer={LIFER}
            monthlySpendTrend={[1240, 2880, 410, 980, 1620, 2240, 720, 4280, 1080, 980, 2440, 4280]}
          />
        </div>
      </section>
    </main>
  )
}
