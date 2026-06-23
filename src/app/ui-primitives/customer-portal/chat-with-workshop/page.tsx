import type { Metadata } from "next"

import { ChatWithWorkshop } from "../../components/customer-portal"
import { PageHeader } from "../../components/page-header"

import {
  CHAT_MESSAGES,
  CHAT_MESSAGES_FRESH,
  CHAT_MESSAGES_RESOLVED,
} from "../_mock-data"
import styles from "../customer-portal.module.css"

export const metadata: Metadata = {
  title: "Chat with workshop | Customer portal",
  description:
    "Primitive 14 — customer-side message thread with the workshop, Hermes branded — three states.",
}

export default function ChatWithWorkshopScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Chat with workshop"
        title="Workshop chat thread"
        description="Live thread (Brad replying mid-job, Hermes drafting alongside), fresh state for a brand-new customer, and a resolved thread (Karen's GT picked up, kettle's on)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Customer portal", href: "/ui-primitives/customer-portal" },
          { label: "Chat with workshop" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <ChatWithWorkshop
            customerName="Mick Davis"
            vehicleLabel="2021 Hilux N80 SR5"
            rego="KFK-23M"
            messages={CHAT_MESSAGES}
            hermesAssisting
          />
          <ChatWithWorkshop
            customerName="Bec Singh"
            vehicleLabel="2024 Ranger Raptor"
            rego="RAP-22Z"
            messages={CHAT_MESSAGES_FRESH}
          />
          <ChatWithWorkshop
            customerName="Karen Wallis"
            vehicleLabel="1976 Falcon GT XB"
            rego="GT-460"
            messages={CHAT_MESSAGES_RESOLVED}
          />
        </div>
      </section>
    </main>
  )
}
