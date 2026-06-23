import type { Metadata } from "next"

import { ContactCardMini } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Contact mini | CRM",
  description:
    "Primitive 02 — compact contact card with avatar, name, role, and primary contact channel chip.",
}

export default function ContactMiniScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Contact mini"
        title="Contact mini card"
        description="Lightweight contact card for sidebars and lists — avatar plus name and role, with the customer's preferred channel surfaced as a chip-shaped CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Contact mini" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div className={styles.demoStack}>
          <ContactCardMini
            id="contact-1"
            name="Mick Davis"
            role="Performance owner"
            channel="phone"
            channelValue="0414 882 197"
          />
          <ContactCardMini
            id="contact-2"
            name="Sarah Pope"
            role="Pope Builders fleet manager"
            channel="email"
            channelValue="sarah@popebuilders.com.au"
          />
          <ContactCardMini
            id="contact-3"
            name="Trent Williams"
            role="DIY enthusiast"
            channel="sms"
            channelValue="0407 661 099"
          />
          <ContactCardMini
            id="contact-4"
            name="Jordan Pham"
            role="Workshop lead"
            channel="dm"
            channelValue="@jordan-mufflermen"
          />
        </div>
      </section>
    </main>
  )
}
